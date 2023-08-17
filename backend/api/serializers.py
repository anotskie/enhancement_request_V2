from rest_framework import serializers

from django.contrib.auth.models import User
from .models import EnhancementRequest, Comment


    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class EnhancementRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnhancementRequest
        fields = ['title', 'description']

    def to_representation(self, instance):
        print(instance.comments.all())
        return super().to_representation(instance)
    
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)
    
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_username(self, obj):
        return obj.user.username

class EnhancementRequestSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = EnhancementRequest
        fields = '__all__'
    
    def get_comments(self, obj):
        comments = Comment.objects.filter(enhancement_request=obj)
        return CommentSerializer(comments, many=True).data


