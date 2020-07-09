import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100vh);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
  animation: ${appearFromRight} 0.25s;

  overflow: hidden;
`;

export const Sidebar = styled.div`
  position: fixed;
  background: #f0f0f5;
  max-width: 375px;
  width: 100%;
  height: 100vh;
  right: 0;
  top: 0;
  animation: ${appearFromRight} 0.25s;

  z-index: 100;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  background: #434a54;
  width: 100%;
  color: #f0f0f5;

  h3 {
    button {
      position: absolute;
      left: 0;
      margin-top: -10px;
      background: transparent;
      border: none;
      color: #f0f0f5;
      height: 50px;
      width: 40px;
      cursor: pointer;
    }
  }
`;

export const ItemsContainer = styled.div`
  min-height: calc(100% - 380px);
  height: calc(100% - 300px);
  overflow-y: auto;

  ul {
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top: 1px solid #000;
      height: 150px;
    }
  }
`;

export const Subtotal = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 500;
  color: #666;
  border: 1px solid rgb(231, 231, 231);
  margin: 30px 0;

  span {
    color: #000;
  }
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: #ed5564;
    color: #f0f0f5;
    padding: 20px 100px;
    border-radius: 30px;
    border: none;
    font-weight: 500;
    font-size: 18px;
  }
`;
