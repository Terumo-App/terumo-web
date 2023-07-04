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
    width: 7rem;

    button {
      img {
        width: 2.5rem;
        border-radius: 30px;
        border: 1px solid ${tint(0.7, '#702331')};

        &:hover {
          height: 2.7rem;
          width: 2.7rem;
        }
      }
    }
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

      &:hover {
        height: 2.2rem;
        width: 2.2rem;
      }
    }
  }
`;
