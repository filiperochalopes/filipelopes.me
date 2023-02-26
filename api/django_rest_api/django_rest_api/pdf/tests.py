import pytest
import requests


@pytest.mark.parametrize('infos',[('pt', '1'),
                     ('pt', '2'),
                     ('pt', '3'),
                     ('en', '1'),
                     ('en', '2'),
                     ('en', '3')]
)
def test_creates_pdfs_from_correct_url(infos):
    response = requests.get(f'http://localhost:8000/pdf/generate?lang={infos[0]}&relevance={infos[1]}')

    with open(f'/usr/src/app/django_rest_api/django_rest_api/pdf/tests_files/test_lang_{infos[0]}_relev_{infos[1]}.pdf', 'wb') as f:
            f.write(response.content)
            f.close()
    assert response.status_code == 200