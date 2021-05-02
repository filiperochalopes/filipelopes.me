from django.urls import include, path
from django_rest_api.cms.views import login, add_experience, add_skill

urlpatterns = [
    path('login', login),
    path('adicionar-experiencia', add_experience),
    path('adicionar-skill', add_skill),
]
