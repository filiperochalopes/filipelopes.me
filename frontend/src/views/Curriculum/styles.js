import styled from 'styled-components';

export const SkillList = styled.ul`
  list-style: none;
`;

export const ExperienceList = styled.ul`
  list-style: none;
`;

export default styled.section`
  color: #fff;
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  width: 100%;
  text-align: left;
  font-size: 21px;
  line-height: 28px; // 135%
  padding-bottom: 50px;

  .container {
    max-width: 670px;
    margin: 0 auto;

    @media (max-width: 480px) {
      padding: 0 32px;
    }
  }

  h1 {
    display: block;
    text-align: left;
    margin-bottom: 46px;
    margin-top: none;

    a {
      color: ${({ theme }) => theme.default.textColorInverted};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      color: ${({ theme }) => theme.default.textColorInverted};
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }

  section {
    margin: 80px 0;
  }
`;
