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

export const PixeledLogoWrap = styled.div`
  width: 270px;
  height: 270px;
  position: relative;
  margin: 0 auto;
  margin-bottom: calc(50vh - 185px);

  span {
    position: absolute;
    top: 0;
    left: 0;
    color: ${({ theme }) => theme.default.textColorInverted};
    padding: 30px;
    text-align: left;

    h2 {
      margin: 0 0 15px 0;
      padding: 0;
      font-family: 'VT323', monospace;
    }
  }
`;

export const PixeledLogo = styled.div`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(18, 1fr);
  grid-template-rows: repeat(18, 1fr);
  cursor: pointer;
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
