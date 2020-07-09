import styled from 'styled-components';

export const Message = styled.div`
  color: #434a54;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 32px;
  }

  svg {
    margin: 20px 0;
    justify-content: center;
  }

  p {
    font-size: 24px;
    span {
      font-weight: 500;
    }
  }
`;
