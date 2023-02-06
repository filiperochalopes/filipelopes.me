from django_rest_api.curriculum.models import Certificate
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings
from django_rest_api.pdf.ReportLabCanvasUtils import ReportLabCanvasUtils
import os
import json


def generate_pdf():
    pdf = ReportLabCanvasUtils()
    try:
        with open(settings.FILIPE_DATA_JSON, 'r') as f:
            filipe_data = json.loads(f.read())
        pdf.set_font('Lato-Bold', 35)
        pdf.add_oneline_text(text=filipe_data['name'], pos=(294, 780), camp_name='Nome', len_max=100, centralized=True, interval=' ')
        pdf.set_font('Lora-Regular', 12)
        pdf.add_oneline_text(text=f"{filipe_data.get('phone_number')}  |  {filipe_data.get('email')}  |  {filipe_data.get('website')}", pos=(294, 730), camp_name='Informacoes de Contato', len_max=100, centralized=True)
        pdf.add_rectangle(pos=(30, 697), width=535, height=1, fill=1, color=(0,0,0,0))
        pdf.add_rectangle(pos=(30, 690), width=535, height=1, fill=1, color=(0,0,0,0))
        last_y_pos = pdf.add_morelines_text(text=filipe_data.get('about'), initial_pos=(30, 650), camp_name='Sobre', len_max=5000, decrease_ypos=16, char_per_lines=95)
        pdf.add_rectangle(pos=(30, last_y_pos-(16*2)), width=535, height=1, fill=1, color=(0,0,0,0))
        
        
        
        
        
        
        
        
        
        
        
        #Get pdf base64
        return pdf.get_base64()
        
    except Exception as error:
        raise error
    except:
        raise Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')

