import styled from 'styled-components';

export default styled.section`
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  padding: 100px 0;

  @media (max-width: 769px) {
    padding-bottom: 250px;
  }

  @media (max-width: 480px) {
    padding-bottom: 300px;
  }
`;

export const ContentWrap = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
`;

export const ImageWrap = styled.div`
  position: absolute;
  top: -20px;
  left: -50px;
  width: 400px;
  z-index: 2;

  img {
    width: 100%;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1024px) {
    width: 45vw;
    max-width: 400px;
    left: -10vw;
  }

  @media (max-width: 769px) {
    height: 400px;
    left: -20px;
    width: auto;

    img {
      height: 100%;
      width: auto;
    }
  }
`;

export const Text = styled.div`
  position: absolute;
  top: 0;
  left: 200px;
  width: 600px;
  /* height: 100%; */
  z-index: 1;
  padding: 40px;
  padding-left: 200px;
  box-sizing: border-box;
  text-align: left;
  background: ${({ theme }) => theme.default.colors.black};
  color: #fcf6df;

  @media (max-width: 1024px) {
    width: calc(30vw + 250px);
    left: 25vw;
    padding-left: calc(5vw + 80px);
  }

  @media (max-width: 769px) {
    top: 350px;
    left: 30px;
    padding-left: 0;
    padding: 20px;
    width: calc(80vw - 30px);
  }

  @media (max-width: 480px) {
    top: 350px;
    left: 0px;
    padding-left: 0;
    padding: 32px;
    width: 99vw;
  }
`;
