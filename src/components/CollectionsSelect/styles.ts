import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 10px;

  height: 40px;
  width: 80%;
  align-items: center;

  div {
    width: 100%;
    margin: 0 auto;
    text-align: center;

    p {
      font-size: 20px;
      font-weight: bold;
      color: var(--grey);
    }
  }
`;
