import Footer from './styles';

import React, { useContext, useEffect } from 'react';
import OnVisible from 'react-on-visible';
import AppContext from 'services/AppContext';
import TextLang from 'components/TextLang';

export default () => {
  const { setActiveSection, language } = useContext(AppContext);

  useEffect(() => {
    console.log(language);
  }, [language]);
  const currentYear = new Date().getFullYear();

  return (
    <OnVisible
      bounce={true}
      percent={20}
      onChange={visible => {
        if (visible) {
          setTimeout(() => {
            setActiveSection('contact');
          }, 100);
        } else {
          setActiveSection('portfolio');
        }
      }}
    >
      <Footer id="contact">
        <div className="container">
          <div>
            <img src="/img/filipelopes-logo-horizontal.svg" alt="Filipe Lopes" style={{ maxWidth: '200px', marginBottom: '10px' }} />
            <p>
              &copy; 2010 - {currentYear}.{' '}
              <TextLang
                ptBR="Todos os direitos reservados."
                enUS="All rights reserved."
              />
            </p>
          </div>
          <div className="links">
            <a
              href="https://api.whatsapp.com/send?phone=5571986056232&text=Olá%20Filipe%20Lopes,%20estou%20entrando%20em%20contato%20através%20de%20seu%20site."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://www.instagram.com/filipelopes.web/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram web"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.instagram.com/filipelopes.art/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram art"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:contato@filipelopes.me" aria-label="Email">
              <i className="far fa-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/filipelopes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </Footer>
    </OnVisible>
  );
};
