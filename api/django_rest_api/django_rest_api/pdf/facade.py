from django_rest_api.curriculum.models import Certificate
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings
from django_rest_api.pdf.ReportLabCanvasUtils import ReportLabCanvasUtils
import os
from base64 import b64decode


def generate_pdf(request):
    pdf = ReportLabCanvasUtils()
    try:
        pdf.set_font('Lato-Bold', 16)
        pdf.add_oneline_text(text='Nome do Felipe', pos=(294, 798), camp_name='Nome', len_max=100, centralized=True)
        #Get pdf base64
        pdf_base64_enconded = pdf.get_base64()
        decoded = b64decode(pdf_base64_enconded, validate=True)
        with open('/usr/src/app/django_rest_api/django_rest_api/pdf/tests_files/curriculum_test.pdf', 'wb') as f:
            f.write(decoded)
            f.close()
        return HttpResponse(content=list(Certificate.objects.all()))
    except Exception as error:
            return error
    except:
        return Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')

