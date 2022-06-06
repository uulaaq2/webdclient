import React from 'react'
import { Navbar, NavItem, DropdownMenu } from './Navbar'
import { BellFillIcon, MailIcon, GiftIcon, TriangleDownIcon } from '@primer/octicons-react'

const index = () => {
  return (
    <Navbar>
      <NavItem icon={<BellFillIcon />} />
      <NavItem icon={<MailIcon />} />
      <NavItem icon={<GiftIcon />} />

      <NavItem icon={<TriangleDownIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
};

export default index;