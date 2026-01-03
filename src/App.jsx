import GlobalStyle, { theme } from './styles';

import AppContext from './services/AppContext';
import asyncComponent from './services/asyncComponent';
import Index from './views/Index';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

const AsyncCurriculum = asyncComponent(() => import('./views/Curriculum'));
const AsyncPortfolio = asyncComponent(() => import('./views/Portfolio'));
const AsyncPdfCurriculum = asyncComponent(() => import('./views/PdfCurriculum'));

export default () => {
  const [state, setState] = useState({
    logoReset: false,
    language: 'pt-br',
    activeSection: null,
  });

  const setLanguage = language => {
    console.log(state);
    return setState(prevState => {
      if (!['pt-br', 'en-us'].includes(language)) {
        return prevState;
      }
      return { ...prevState, language };
    });
  };
  const setActiveSection = activeSection => {
    console.log(activeSection);
    return setState(prevState => {
      if (
        ![null, 'intro', 'me', 'curriculum', 'portfolio', 'contact'].includes(
          activeSection
        )
      ) {
        return prevState;
      }
      return { ...prevState, activeSection };
    });
  };

  const setLogoReset = boolean =>
    setState(prevState => ({ ...prevState, logoReset: boolean }));

  useEffect(() => {
    import('smooth-scroll').then((module) => {
      const SmoothScroll = module.default;
      new SmoothScroll('a[href*="#"]', {
        speed: 300,
      });
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
              <Route path="/pdf/curriculum" component={AsyncPdfCurriculum} />
              <Route
                path="/pdf/download/curriculum"
                component={AsyncPdfCurriculum}
              />
            </Switch>
          </ThemeProvider>
        </AppContext.Provider>
      </Router>
    </ParallaxProvider>
  );
};
