import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  text-align: center;

  width: 80%;
  height: 60px;

  margin-bottom: 10px;
  align-items: center;

  background: var(--white);
  border: 1px solid var(--ligth-grey);
  border-radius: 100px;

  div {
    width: 100%;
    margin: 0 auto;

    svg {
      width: 24px;
      height: 24px;
      color: var(--brown);
    }

    p {
      font-size: 16px;
      font-weight: 400;
      color: var(--grey);
    }
  }
`;
