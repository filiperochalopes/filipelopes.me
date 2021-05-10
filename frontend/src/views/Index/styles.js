import styled from 'styled-components';

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
