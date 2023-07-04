import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;

  width: 300px;
  height: 60px;
  padding-left: 20px;
  padding-left: 20px;

  background: var(--white);
  border: 1px solid var(--ligth-grey);
  border-radius: 100px;
  margin-bottom: 10px;

  div {
    display: flex;
    justify-content: center;
    max-height: 80px;
    padding-left: 20px;
    padding-right: 20px;

    img {
      width: 80px;
      height: 80px;
      color: var(--brown);
      border-radius: 2%;
      border: 1px solid var(--sub-background);
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: var(--grey);
      border-left: 2px solid #d0d0d0;
      height: 80px;
      padding: 5px 10px;
    }
  }
`;
