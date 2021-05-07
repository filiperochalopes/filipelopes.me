from rest_framework import serializers
from django_rest_api.curriculum.models import Experience, Skill


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title_pt_br', 'title_en_us', 'organization', 'place', 'description_pt_br', 'description_en_us',
                  'key_achievement_pt_br', 'key_achievement_pt_br', 'key_achievement_en_us', 'since', 'until', 'created_at', 'updated_at']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name_pt_br', 'name_en_us', 'description_pt_br', 'description_en_us', 'level', 'icon', 'parent', 'created_at', 'updated_at']
