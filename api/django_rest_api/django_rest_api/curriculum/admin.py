from django.contrib import admin
from django.db import models
from django_rest_api.curriculum.models import Experience, Course, Skill, Category, Relevance, Certificate

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Experience)
admin.site.register(Relevance)
admin.site.register(Certificate)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    pass
