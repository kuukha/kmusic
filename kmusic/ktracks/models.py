
from django.db import models

from django.contrib.auth import get_user_model
# Create your models here.


class Ktrack(models.Model):
    tittle = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)


class Like(models.Model):
    user = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)
    ktrack = models.ForeignKey(
        'ktracks.Ktrack', related_name='likes', on_delete=models.CASCADE)
