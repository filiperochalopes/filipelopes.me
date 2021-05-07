import styled from 'styled-components';

export default styled.ul`
  list-style: none;
`;

export const Section = styled.section`
  color: #fff;
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
`;
