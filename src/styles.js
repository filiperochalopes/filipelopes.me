import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  body{
      min-height:100vh;
      color: #353535;
  }

  h1, h2{
    font-family: 'Raleway', sans-serif;
  }
`;

export const theme = {
  orange: {
    background: 'orange',
    textColor: 'black',
    textColorInverted: 'grey',
  },
};
