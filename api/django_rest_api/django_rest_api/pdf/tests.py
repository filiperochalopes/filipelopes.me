import pytest
import requests



def test_render_pdf():
    response = requests.get('http://localhost:8000/pdf/generate?lang=pt&relevance=2')

    with open('/usr/src/app/django_rest_api/django_rest_api/pdf/tests_files/curriculum_test.pdf', 'wb') as f:
            f.write(response.content)
            f.close()
    assert response.status == 200