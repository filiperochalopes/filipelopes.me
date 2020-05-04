import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import OnVisible from 'react-on-visible';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.contactButtons = {
      margin: '10px 20px',
      marginLeft: '0',
      display: 'inline-block',
    };

    this.state = {
      views: 0,
    };

    this.get_put_Views();
  }

  get_put_Views = () => {
    // fetch("server/get_put_views.php")
    fetch('https://server.filipelopes.me/get_put_views.php')
      .then(function (response) {
        return response.text();
      })
      .then((data) => {
        let json = JSON.parse(data);
        this.setState({
          views: json.views,
        });
      });
  };

  webAPIshare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'site de Filipe Lopes',
          text: 'Dê uma olhada no site de Filipe Lopes, desenvolvedor WEB.',
          url: 'https://filipelopes.me',
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Seu navegador não suporta essa função');
    }
  };

  render() {
    return (
      <footer>
        <Button
          variant="contained"
          onClick={this.webAPIshare}
          style={{ background: '#363636' }}
        >
          <i className="fas fa-share-alt"></i>&nbsp;Compartilhar
        </Button>
        <sub>
          Funciona em <i className="fab fa-chrome"></i> Google Chrome
        </sub>
        <sub>
          <i className="far fa-eye"></i> {this.state.views} visualizações
        </sub>
        Filipe Lopes &copy; 2018
      </footer>
    );
  }
}

export default Footer;
