import * as styledModule from 'styled-components';

const styled = styledModule.default || styledModule;

export default styled.main`
  background: ${({ theme }) => theme.default.backgroundColor};
  min-height: 100vh;
  text-align: center;
  padding-top: calc(50vh - 135px);

  h1 {
    display: inline-block;
    margin: 0 auto;
    padding-top: 80px;
  }
`;
