from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from django_rest_api.curriculum.models import Experience, Skill
from django_rest_api.curriculum.serializers import ExperienceSerializer, SkillSerializer


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_curriculum_experience(request):
    experiences = Experience.objects.all()
    serializer = ExperienceSerializer(experiences, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_curriculum_skill(request):
    skills = Skill.objects.all()
    serializer = SkillSerializer(skills, many=True)
    return JsonResponse(serializer.data, safe=False)
