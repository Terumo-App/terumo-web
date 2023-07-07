import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  height: 1000px;
`;

export const PageTittle = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 50px;

  font-weight: 700;
  font-size: 30px;

  h3 {
    color: var(--grey);
    margin-top: 10px;
  }

  svg {
    color: var(--dark-red);
    margin-right: 10px;
    width: 35px;
    height: 35px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #fff;

  width: 100%;
  margin: 0 auto;

  h5 {
    font-size: 14px;
  }
`;

export const ButtonPrimary = styled.button`
  width: 220px;
  height: 40px;
  border: 1px solid;
  border-radius: 10px;

  background-color: var(--ligth-wine);
  color: var(--white);

  font-size: medium;
  font-weight: 600;

  &:hover {
    color: var(--ligth-wine);
    border-color: var(--ligth-wine);
    background-color: var(--white);
  }

  margin-bottom: 20px;
`;
