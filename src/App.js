import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import Header from './components/header'
// import Curriculo from './components/curriculo.jsx'
import Portfolio from './pages/portfolio'
import Contato from './components/contato'
import Footer from './components/footer'
import PixelizedImage from './components/PixelizedImage'
import asyncComponent from './functions/async_component';

const AsyncCurriculo = asyncComponent(() => import("./pages/curriculo"));

export const AppContext = React.createContext();

class App extends Component {
  constructor(props){
    super(props)

    // State com todos os dados globais necessários para a aplicação
    this.state = {
      // Context state
    };
  }

  render() {
    return (
    <Router>
      <AppContext.Provider value={this.state} >
      <Switch>
        <Route exact path="/" render={ () => ([
          <Header/>,
          <PixelizedImage/>,
          // <section>
          //   <h2>Clientes</h2>
          //   btcbolsa
          // </section>,
          <Contato />,
          <Footer/>,
        ])} />
        <Route path="/portfolio/:name?" component={Portfolio} />
        <Route path="/curriculo" component={AsyncCurriculo} />
      </Switch>
      </AppContext.Provider>
    </Router>
    );
  }
}

export default App;