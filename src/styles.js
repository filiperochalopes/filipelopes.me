import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,body {
    padding: 0;
    margin: 0;
    font-family: 'PT Sans', sans-serif;
    line-height: 135%;
    /* font-family: 'Open Sans', sans-serif; */
  }

  body{
      min-height:100vh;
      color: #353535;
  }

  h1, h2{
    /* font-family: 'Raleway', sans-serif; */
    font-family: 'VT323', monospace;
  }

  h1{
    font-size: 43px;
  }

  h2{
    font-size: 35px;
  }
`;

export const theme = {
  orange: {
    background: 'orange',
    textColor: 'black',
    textColorInverted: 'grey',
  },
  default: {
    backgroundColor: '#ef9d0e',
    invertedBackgroundColor: '#353535',
    textColor: 'black',
    textColorInverted: '#e8eaed',
    colors: {
      black: '#191919',
    },
  },
};
