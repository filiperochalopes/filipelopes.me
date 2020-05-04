import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class Contato extends Component {
  constructor(props) {
    super(props);

    this.contactButtons = {
      margin: '10px 20px',
      marginLeft: '0',
      display: 'inline-block',
    };
  }

  render() {
    return (
      <section className="container">
        <h1>Contato</h1>
        <Button
          variant="contained"
          href="https://api.whatsapp.com/send?phone=5571986056232&text=Olá%20Filipe%20Lopes,%20estou%20entrando%20em%20contato%20através%20de%20seu%20site."
          target="_blank"
          size="large"
          className="mui button whatsapp block"
          style={this.contactButtons}
        >
          <i className="fab fa-whatsapp"></i>&nbsp;WhatsApp
        </Button>

        <Button
          variant="contained"
          href="https://www.instagram.com/filipelopes.web/"
          target="_blank"
          size="large"
          className="mui button instagram block"
          style={this.contactButtons}
        >
          <i className="fab fa-instagram"></i>&nbsp;Instagram.web
        </Button>

        <Button
          variant="contained"
          href="https://www.instagram.com/filipelopes.art/"
          target="_blank"
          size="large"
          className="mui button instagram block"
          style={this.contactButtons}
        >
          <i className="fab fa-instagram"></i>&nbsp;Instagram.art
        </Button>

        <p className="min-opacity">
          Esse é um site temporário, em breve portfólio, currículo e outros
          recursos.
        </p>
      </section>
    );
  }
}

export default Contato;
