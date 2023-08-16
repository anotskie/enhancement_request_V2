from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserLoginView,
    UserLogoutView,
    UserListCreateView,
    UserRetrieveUpdateView,
    protected_view,
    EnhancementRequestViewSet,VoteForEnhancementRequest,CommentCreateView,CommentListView
)

router = DefaultRouter()
router.register(r'enhancement-requests', EnhancementRequestViewSet)

urlpatterns = [
    # ...
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateView.as_view(), name='user-retrieve-update'),
    path('protected/', protected_view, name='protected-view'),
    path('enhancement-requests/<int:enhancement_request_id>/vote/', VoteForEnhancementRequest.as_view(), name='vote-for-enhancement'),
    path('enhancement-requests/<int:enhancement_request_id>/comments/create/', CommentCreateView.as_view(), name='comment-create'),
    path('enhancement-requests/<int:enhancement_request_id>/comments/list/', CommentListView.as_view(), name='comment-list'),

    # Include the router's URLs
    path('', include(router.urls)),
    # ...
]