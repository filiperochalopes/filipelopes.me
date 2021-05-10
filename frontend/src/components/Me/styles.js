import styled from 'styled-components';

export default styled.section`
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  padding: 100px 0;
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
`;
