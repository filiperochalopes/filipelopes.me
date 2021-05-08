from django.contrib import admin
from django.db import models
from django_rest_api.curriculum.models import Experience, Course, Skill, Category

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Experience)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    pass
