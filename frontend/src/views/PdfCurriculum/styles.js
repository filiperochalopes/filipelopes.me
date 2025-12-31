import * as styledModule from 'styled-components';
const styled = styledModule.default || styledModule;

export default styled.section`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;

  h1 {
    margin: 0 0 16px 0;
  }

  p {
    margin: 0 0 24px 0;
    color: #64748b;
  }

  button {
    border: 1px solid #e2e8f0;
    background: #fff;
    padding: 8px 18px;
    border-radius: 999px;
    font-family: 'PT Sans', sans-serif;
    cursor: pointer;
  }

  a {
    display: block;
    margin-top: 14px;
    color: #0f172a;
  }
`;
