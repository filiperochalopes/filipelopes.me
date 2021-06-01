import styled from 'styled-components';

export default styled.div`
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 5px;
    left: -25px;
    background: ${({ theme }) => theme.default.textColorInverted};
  }

  h4 {
    margin: 0;
  }

  h5 {
    margin: 0;
    opacity: 0.8;
    font-weight: normal;
  }

  ul {
    font-size: 15px;
    line-height: 135%;
    margin: 10px 0;
  }

  span {
    font-size: 15px;
    line-height: 135%;
    display: block;

    .fa-level-up-alt {
      transform: rotate(90deg);
      margin-left: 20px;
      margin-right: 10px;
    }
  }
`;
