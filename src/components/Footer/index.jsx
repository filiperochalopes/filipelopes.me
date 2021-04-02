import Button from '@material-ui/core/Button';
import React, { useState } from 'react';

export default () => {
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
    <footer>
      <Button
        variant="contained"
        onClick={webAPIshare}
        style={{ background: '#363636' }}
      >
        <i className="fas fa-share-alt"></i>&nbsp;Compartilhar
      </Button>
      <sub>
        Funciona em <i className="fab fa-chrome"></i> Google Chrome
      </sub>
      <sub>
        <i className="far fa-eye"></i> {views} visualizações
      </sub>
      Filipe Lopes &copy; 2018
    </footer>
  );
};
