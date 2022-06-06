import style from './style.css'
import React, { useState} from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react'
import { CSSTransition } from 'react-transition-group'

export const Navbar = (props) => {
  return (
    <nav className={style.navbar}>
      <ul className={style.navbarNav}>{props.children}</ul>
    </nav>
  );
}

export const NavItem = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={style.navItem}>
      <a className={style.iconButton} onClick={() => setOpen(!open)}>
        {props.icon}        
      </a>

      {open && props.children}
    </li>
  )
}

export const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main')

  function DropDownItem(props) {
    return (      
      <a className={style.menuItem}>
        {props.leftIcon && <span className={style.iconButton}>{props.leftIcon}</span>}

        {props.children}

        <span className={style.iconRight}>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className={style.dropdown}>
     
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames={style.menuPrimary}
      >
        <div className='menuFB'>
          <DropDownItem>My Profile</DropDownItem>
          <DropDownItem
            leftIcon={<ArrowLeftIcon />}
            rightIcon={<ArrowRightIcon />}
          >
            Settings
          </DropDownItem>
        </div>
      </CSSTransition>
      
      <CSSTransition
        in={activeMenu === 'secondary'}
        unmountOnExit
        timeout={500}
        classNames={style.menuPrimary}
      >
        <div className='menuFB'>
          <DropDownItem>My Profile</DropDownItem>
          <DropDownItem
            leftIcon={<ArrowLeftIcon />}
            rightIcon={<ArrowRightIcon />}
          >
            Settings
          </DropDownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

