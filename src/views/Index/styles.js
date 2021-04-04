import styled from 'styled-components';

export default styled.section`
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
