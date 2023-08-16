from django.db import models
from django.contrib.auth.models import User

class EnhancementRequest(models.Model):
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    votes = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    comments = models.ManyToManyField('Comment', related_name='enhancement_requests')
    def __str__(self):
        return self.title

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    enhancement_request = models.ForeignKey(EnhancementRequest, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'enhancement_request')

class Comment(models.Model):
    enhancement_request = models.ForeignKey(EnhancementRequest, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.enhancement_request.title}"