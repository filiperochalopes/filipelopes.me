import Wrap from './styles';
import Curriculum from '../Curriculum';
import Me from 'components/Me';
import Intro from 'components/Intro';
import Header from 'components/Header';
import React from 'react';

export default () => {
  return (
    <Wrap>
      <Intro />
      <Header />
      <Me />
      <Curriculum />
    </Wrap>
  );
};
