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
  position: absolute;
  width: 1466px;

  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;

  padding-left: 25px;
  padding-right: 25px;

  h2 {
    margin-top: 30px;
    margin-bottom: 30px;
    color: #000;
  }
`;

export const InfoQueryBox = styled.div`
  margin-top: 70px;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  align-items: start;

  span {
    color: #000;
    font-weight: 700;
    font-size: 18px;
  }

  span + span {
    color: var(--grey);
    font-weight: 600;
  }
`;

export const ImageListContent = styled.div`
  margin-top: 50px;
`;
