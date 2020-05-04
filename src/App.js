import './sass/app.scss';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import PixelizedImage from './components/PixelizedImage';
import asyncComponent from './services/async_component';
import Portfolio from './views/Portfolio';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AsyncCurriculo = asyncComponent(() => import('./views/Curriculum'));

export const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);

    // State com todos os dados globais necessários para a aplicação
    this.state = {
      // Context state
    };
  }

  render() {
    return (
      <Router>
        <AppContext.Provider value={this.state}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => [
                <Header />,
                <PixelizedImage />,
                // <section>
                //   <h2>Clientes</h2>
                //   btcbolsa, Marinha do Brasil, INEMA, ALT-, Montreal Informática, Lithocenter Hospital DIa
                // </section>,
                <Contact />,
                <Footer />,
              ]}
            />
            <Route path="/portfolio/:name?" component={Portfolio} />
            <Route path="/curriculo" component={AsyncCurriculo} />
          </Switch>
        </AppContext.Provider>
      </Router>
    );
  }
}

export default App;
