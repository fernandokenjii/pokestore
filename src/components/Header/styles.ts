import styled, { css } from 'styled-components';

interface ILogoProps {
  screenWidth: number;
}

export const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 0;
  background: #ed5564;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  border-bottom: 10px solid #434a54;
`;

export const Logo = styled.div<ILogoProps>`
  display: flex;
  align-items: center;
  margin-left: 24px;

  img {
    width: 50px;
    height: 50px;
  }

  span {
    margin-left: 16px;
    font-size: 30px;
    ${(props) =>
      props.screenWidth < 700 &&
      css`
        display: none;
      `}

    ${(props) =>
      props.screenWidth >= 700 &&
      css`
        display: block;
      `}
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 24px;

  input {
    border: none;
    height: 40px;
    border-radius: 8px;
    padding-left: 8px;
    margin: 0 20px;
  }

  button {
    background: transparent;
    border: none;
  }
`;
