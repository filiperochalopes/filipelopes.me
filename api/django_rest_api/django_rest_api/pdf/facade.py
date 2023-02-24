from django_rest_api.curriculum.models import Certificate, Course, Experience, Skill
from django_rest_api.curriculum.views import get_curriculum_certificate
from django.http import HttpResponse, JsonResponse
import django_rest_api.settings as settings
from django_rest_api.pdf.ReportLabCanvasUtils import ReportLabCanvasUtils
import os
import json


def generate_pdf(relevance:str=3, lang:str='pt'):
    pdf = ReportLabCanvasUtils()
    try:
        if lang == 'pt':
            # Variable to be used in titles
            language_is_portuguese = True
            pdf.default_language = 'pt'
        elif lang == 'en':
            language_is_portuguese = False
            pdf.default_language = 'en'
        else:
            raise Exception(f'selected language "{lang}" does not exist, please select "pt" or "en"')
        
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
        last_y_pos = pdf.add_morelines_text(text=filipe_data[pdf.default_language].get('about'), initial_pos=(30, 630), field_name='Sobre | About', len_max=5000, decrease_ypos=16, char_per_lines=110)
        new_y_pos = last_y_pos - (16*2)
        # Bar between about and education
        pdf.add_rectangle(pos=(30, new_y_pos), width=535, height=1, fill=1, color=(0,0,0,0))
        new_y_pos -= 40
        pdf.set_font('Lora-Regular', 12)
        if language_is_portuguese:
            pdf.add_oneline_text(text=f'EDUCAÇÃO', pos=(30, new_y_pos), field_name='titulo Educacao', len_max=100, interval=' ')
            pdf.add_oneline_text(text=f'EXPERIÊNCIA PROFISSIONAL', pos=(217, new_y_pos), field_name='titulo experiencia', len_max=100, interval=' ')
        else:
            pdf.add_oneline_text(text=f'EDUCATION', pos=(30, new_y_pos), field_name='Education Title', len_max=100, interval=' ')
            pdf.add_oneline_text(text=f'PROFESSIONAL EXPERIENCE', pos=(217, new_y_pos), field_name='Experience title', len_max=100, interval=' ')
            
        pdf.set_font('Lora-Regular', 9)
        # vertical bar between education and experience
        pdf.add_rectangle(pos=(177, new_y_pos+10), width=1, height=-520, fill=1, color=(0,0,0,0))
        old_y_pos = new_y_pos
        # relevance_id has to be 3 (HIGH)
        new_y_pos = pdf.add_education(courses=Course.objects.filter(relevance_id=relevance), y_pos=new_y_pos)
        work_y_pos = pdf.add_work_experience(experiences=Experience.objects.filter(relevance_id=relevance), y_pos=old_y_pos)
        new_y_pos -= 25
        # TODO
        # Add Skill relevance_id filter
        #pdf.add_skills(skills=Skill.objects.filter(relevance_id=relevance), y_pos=new_y_pos)
        y_pos = pdf.add_skills(skills=Skill.objects.all(), y_pos=new_y_pos)
        
        #work_y_pos = pdf.add_certificates(certificates=Certificate.objects.filter(relevance_id=relevance), y_pos=work_y_pos)
        work_y_pos = pdf.add_certificates(certificates=Certificate.objects.all(), y_pos=work_y_pos)
        
        
        
        
        
        
        
        
        
        #Get pdf base64
        return pdf.get_base64()
        
    except Exception as error:
        raise error
    except:
        raise Exception('Erro desconhecido ocorreu enquanto adicionava dados obrigadorios')
