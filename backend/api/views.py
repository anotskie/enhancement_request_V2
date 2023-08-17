from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import viewsets
from api.models import EnhancementRequest,Vote,Comment

from api.serializers import UserSerializer, EnhancementRequestSerializer, EnhancementRequestCreateSerializer, CommentSerializer

class EnhancementRequestViewSet(viewsets.ModelViewSet):
    queryset = EnhancementRequest.objects.all()
    serializer_class = EnhancementRequestSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return EnhancementRequestCreateSerializer
        return EnhancementRequestSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EnhancementRequestSerializer(instance, context={'request': request})
        return Response(serializer.data)

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        enhancement_request_id = self.kwargs['enhancement_request_id']
        return Comment.objects.filter(enhancement_request=enhancement_request_id)
    
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            user_id = user.id  # Get the user ID
            return Response({'access_token': access_token, 'user_id': user_id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_view(request):
    # Your protected view logic here
    return Response({'message': 'This is a protected view'}, status=status.HTTP_200_OK)

class UserLogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
class VoteForEnhancementRequest(APIView):
    def post(self, request, enhancement_request_id):
        try:
            enhancement_request = EnhancementRequest.objects.get(pk=enhancement_request_id)
        except EnhancementRequest.DoesNotExist:
            return Response({"message": "Enhancement request not found"}, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        existing_vote = Vote.objects.filter(user=user, enhancement_request=enhancement_request).first()
        
        if existing_vote:
            return Response({"message": "You have already voted for this enhancement request"}, status=status.HTTP_400_BAD_REQUEST)
        
        Vote.objects.create(user=user, enhancement_request=enhancement_request)
        enhancement_request.votes += 1
        enhancement_request.save()
        
        serializer = EnhancementRequestSerializer(enhancement_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


