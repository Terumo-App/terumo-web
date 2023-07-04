import { useState } from 'react';
import { Drawer as DrawerAntd } from 'antd';
import { IoClose, IoSearch } from 'react-icons/io5';
import { ButtonDrawerOpen, ButtonDrawerClose, Nav } from './styles';
import { FiSettings, FiHardDrive, FiDatabase, FiHelpCircle, FiMenu } from 'react-icons/fi';

export function Drawer() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <ButtonDrawerOpen type="button" onClick={showDrawer}>
        <FiMenu />
      </ButtonDrawerOpen>
      <DrawerAntd  placement="left" onClose={showDrawer} open={open} closable={false} width={290}>
        
      <Nav>
        <ul>
          <ButtonDrawerClose type="button" onClick={showDrawer}>
            <IoClose /> 
          </ButtonDrawerClose>
          <li>
            <IoSearch />
            <a href="/">New query</a>
          </li>
          <li>
            <FiDatabase />
            <a href="/collections">Collections</a>
          </li>
          <li>
            <FiHardDrive />
            <a href="/saved-queries">Saved queries</a>
          </li>
          <li>
            <FiSettings />
            <a href="/settings">Settings</a>
          </li>
          <li>
            <FiHelpCircle />
            <a href="/help">Help</a>
          </li>
        </ul>
      </Nav>
      </DrawerAntd>
    </>
  );
};
