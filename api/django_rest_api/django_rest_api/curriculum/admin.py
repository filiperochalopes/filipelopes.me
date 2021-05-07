from django.contrib import admin
from django.db import models
from django_rest_api.curriculum.models import Experience, Course, Skill

# admin.site.register(Experience)
# admin.site.register(Course)
# admin.site.register(Skill)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    pass


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    pass


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    pass
