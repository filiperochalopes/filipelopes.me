import Wrap from './styles';

import Curriculum from '../Curriculum';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Intro from 'components/Intro';
import Me from 'components/Me';
import React from 'react';

export default () => {
  return (
    <Wrap>
      <Intro />
      <Header />
      <Me />
      <Curriculum />
      <Footer />
    </Wrap>
  );
};
