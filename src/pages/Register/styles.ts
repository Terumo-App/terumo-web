import styled from 'styled-components';

export const Container = styled.header`
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20px;

  text-align: center;

  h2 {
    margin-bottom: 40px;
    color: var(--dark-grey);
  }
`;

export const PageTittle = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 20px;

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
  padding-left: 25px;
  padding-right: 25px;
  h2 {
    margin-top: 30px;
    margin-bottom: 30px;
    color: #000;
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

  margin-bottom: 200px;
`;
