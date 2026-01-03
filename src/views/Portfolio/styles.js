import * as styledModule from 'styled-components';
const styled = styledModule.default || styledModule;

export default styled.section`
  color: #fff;
  background: ${({ theme }) => theme.default.invertedBackgroundColor};
  width: 100%;
  text-align: left;
  font-size: 21px;
  line-height: 28px;
  padding-bottom: 50px;

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
    margin-bottom: 24px;
    margin-top: 0;

    a {
      color: ${({ theme }) => theme.default.textColorInverted};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  h2 {
    margin-top: 0;
    margin-bottom: 24px;
  }

  section {
    margin: 80px 0;
  }

  section:first-of-type {
    margin-top: 0;
  }

  .portfolio_summary {
    margin: 12px 0 40px;

    ol {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 10px;
    }

    a {
      color: ${({ theme }) => theme.default.textColorInverted};
      text-decoration: none;
      font-size: 18px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .portfolio_filter {
    margin: 24px 0 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 16px;
      color: ${({ theme }) => theme.default.textColorInverted};
    }

    input {
      background: #1f1f1f;
      border: 1px solid #4a4a4a;
      color: #fff;
      padding: 10px 12px;
      font-size: 16px;
      font-family: 'PT Sans', sans-serif;

      &:focus {
        outline: none;
        border-color: #ef9d0e;
        box-shadow: 0 0 0 2px rgba(239, 157, 14, 0.2);
      }
    }
  }

  .portfolio_works_list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    width: min(80vw, 1024px);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .portfolio_works_item {
    padding: 0;
    flex: 0 1 auto;
  }

  .portfolio_item_button {
    width: auto;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 20px;
    border: 1px solid #444;
    background: #2a2a2a;
    color: inherit;
    text-align: left;
    cursor: pointer;
    font-family: inherit;

    h3 {
      margin: 0;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover h3 {
      color: #ef9d0e;
    }

    &:focus-visible {
      outline: 2px solid #ef9d0e;
      outline-offset: -2px;
    }
  }

  .portfolio_works_links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 12px;

    a {
      color: ${({ theme }) => theme.default.textColorInverted};
      font-size: 16px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .portfolio_works_tags {
    list-style: none;
    margin: 16px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      border: 1px solid #ef9d0e;
      padding: 4px 10px;
      font-size: 13px;
      color: #ef9d0e;
      background: rgba(239, 157, 14, 0.12);
      text-transform: none;
    }
  }

  .portfolio_modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    z-index: 20;
  }

  .portfolio_modal_content {
    position: relative;
    width: min(640px, 100%);
    background: #1f1f1f;
    border: 1px solid #444;
    padding: 24px;
    color: ${({ theme }) => theme.default.textColorInverted};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);

    h3 {
      margin: 0 0 12px;
      font-size: 26px;
    }

    p {
      margin: 0;
      font-size: 18px;
      line-height: 1.5;
    }
  }

  .portfolio_modal_close {
    position: absolute;
    top: 12px;
    right: 12px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.default.textColorInverted};
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
  }

  .portfolio_modal_links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border: 1px solid #444;
      color: ${({ theme }) => theme.default.textColorInverted};
      text-decoration: none;
      font-size: 16px;

      &:hover {
        border-color: #ef9d0e;
        color: #ef9d0e;
      }
    }
  }

  .portfolio_modal_icon {
    display: inline-flex;
    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  }

  .portfolio_pagination {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    button {
      background: #ef9d0e;
      color: #191919;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      font-family: 'VT323', monospace;
      font-size: 18px;
    }

    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    span {
      font-size: 16px;
    }
  }
`;
