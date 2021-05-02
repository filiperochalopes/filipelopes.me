import GlobalStyle, { theme } from './styles';

import AppContext from './services/AppContext';
import asyncComponent from './services/asyncComponent';
import Index from './views/Index';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

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
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/portfolio/:name?" component={AsyncPortfolio} />
            <Route path="/curriculo" component={AsyncCurriculum} />
            <Route path="/curriculum" component={AsyncCurriculum} />
          </Switch>
        </ThemeProvider>
      </AppContext.Provider>
    </Router>
  );
};
