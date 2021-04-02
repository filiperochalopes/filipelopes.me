import styled from 'styled-components';

export default styled.section`
  background-color: orange;
  min-height: 100vh;
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

export const Pixel = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color || '#f8f8f8'};
  transition: ${({ transitionTime }) =>
    `${transitionTime}s background-color` || '0.5s background-color'};
`;
