import Header, { LanguageBt } from './styles';

import Navigation from './components/Navigation';

import React, { useContext, useEffect } from 'react';
import AppContext from 'services/AppContext';

export default () => {
  const { activeSection, setActiveSection, language, setLanguage } = useContext(
    AppContext
  );

  const sections = [
    { reference: 'me', title_ptBR: 'Me', title_enUS: 'Me' },
    {
      reference: 'curriculum',
      title_ptBR: 'Currículo',
      title_enUS: 'Curriculum',
    },
    { reference: 'contact', title_ptBR: 'Contato', title_enUS: 'Contact' },
  ];

  const moveTo = index => () => {
    const reference = sections[index].reference;
    setActiveSection(reference);
  };

  useEffect(() => {
    console.log('language', language);
  }, [language]);

  return (
    <Header>
      <Navigation
        items={sections}
        activeItem={(() => {
          let item = null;
          sections.forEach((section, index) => {
            if (section.reference === activeSection) item = index;
          });
          return item;
        })()}
        moveTo={moveTo}
      />
      <LanguageBt
        onClick={() => {
          if (language === 'pt-br') {
            setLanguage('en-us');
          } else {
            setLanguage('pt-br');
          }
        }}
      >
        {language === 'pt-br' ? (
          <img src="/img/br_flag.gif" alt="Bandeira do Brasil" />
        ) : (
          <img src="/img/us_flag.gif" alt="US Flag" />
        )}
      </LanguageBt>
    </Header>
  );
};
