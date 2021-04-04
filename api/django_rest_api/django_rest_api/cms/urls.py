from django.urls import include, path
from django_rest_api.cms.views import login

urlpatterns = [
    path('login/', login),
]
