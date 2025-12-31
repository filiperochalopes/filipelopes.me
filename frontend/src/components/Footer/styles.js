import * as styledModule from 'styled-components';
const styled = styledModule.default || styledModule;

export default styled.footer`
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  padding: 60px 0;
  color: #0f172a;

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 0 32px;

    @media (max-width: 600px) {
      flex-direction: column;
      text-align: center;
    }
  }

  h1 {
    font-size: 22px;
    margin: 0 0 6px 0;
  }

  p {
    margin: 0;
    color: #64748b;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .links a {
    color: #94a3b8;
    font-size: 18px;
    transition: color 0.2s ease;
  }

  .links a:hover {
    color: #0f172a;
  }
`;
