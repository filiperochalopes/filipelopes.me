"""django_rest_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from django_rest_api.core import views
from rest_framework.schemas import get_schema_view
from django_rest_api.posts.views import get_post
from django_rest_api.curriculum.views import get_curriculum_experience, get_curriculum_skill, get_curriculum_course
from django_rest_api.pdf.views import ViewPDF, ViewHTML, DownloadPDF

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/posts', get_post),
    re_path(r'^api/posts/(?P<slug>[-\w]+)', get_post),
    path('api/curriculum/experience', get_curriculum_experience),
    path('api/curriculum/skill', get_curriculum_skill),
    path('api/curriculum/course', get_curriculum_course),
    path('cms/', include(('django_rest_api.cms.urls', 'cms'), namespace='cms')),
    path('pdf/html/curriculum', ViewHTML.as_view(), name="pdf_html"),
    path('pdf/curriculum', ViewPDF.as_view(), name="pdf_view"),
    path('pdf/download/curriculum', DownloadPDF.as_view(), name="pdf_download"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('openapi', get_schema_view(
        title="Your Project",
        description="API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs/', TemplateView.as_view(
        template_name='openapi.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='openapi')
] 

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT, show_indexes=True)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT, show_indexes=True) 
