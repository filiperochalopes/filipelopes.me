import styled from 'styled-components';

export const Navigation = styled.nav`
  position: sticky;
  z-index: 5;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 0px;
  }

  > div > a {
    text-decoration: none;
  }

  > div > a > button {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    flex: 0 1 auto;
    outline: 0;
    border: none;
    background: transparent;
    opacity: 0.8;
    transition: 0.5s all;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    z-index: 5;

    list-style: none;
    display: inline;
    color: ${({ theme }) => theme.default.textColorInverted};
    font-size: 25px;
    line-height: 50px;
    padding: 0 10px;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.default.colors.black};
    }

    &:first-child {
      margin-left: 0;
    }

    &:disabled {
      opacity: 0.3;
    }

    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.default.colors.black};
    }
  }
`;

export const Buttons = styled.div`
  position: absolute;
  padding-left: calc(50vw - 265px / 2);
  z-index: 5;
`;

export const Line = styled.div`
  position: absolute;
  height: 30px;
  background: ${({ theme }) => theme.default.textColorInverted};
  z-index: 4;
  transition: 0.5s all;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
`;
