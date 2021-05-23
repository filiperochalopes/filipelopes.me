import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export default styled.section`
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  padding: 100px 0;

  @media (max-width: 769px) {
    padding-bottom: 250px;
  }
`;

export const ContactButton = styled(Button)`
  background: green;
`;
