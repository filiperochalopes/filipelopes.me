import asyncComponent from './services/asyncComponent';
import Index from './views/Index';
import GlobalStyle from './styles';
import { Normalize } from 'styled-normalize';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const AsyncCurriculum = asyncComponent(() => import('./views/Curriculum'));
const AsyncPortfolio = asyncComponent(() => import('./views/Portfolio'));

export const AppContext = React.createContext();

const providerAppContextValue = {
  theme: 'orange',
};

export default () => (
  <Router>
    <AppContext.Provider value={providerAppContextValue}>
      <Normalize />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/portfolio/:name?" component={AsyncPortfolio} />
        <Route path="/curriculo" component={AsyncCurriculum} />
        <Route path="/curriculum" component={AsyncCurriculum} />
      </Switch>
    </AppContext.Provider>
  </Router>
);
