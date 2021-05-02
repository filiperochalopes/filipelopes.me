from django.db import models

class Experience(models.Model):
    title_pt_br = models.CharField(max_length=250)
    title_en_us = models.CharField(max_length=250, blank=True)
    organization = models.CharField(max_length=250)
    place = models.CharField(max_length=250)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    key_achievement_pt_br = models.CharField(max_length=250, blank=True) # https://zety.com/blog/work-experience-resume
    key_achievement_en_us = models.CharField(max_length=250, blank=True) 
    since = models.DateField()
    until = models.DateField(blank=True)

class Course(models.Model):
    name = models.CharField(max_length=250)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    since = models.DateField()
    until = models.DateField(blank=True)
    

class Skill(models.Model):
    name_pt_br = models.CharField(max_length=100)
    name_en_us = models.CharField(max_length=100, blank=True)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    level = models.IntegerField()
    icon_file_name = models.CharField(max_length=150)
    parent = models.ForeignKey('Skill', on_delete=models.CASCADE, blank=True, null=True)
