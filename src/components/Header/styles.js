import * as styledModule from 'styled-components';
const styled = styledModule.default || styledModule;

export default styled.header`
  font-family: 'VT323', monospace;
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  z-index: 3;
`;

export const LanguageBt = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 20px;
  top: 15px;
  height: 20px;
  z-index: 6;
  cursor: pointer;

  img {
    height: 100%;
  }
`;
