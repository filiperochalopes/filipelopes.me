import styled from 'styled-components';

export default styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  opacity: 0;
  transition: opacity 0.5s;

  &.visible {
    opacity: 1;
  }

  .info {
    margin-left: 10px;
    text-align: left;

    .title {
      color: #f5f5f5;
      font-weight: bold;
      font-size: 1.2em;
      line-height: 18px;

      &.click {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          text-decoration-line: 5px;
        }
      }
    }
  }

  .img {
    display: block;
    float: left;
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
    background-size: contain;
    margin-right: 20px;
  }

  .bar {
    display: inline-block;
    width: 200px;
    height: 22px;
    font-size: 0.9em;
  }

  .fill {
    height: 10px;
    display: inline-block;
    position: relative;

    &.__good {
      background: green;
    }

    &.__normal {
      background: orange;
    }

    &.__bad {
      background: red;
    }

    .number {
      position: absolute;
      right: -40px;
      top: -5px;
      display: block;
    }
  }

  .resume {
    color: #6499df;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-style: italic;
    font-size: 12px;
    line-height: 14px;
  }

  .sublist {
    display: none;
  }

  ul.details {
    display: flex;
    flex-flow: column;
    padding-left: 1px;

    li {
      display: flex;
      margin-bottom: 5px;

      .img {
        display: inline;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      > span {
        align-self: center;
        color: #ccc;

        span {
          height: 10px;
          opacity: 0.6;
          display: block;

          &.__good {
            background: green;
          }

          &.__normal {
            background: orange;
          }

          &.__bad {
            background: red;
          }
        }
      }
    }
  }
`;
