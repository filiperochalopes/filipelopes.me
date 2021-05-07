import GlobalStyle, { theme } from './styles';

import AppContext from './services/AppContext';
import asyncComponent from './services/asyncComponent';
import Index from './views/Index';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { ParallaxProvider } from 'react-scroll-parallax';
import SmoothScroll from 'smooth-scroll';

const AsyncCurriculum = asyncComponent(() => import('./views/Curriculum'));
const AsyncPortfolio = asyncComponent(() => import('./views/Portfolio'));

export default () => {
  const [state, setState] = useState({
    logoReset: false,
    language: 'pt-br',
    activeSection: null,
  });

  const setLanguage = language => {
    console.log(state);
    return ['pt-br', 'en-us'].includes(language)
      ? setState({ ...state, language })
      : setState({ ...state, language: state.language });
  };
  const setActiveSection = activeSection => {
    console.log(activeSection);
    return [null, 'intro', 'me', 'curriculum', 'contact'].includes(
      activeSection
    )
      ? setState({ ...state, activeSection })
      : setState({ ...state, activeSection: state.activeSection });
  };

  const setLogoReset = boolean => setState({ ...state, logoReset: boolean });

  useEffect(() => {
    new SmoothScroll('a[href*="#"]', {
      speed: 300,
    });
  }, []);

  return (
    <ParallaxProvider>
      <Router>
        <AppContext.Provider
          value={{
            ...state,
            setLogoReset,
            setLanguage,
            setActiveSection,
          }}
        >
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
    </ParallaxProvider>
  );
};
