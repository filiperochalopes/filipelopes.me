import React, { useContext, useEffect } from 'react';
import Wrap from './styles';
import AppContext from 'services/AppContext';
import { generateCurriculumPdf } from 'services/pdf';

export default () => {
  const { language } = useContext(AppContext);

  useEffect(() => {
    generateCurriculumPdf(language, { download: true });
  }, [language]);

  return (
    <Wrap>
      <div>
        <h1>
          {language === 'en-us'
            ? 'Your curriculum is downloading.'
            : 'Seu currículo está sendo baixado.'}
        </h1>
        <p>
          {language === 'en-us'
            ? 'If the download does not start automatically, use the button below.'
            : 'Se o download não iniciar automaticamente, use o botão abaixo.'}
        </p>
        <button onClick={() => generateCurriculumPdf(language, { download: true })}>
          {language === 'en-us' ? 'Download again' : 'Baixar novamente'}
        </button>
        <a href="/curriculum">{language === 'en-us' ? 'Back' : 'Voltar'}</a>
      </div>
    </Wrap>
  );
};
