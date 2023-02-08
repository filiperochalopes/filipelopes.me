from django_rest_api.curriculum.models import Certificate, Course, Experience
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
        
        pdf.set_font('Lora-Regular', 10)
        pdf.add_oneline_text(text=f"{filipe_data.get('phone_number')}  |  {filipe_data.get('email')}  |  {filipe_data.get('website')}", pos=(294, 730), camp_name='Informacoes de Contato', len_max=100, centralized=True)
        pdf.add_rectangle(pos=(30, 697), width=535, height=1, fill=1, color=(0,0,0,0))
        pdf.add_rectangle(pos=(30, 690), width=535, height=1, fill=1, color=(0,0,0,0))
        last_y_pos = pdf.add_morelines_text(text=filipe_data.get('about'), initial_pos=(30, 650), camp_name='Sobre', len_max=5000, decrease_ypos=16, char_per_lines=110)
        new_y_pos = last_y_pos - (16*2)
        pdf.add_rectangle(pos=(30, new_y_pos), width=535, height=1, fill=1, color=(0,0,0,0))
        new_y_pos -= 40
        pdf.add_oneline_text(text=f'EDUCAÇÃO', pos=(30, new_y_pos), camp_name='titulo Educacao', len_max=100, interval=' ')
        pdf.add_oneline_text(text=f'EXPERIÊNCIA PROFISSIONAL', pos=(217, new_y_pos), camp_name='titulo experiencia', len_max=100, interval=' ')
        pdf.add_rectangle(pos=(177, new_y_pos+10), width=1, height=-520, fill=1, color=(0,0,0,0))
        old_y_pos = new_y_pos
        # relevance_id has to be 3 (HIGH)
        new_y_pos = pdf.add_education(courses=Course.objects.filter(relevance_id=3), y_pos=new_y_pos)
        
        pdf.add_work_experience(experiences=Experience.objects.filter(relevance_id=3), y_pos=old_y_pos)
        
        
        
        
        
        
        
        
        
        #Get pdf base64
        return pdf.get_base64()
        
    except Exception as error:
        raise error
    except:
        raise Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')
