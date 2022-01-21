from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from django_rest_api.curriculum.models import Experience, Skill, Course, Certificate
from django_rest_api.curriculum.serializers import ExperienceSerializer, SkillSerializer, CourseSerializer, CertificateSerializer


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

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_curriculum_course(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_curriculum_certificate(request):
    certificates = Certificate.objects.all()
    serializer = CertificateSerializer(certificates, many=True)
    return JsonResponse(serializer.data, safe=False)