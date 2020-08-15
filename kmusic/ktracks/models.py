from django.db import models

# Create your models here.

class Ktrack(models.Model):

    tittle = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    url = models.URLField()
    cerated_at = models.DateTimeField(auto_now_add=True)
