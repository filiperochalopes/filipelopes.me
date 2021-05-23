import OnVisible from 'react-on-visible';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from 'services/AppContext';
import Footer, { ContactButton } from './styles';

export default () => {
  const { setActiveSection, language } = useContext(AppContext);

  useEffect(() => {
    console.log(language);
  }, [language]);

  const [views, setViews] = useState(0);
  const get_put_Views = () => {
    // fetch("server/get_put_views.php")
    fetch('https://server.filipelopes.me/get_put_views.php')
      .then(function (response) {
        return response.text();
      })
      .then(data => {
        let json = JSON.parse(data);
        setViews(json.views);
      });
  };

  get_put_Views();

  const webAPIshare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'site de Filipe Lopes',
          text: 'Dê uma olhada no site de Filipe Lopes, desenvolvedor WEB.',
          url: 'https://filipelopes.me',
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    } else {
      alert('Seu navegador não suporta essa função');
    }
  };

  return (
    <OnVisible
      bounce={true}
      onChange={visible => {
        if (visible) {
          setTimeout(() => {
            setActiveSection('contact');
          }, 100);
        } else {
          setActiveSection('curriculum');
        }
      }}
    >
      <Footer id="contact">
        <section className="container">
          <h1>Contato</h1>
          <ContactButton
            variant="contained"
            href="https://api.whatsapp.com/send?phone=5571986056232&text=Olá%20Filipe%20Lopes,%20estou%20entrando%20em%20contato%20através%20de%20seu%20site."
            target="_blank"
            size="large"
            color="whatsapp"
          >
            <i className="fab fa-whatsapp"></i>&nbsp;WhatsApp
          </ContactButton>

          <ContactButton
            variant="contained"
            href="https://www.instagram.com/filipelopes.web/"
            target="_blank"
            size="large"
            color="instagram"
          >
            <i className="fab fa-instagram"></i>&nbsp;Instagram.web
          </ContactButton>

          <ContactButton
            variant="contained"
            href="https://www.instagram.com/filipelopes.art/"
            target="_blank"
            size="large"
            color="instagram"
          >
            <i className="fab fa-instagram"></i>&nbsp;Instagram.art
          </ContactButton>
        </section>
        <sub>
          <i className="far fa-eye"></i> {views} visualizações
        </sub>
        Filipe Lopes &copy; 2010 - 2021
      </Footer>
    </OnVisible>
  );
};
