from django_rest_api.curriculum.models import Certificate
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings

def generate_pdf(request):

    return HttpResponse(content=list(Certificate.objects.all()))

