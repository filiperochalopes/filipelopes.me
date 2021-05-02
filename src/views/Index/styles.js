import styled from 'styled-components';

export default styled.main`
  background-color: orange;
  min-height: 100vh;
  text-align: center;

  h1 {
    display: inline-block;
    margin: 0 auto;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    padding-top: 80px;
  }
`;

export const PixeledLogo = styled.div`
  width: 270px;
  height: 270px;
  position: relative;
  padding-top: calc(50vh - 135px);
  margin: 0 auto;
  margin-bottom: calc(50vh - 185px);
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(18, 1fr);
`;

export const Pixel = styled.div.attrs(props => ({
  style: {
    transition: props.transitionTime
      ? `background-color ${props.transitionTime}s`
      : 'background-color 2s',
  },
}))`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color || '#3a3a3a'};
`;

export const Header = styled.header`
  width: 100%;
  height: 50px;

  nav {
    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        display: inline;
        color: ${({ theme }) => theme.orange.textColor};
        font-size: 18px;
        line-height: 50px;
        padding: 0 10px;
      }
    }
  }
`;
