import pytest
import requests
from django_rest_api.settings import TEST_PDF_FILES_DIRECTORY


@pytest.mark.parametrize('infos',[('pt', 1),
('pt', 2),
('pt', 3),
('en', 1),
('en', 2),
('en', 3)]
)
def test_creates_pdfs_from_correct_url(infos):
    response = requests.get(f'http://localhost:8000/pdf/generate?lang={infos[0]}&relevance={infos[1]}')

    with open(f'{TEST_PDF_FILES_DIRECTORY}/test_lang_{infos[0]}_relev_{infos[1]}.pdf', 'wb') as f:
        print('awed')
        f.write(response.content)
        f.close()
    assert response.status_code == 200


@pytest.mark.parametrize('infos',[('er', '1'),
('pt', '4'),
('df', '2'),
('fr', '1'),
('asd', '76'),
('pt', 'naa')]
)
def test_creates_pdfs_from_incorrect_url(infos):
    response = requests.get(f'http://localhost:8000/pdf/generate?lang={infos[0]}&relevance={infos[1]}')

    assert response.status_code == 500