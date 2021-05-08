from django.contrib import admin
from django.db import models
from django_rest_api.posts.models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass