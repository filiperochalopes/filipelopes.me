# Generated by Django 3.1.7 on 2021-04-02 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_pt_br', models.CharField(blank=True, max_length=200)),
                ('title_en_us', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('excerpt_pt_br', models.TextField(blank=True)),
                ('excerpt_en_us', models.TextField(blank=True)),
                ('content_pt_br', models.TextField()),
                ('content_en_us', models.TextField(blank=True)),
                ('type', models.TextField(choices=[('IMG', 'Image'), ('VID', 'Video'), ('TXT', 'Text'), ('HTML', 'Html')], max_length=4)),
            ],
        ),
    ]