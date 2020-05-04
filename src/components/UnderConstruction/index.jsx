import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UnderConstruction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      toggleStatus: () => {
        this.state.isOpened
          ? this.setState({ isOpened: false })
          : this.setState({ isOpened: true });
      },
    };
  }

  render() {
    return (
      <section
        className={
          this.state.isOpened ? 'nav_construcao bkg' : 'nav_construcao'
        }
        style={this.props.headerTheme}
      >
        {this.state.isOpened ? (
          <p>
            Sabe como é? "Casa de ferreiro, espeto de pau!". O fato é que,
            graças a Deus, estou tendo tanto serviço que não tenho tempo para
            construir melhor o site e organizar portfólio, por isso, por
            enquanto o status desa página é o seguinte:
          </p>
        ) : (
          ''
        )}
        <Button
          variant="contained"
          onClick={this.state.toggleStatus}
          size="small"
          className="mui button block"
          style={this.contactButtons}
        >
          Página temporária, site em construção.
        </Button>
        {this.state.isOpened ? (
          <p>
            Isso significa que tanto o layout, quano seus efeitos, UI e UX estão
            comprmetidos com versões de testes, além de recursos que ainda estão
            em andamento como{' '}
            <Link
              to="/portfolio"
              style={{ color: this.props.headerTheme.background }}
            >
              Portfólio
            </Link>{' '}
            e{' '}
            <Link
              to="/curriculo"
              style={{ color: this.props.headerTheme.background }}
            >
              Currículo.
            </Link>
          </p>
        ) : (
          ''
        )}
      </section>
    );
  }
}
