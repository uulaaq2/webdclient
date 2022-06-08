import style from './style.css'
import React from 'react'

import logo from 'images/logo.png'
import { ThreeBarsIcon } from '@primer/octicons-react'
import { Navbar, HamburgerMenu, AppMenu, UserAvatar } from './Navbar'


const index = () => {
  return (
    <Navbar>
      <HamburgerMenu>
        <AppMenu />
        
      </HamburgerMenu>

      <UserAvatar />
    </Navbar>
  );
};

export default index;