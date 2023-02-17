import os
from django.shortcuts import render
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from django_rest_api.pdf.facade import generate_pdf
from django.views import View
from xhtml2pdf import pisa
from django.conf import settings
import os
from base64 import b64decode



def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    # use short variable names
    sUrl = settings.STATIC_URL     # Typically /static/
    #static Root
    sRoot = settings.STATIC_ROOT    # Typically /home/userX/project_static/
    mUrl = settings.MEDIA_URL       # Typically /static/media/
    mRoot = settings.MEDIA_ROOT     # Typically /home/userX/project_static/media/

    # convert URIs to absolute system paths
    if uri.startswith(mUrl):
        path = os.path.join(mRoot, uri.replace(mUrl, ""))
    elif uri.startswith(sUrl):
        path = os.path.join(sRoot, uri.replace(sUrl, ""))
    else:
        return uri  # handle absolute uri (ie: http://some.tld/foo.png)

    print(path)
    # make sure that file exists
    if not os.path.isfile(path):
            raise Exception(
                'media URI must start with %s or %s' % (sUrl, mUrl)
            )
    return path


def generate_pdf_curriculum(request):
    try:
        pdf_base64_enconded = generate_pdf()
        decoded = b64decode(pdf_base64_enconded, validate=True)
        with open('/usr/src/app/django_rest_api/django_rest_api/pdf/tests_files/curriculum_test.pdf', 'wb') as f:
            f.write(decoded)
            f.close()
        
        return HttpResponse(content=decoded, content_type='application/pdf')
    except Exception as error:
        return HttpResponse(str(error), status=500)
        #return HttpResponse('Erro inesperado ocorreu enquanto gerava o PDF', status=500)


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(
        BytesIO(html.encode("ISO-8859-1")), result, link_callback=link_callback)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None


data = {
    "company": "Dennnis Ivanov Company",
    "address": "123 Street name",
    "city": "Vancouver",
    "state": "WA",
    "zipcode": "98663",


    "phone": "555-555-2345",
    "email": "youremail@dennisivy.com",
    "website": "dennisivy.com",
}

# Opens up page as PDF


class ViewHTML(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'curriculum.html', data)


class ViewPDF(View):
    def get(self, request, *args, **kwargs):

        pdf = render_to_pdf(
            os.path.join(
                settings.BASE_DIR, 'django_rest_api/pdf/templates/', 'curriculum.html'), data)
        return HttpResponse(pdf, content_type='application/pdf')


# Automaticly downloads to PDF file
class DownloadPDF(View):
    def get(self, request, *args, **kwargs):

        pdf = render_to_pdf(
            os.path.join(
                settings.BASE_DIR, 'django_rest_api/pdf/templates/', 'curriculum.html'), data)

        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "Invoice_%s.pdf" % ("12341231")
        content = "attachment; filename='%s'" % (filename)
        response['Content-Disposition'] = content
        return response
