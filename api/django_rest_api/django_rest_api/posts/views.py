from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_rest_api.posts.models import Post
from django_rest_api.posts.serializers import PostSerializer


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def post_get(request):
    print(request.query_params)
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return JsonResponse(serializer.data, safe=False)
