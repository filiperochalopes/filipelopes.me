from django_rest_api.curriculum.models import Certificate
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings
from django_rest_api.pdf.ReportLabCanvasUtils import ReportLabCanvasUtils
import os
import json
from base64 import b64decode


def generate_pdf(request):
    pdf = ReportLabCanvasUtils()
    try:
        with open(settings.FILIPE_DATA_JSON, 'r') as f:
            filipe_data = json.loads(f.read())
        pdf.set_font('Lato-Bold', 35)
        pdf.add_oneline_text(text=filipe_data['name'], pos=(294, 780), camp_name='Nome', len_max=100, centralized=True, interval=' ')
        pdf.set_font('Lora-Regular', 12)
        pdf.add_oneline_text(text=f"{filipe_data.get('phone_number')}  |  {filipe_data.get('email')}  |  {filipe_data.get('website')}", pos=(294, 730), camp_name='Informacoes de Contato', len_max=100, centralized=True)
        
        
        
        
        
        
        
        
        
        
        
        
        
        #Get pdf base64
        pdf_base64_enconded = pdf.get_base64()
        decoded = b64decode(pdf_base64_enconded, validate=True)
        with open('/usr/src/app/django_rest_api/django_rest_api/pdf/tests_files/curriculum_test.pdf', 'wb') as f:
            f.write(decoded)
            f.close()
        
        return HttpResponse(content=str('aaaaaaa'))
    except Exception as error:
            return error
    except:
        return Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')

