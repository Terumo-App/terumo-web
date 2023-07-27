import logoImg from '../../assets/logoPS.svg';
import Image from '../../assets/image.svg';

import { Container, Content } from './styles';
import { FiBell } from 'react-icons/fi';
import { Drawer } from '../Drawer';
import { Avatar, Badge, Dropdown, MenuProps } from 'antd';
import styles from './Styles.module.scss';

const items: MenuProps['items'] = [
  {
    label: (
      <a rel="noopener noreferrer" href="http://localhost:3000/">
        My Account
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a rel="noopener noreferrer" href="http://localhost:3000/login">
        Logout
      </a>
    ),
    key: '1',
  },
];

export function Header() {
  return (
    <Container>
      <Content>
        <Drawer />

        <img src={logoImg} alt="logo" height={80} />

        <div>
          <button type="button">
            <Badge count={5}>
              <FiBell />
            </Badge>
          </button>

          <Dropdown className={styles.dropdown} menu={{ items }}>
            <img
              className={styles.imagePerson}
              src={Image}
              alt="img"
            />
          </Dropdown>
        </div>
      </Content>
    </Container>
  );
}
