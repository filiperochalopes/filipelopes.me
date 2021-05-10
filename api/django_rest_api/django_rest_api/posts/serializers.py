from rest_framework import serializers
from django_rest_api.posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title_pt_br', 'title_en_us', 'excerpt_pt_br', 'excerpt_en_us', 'content_pt_br', 'content_en_us',
                  'type', 'created_at', 'updated_at']