from django_rest_api.curriculum.models import Certificate, Course, Experience, Skill
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings
from django_rest_api.pdf.ReportLabCanvasUtils import ReportLabCanvasUtils
import os
import json

def generate_pdf(relevance:int=3, lang:str='pt'):
    pdf = ReportLabCanvasUtils()
    DEFAULT_PAGE_Y_LIMIT = 30
    try:
        if lang == 'pt':
            # Variable to be used in titles
            pdf.default_language = 'pt'
        elif lang == 'en':
            pdf.default_language = 'en'
        else:
            raise Exception(f'selected language "{lang}" does not exist, please select "pt" or "en"')
        
        relevance = int(relevance)
        if relevance not in [1,2,3]:
            raise Exception(f'selected relevance "{relevance}" does not exist, please select 1, 2 or 3')
        
        with open(settings.FILIPE_DATA_JSON, 'r') as f:
            filipe_data = json.loads(f.read())
        pdf.set_font('Lato-Bold', 35)

        pdf.add_oneline_text(text=str(filipe_data[pdf.default_language].get('name')).upper(), pos=(294, 780), field_name='Nome', len_max=100, centralized=True, interval=' ')
        

        pdf.set_font('Lora-Regular', 12)
        pdf.add_oneline_text(text=str(filipe_data[pdf.default_language].get('professional_title')).upper(), pos=(294, 747), field_name='Titulo profissional | Professional Title', len_max=100, centralized=True, interval=' ')
        
        pdf.set_font('Lora-Regular', 10)
        pdf.add_oneline_text(text=f"{filipe_data[pdf.default_language].get('phone_number')}  |  {filipe_data[pdf.default_language].get('email')}  |  {filipe_data[pdf.default_language].get('website')}", pos=(294, 700), field_name='Informacoes de Contato | Contact info', len_max=100, centralized=True)
        # bars between contact info and about
        pdf.add_rectangle(pos=(30, 680), width=535, height=1, fill=1, color=(0,0,0,0))
        pdf.add_rectangle(pos=(30, 673), width=535, height=1, fill=1, color=(0,0,0,0))
        last_y_pos = pdf.add_morelines_text(text=filipe_data[pdf.default_language].get('about'), initial_pos=(30, 630), field_name='Sobre | About', len_max=5000, decrease_ypos=16, char_per_lines=105, paragraph_widht=536)
        
        
        new_y_pos = last_y_pos - (16*2)
        # Bar between about and education
        pdf.add_rectangle(pos=(30, new_y_pos), width=535, height=1, fill=1, color=(0,0,0,0))
        new_y_pos -= 40
        
        pdf.set_font('Lora-Regular', 9)
        # vertical bar between education and experience
        pdf.add_rectangle(pos=(190, new_y_pos+10), width=1, height=-520, fill=1, color=(0,0,0,0))
        old_y_pos = new_y_pos
        new_y_pos, education_pag_number = pdf.add_education(courses=Course.objects.filter(relevance_id__gte=relevance), y_pos=new_y_pos, page_y_limit=DEFAULT_PAGE_Y_LIMIT)
        work_y_pos, work_page_number = pdf.add_work_experience(experiences=Experience.objects.filter(relevance_id__gte=relevance), y_pos=old_y_pos, page_y_limit=DEFAULT_PAGE_Y_LIMIT)
        new_y_pos -= 25
        y_pos = pdf.add_skills(skills=Skill.objects.filter(relevance_id__gte=relevance), y_pos=new_y_pos, education_pag_number=education_pag_number, page_y_limit=DEFAULT_PAGE_Y_LIMIT)
        work_y_pos = pdf.add_certificates(certificates=Certificate.objects.filter(relevance_id__gte=relevance), y_pos=work_y_pos, work_page_number=work_page_number, page_y_limit=DEFAULT_PAGE_Y_LIMIT)
        
        #Get pdf base64
        return pdf.get_base64()
        
    except Exception as error:
        raise error
    except:
        raise Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')
