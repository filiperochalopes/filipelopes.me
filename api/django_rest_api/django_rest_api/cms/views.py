from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django_rest_api.curriculum.models import Experience, Skill


def login(request):
    return render(request, 'login.html')


def add_experience(request):
    mensagem, cor = None, None

    if request.method == 'POST':
        try:
            experience = Experience()
            experience.title_pt_br = request.POST.get('title_pt_br')
            experience.title_en_us = request.POST.get('title_en_us')
            experience.organization = request.POST.get('organization')
            experience.place = request.POST.get('place')
            experience.description_pt_br = request.POST.get(
                'description_pt_br')
            experience.description_en_us = request.POST.get(
                'description_en_us')
            experience.key_achievement_pt_br = request.POST.get(
                'key_achievement_pt_br')
            experience.key_achievement_en_us = request.POST.get(
                'key_achievement_en_us')
            experience.since = request.POST.get('since')
            experience.until = request.POST.get('until')
            experience.save()
            mensagem = "Adicionado com sucesso!"
            cor = "#7ee534"
        except Exception as e:
            mensagem = f"Erro ao adicionar: {e}"
            cor = "#e52222"

    return render(request, 'add_experience.html', {'mensagem': mensagem, 'cor': cor})


def add_skill(request):
    mensagem, cor = None, None
    skills = Skill.objects.all()

    if request.method == 'POST':
        try:
            skill = Skill()
            icon = request.FILES['icon']
            fs = FileSystemStorage()
            filename = fs.save(icon.name, icon)
            uploaded_file_url = fs.url(filename)
            skill.name_pt_br = request.POST.get('title_pt_br')
            skill.name_en_us = request.POST.get('name_en_us')
            skill.description_pt_br = request.POST.get('description_pt_br')
            skill.description_en_us = request.POST.get('description_en_us')
            skill.level = request.POST.get('level')
            skill.icon_file_name = filename
            if request.POST.get('parent_id'):
                parent = Skill.objects.get(id=request.POST.get('parent_id'))
                skill.parent = parent
            skill.save()
            mensagem = "Adicionado com sucesso!"
            cor = "#7ee534"
        except Exception as e:
            mensagem = f"Erro ao adicionar: {e}"
            cor = "#e52222"

    return render(request, 'add_skill.html', {'mensagem': mensagem, 'cor': cor, 'skills': skills})
