import * as styledModule from 'styled-components';
const styled = styledModule.default || styledModule;

export default styled.footer`
  border-top: 1px solid #e2e8f0;
  background: #ef9d0e;
  padding: 60px 0;
  color: #ffffff;

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    padding: 0 32px;
  }

  h1 {
    font-size: 22px;
    margin: 0 0 6px 0;
  }

  p {
    margin: 0;
    color: #ffffff;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .links a {
    color: #ffffff;
    font-size: 18px;
    transition: opacity 0.2s ease;
  }

  .links a:hover {
    opacity: 0.8;
    color: #ffffff;
  }
`;
