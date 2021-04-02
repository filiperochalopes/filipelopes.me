from django.db import models
from django_rest_api.posts.models import Post
from django_rest_api.core.models import Tag

class Item(models.Model):
    title = models.CharField(max_length=100)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    date = models.DateField(blank=True)
    posts = models.ManyToManyField(Post)
    tags = models.ManyToManyField(Tag)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
