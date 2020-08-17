from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime

# Create your models here.

class Ktrack(models.Model):

    tittle = models.CharField(max_length=50, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(null=True)
    cerated_at = models.DateTimeField(default=datetime.now)
    posted_by = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)

class Like(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE) 
    ktrack = models.ForeignKey('ktracks.Ktrack', related_name='likes', on_delete=models.CASCADE)