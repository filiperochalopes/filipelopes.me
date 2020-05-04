import React, { Component } from 'react';
import BulbBt from '../../../../components/bulb_bt';

const style = {
  maxWidth: '60%',
  flexGrow: '2',
};

class SobreMim extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="textSobremim" style={style}>
        <h1>
          <i className="far fa-user-circle"></i> Filipe Lopes,
        </h1>
        <p>
          <i className="fas fa-cross"></i> discípulo de{' '}
          <BulbBt>Jesus Cristo</BulbBt>,
        </p>
        <p>
          <i className="fas fa-user-md"></i> estudante de medicina da
          Universidade Federal da Bahia,
        </p>
        <p>
          <i className="fas fa-drafting-compass"></i> designer gráfico,
        </p>
        <p>
          <i className="fas fa-laptop-code"></i> desenvolvedor WEB desde os 14
          anos (frontend e backend).
        </p>
        <p>
          <i className="fas fa-code-branch"></i> Sempre envolvido em aprender e
          descobrir coisas novas, o inusitado é desafiador, resultando em mais
          de 7 anos de experiência na área. Adepto à legalidade e filosofia
          OpenSource.
        </p>
        <p>
          <i className="fas fa-list"></i> <strong>Características:</strong>{' '}
          Honestidade, legalidade, cumpridor de palavra e prazos.
        </p>
        <p>
          <i className="fas fa-volleyball-ball"></i> <strong>Hobbies:</strong>{' '}
          Fotografia, tracking, arquearia, futebol, basquete, vôlei, desenho,
          instrumentos musicais (violão e teclado), uma boa conversa.
        </p>
      </div>
    );
  }

  componentDidMount() {}
}

export default SobreMim;
