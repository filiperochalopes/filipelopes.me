import GlobalStyle from './styles';

import asyncComponent from './services/asyncComponent';
import Index from './views/Index';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import AppContext from './services/AppContext';
const AsyncCurriculum = asyncComponent(() => import('./views/Curriculum'));
const AsyncPortfolio = asyncComponent(() => import('./views/Portfolio'));

export default () => {
  const [state, setState] = useState({
    logoReset: false,
    setLogoReset: boolean => setState({ ...state, logoReset: boolean }),
  });
  return (
    <Router>
      <AppContext.Provider value={state}>
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
};
