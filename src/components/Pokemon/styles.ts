import styled from 'styled-components';

export const Container = styled.div`
  background: #f0f0f5;
  border-radius: 8px;
  border: solid 1px #e5e5e5;
  transition: 0.2s;
  margin: 20px;

  :hover {
    border: solid 1px grey;
  }

  .header {
    text-decoration: none;

    header {
      background: #f0f0f5;
      border-radius: 8px 8px 0px 0px;
      height: 192px;
      overflow: hidden;
      transition: 0.3s opacity;
      text-align: center;

      img {
        pointer-events: none;
        user-select: none;
        width: 210px;
      }
    }

    section.body {
      position: relative;
      padding: 30px;

      h2 {
        color: #3d3d4d;
      }

      p {
        color: #3d3d4d;

        margin-top: 16px;
      }

      .price {
        font-style: normal;
        font-size: 24px;
        line-height: 34px;
        color: #39b100;

        b {
          font-weight: 600;
        }
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;

    div.quantity-container {
      display: flex;
      border-radius: 8px;

      button {
        background: #ed5564;
        padding: 10px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #fff;
        }
      }

      input[type='number'] {
        width: 40px;
        border: none;
        text-align: center;
        -moz-appearance: textfield;

        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    div.buy-container {
      display: flex;
      align-items: center;

      button {
        margin-left: 20px;
        background: #ed5564;
        padding: 10px 20px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        color: #fff;
        font-weight: 500;
      }
    }
  }
`;
