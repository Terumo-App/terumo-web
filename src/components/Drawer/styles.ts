import styled from 'styled-components';

export const ButtonDrawerOpen = styled.button`
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
`;

export const ButtonDrawerClose = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    color: var(--dark-red);
    height: 32px;
    width: 32px;
    transition: color 0.2s;

    &:hover {
      height: 34px;
      width: 34px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: left;
  height: 30%;

  margin-left: -25px;
  margin-top: 30px;

  ul {
    height: 60px;
    width: 100%;

    li {
      text-decoration: none;
      font-size: 20px;
      font-weight: 600;

      height: 90%;
      display: flex;
      align-items: center;
      border-radius: 0px 15px 15px 0px;
      width: 100%;

      svg {
        margin-right: 16px;
        margin-left: 35px;
        width: 25px;
        height: 25px;
        color: var(--dark-red);
      }

      &:hover {
        background: linear-gradient(
          178.18deg,
          var(--dark-red) -13.56%,
          var(--ligth-grey) 158.3%
        );

        a,
        svg {
          color: var(--white);
        }
      }
    }

    a {
      color: var(--grey);
      font-size: 16px;
      height: 80%;
      width: 100%;
      padding-top: 12px;
    }
  }
`;
