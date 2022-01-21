from django.db import models


class Experience(models.Model):
    title_pt_br = models.CharField(max_length=250)
    title_en_us = models.CharField(max_length=250, blank=True)
    organization = models.CharField(max_length=250)
    place = models.CharField(max_length=250)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    # https://zety.com/blog/work-experience-resume
    key_achievement_pt_br = models.CharField(max_length=250, blank=True)
    key_achievement_en_us = models.CharField(max_length=250, blank=True)
    since = models.DateField()
    until = models.DateField(blank=True, null=True)
    relevance = models.ForeignKey(
        'Relevance', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title_pt_br} - {self.organization}"


class Course(models.Model):
    name_pt_br = models.CharField(max_length=250)
    name_en_us = models.CharField(max_length=250, blank=True)
    place_pt_br = models.CharField(max_length=250, blank=True)
    place_en_us = models.CharField(max_length=250, blank=True)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    since = models.DateField()
    until = models.DateField(blank=True, null=True)
    relevance = models.ForeignKey(
        'Relevance', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name_pt_br} - {self.place_pt_br}"


class Category(models.Model):
    name_pt_br = models.CharField(max_length=100)
    name_en_us = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return f"{self.name_pt_br}"


class Skill(models.Model):
    name_pt_br = models.CharField(max_length=100)
    name_en_us = models.CharField(max_length=100, blank=True)
    description_pt_br = models.TextField(blank=True)
    description_en_us = models.TextField(blank=True)
    level = models.IntegerField()
    icon = models.ImageField(upload_to='skills', blank=True)
    parent = models.ForeignKey(
        'Skill', on_delete=models.CASCADE, blank=True, null=True)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, blank=True, null=True)
    relevance = models.ForeignKey(
        'Relevance', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # tags (to search)

    def __str__(self):
        label = ""
        if self.category:
            label = f"{label} {self.category.name_pt_br} -"
        if self.parent:
            label = f"{label} ({self.parent.name_pt_br})"
        label = f"{label} {self.name_pt_br}: {self.level}%"
        return label


class Relevance(models.Model):
    RELEVANCE_CHOICES = (
        ("HIGH", "HIGH"),
        ("MID", "MID"),
        ("LOW", "LOW")
    )
    value = models.CharField(
        max_length=4, choices=RELEVANCE_CHOICES, blank=False, null=False, default="LOW")
    order = models.IntegerField(default=1)
    description_pt_br = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.order} - {self.value}"


class Certificate(models.Model):
    title_pt_br = models.CharField(max_length=100)
    title_en_us = models.CharField(max_length=100, blank=True)
    date = models.DateField(blank=True, null=True)
    file = models.FileField(upload_to='certificates', blank=True)
    relevance = models.ForeignKey(
        'Relevance', on_delete=models.CASCADE, blank=True, null=True)
    course = models.ForeignKey(
        'Course', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title_pt_br