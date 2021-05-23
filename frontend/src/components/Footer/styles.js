import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export default styled.section`
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  padding: 100px 0;
  color: #fff;

  .container {
    max-width: 670px;
    margin: 0 auto;

    @media (max-width: 480px) {
      padding: 0 32px;
    }
  }

  h1 {
    display: block;
    text-align: left;
    margin-bottom: 46px;
    margin-top: none;
  }

  sub {
    padding-top: 60px;
    display: block;
  }
`;

export const ContactButton = styled(Button)`
  &.MuiButton-contained {
    color: #fff;
    padding: 5px 15px;
    display: table;
    width: auto;
    opacity: 0.8;
    margin-bottom: 10px;

    &.whatsapp {
      background-color: #0bd262;
    }

    &.instagram {
      background-image: linear-gradient(
        45deg,
        #fad373 0%,
        #f21974 48%,
        #6743ea 100%
      );
    }

    &:hover {
      opacity: 1;
    }

    .MuiButton-label {
      font-size: 16px;
    }
  }
`;
