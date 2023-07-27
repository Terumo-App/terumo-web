import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.header`
  background: var(--white);
`;

export const Content = styled.div`
  max-width: 95%;
  margin: 0 auto;

  padding: 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
  }

  button {
    background: transparent;
    height: 3rem;
    width: 3rem;
    border: none;

    svg {
      color: var(--dark-red);
      height: 2rem;
      width: 2rem;
      transition: color 0.2s;
    }
  }
`;
