import logoImg from "../../assets/logoPS.svg";
import Image from "../../assets/image.svg";

import { Container, Content } from "./styles";
import { FiBell } from "react-icons/fi";
import { Drawer } from "../Drawer";
import { Avatar, Badge, Dropdown, MenuProps } from "antd";
import styles from "./Styles.module.scss";
import { getRandomInteger } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";

const items: MenuProps["items"] = [
  {
    label: (
      <a rel="noopener noreferrer" href={`${process.env.REACT_APP_WEB_URL}/my-account`}>
        My Account
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a rel="noopener noreferrer" href={`${process.env.REACT_APP_WEB_URL}/login`}>
        Logout
      </a>
    ),
    key: "1",
  },
];

export function Header() {
  const { signout } = useAuth()

  const handleDropdownItemClick = (e: any) => {
    if (e.key == '1')
      signout()

  };

  return (
    <Container>
      <Content>
        <Drawer />

        <img src={logoImg} alt="logo" height={80} />

        <div>
          <button type="button">
            <Badge count={getRandomInteger(0, 20)}>
              <FiBell />
            </Badge>
          </button>

          <Dropdown className={styles.dropdown} menu={{ onClick: handleDropdownItemClick, items }}>
            <img className={styles.imagePerson} src={Image} alt="img" />
          </Dropdown>
        </div>
      </Content>
    </Container>
  );
}
