import style from './style.css'
import React, { Fragment, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import config from 'config'
import logo from 'images/ibos.png'
import { checkMenuPermissions } from 'functions/user/checkPermissions'
import { Box, ActionList, theme, Avatar } from '@primer/react'
import { ThreeBarsIcon, ChevronLeftIcon, GearIcon, TriangleDownIcon } from '@primer/octicons-react'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

export const Navbar = (props) => {
  return (
    <div className={style.navbar}>
      { props.children }
    </div>
  );
}

export const HamburgerMenu = ( props ) => {
  const [appMenuOpen, setAppMenuOpen] = useState(false)

  return (
    <div className={style.hamburgerMenuWrapper}>

      <span className={style.hamburgerMenuContent} onClick={() => setAppMenuOpen(!appMenuOpen)}>
        <span className={style.iconButton}>
          {!appMenuOpen && <ThreeBarsIcon/> }
          {appMenuOpen && <ChevronLeftIcon />}
        </span>        
        <img src={logo} alt='' className={style.logo} />
      </span>

      

      <AppMenu open={appMenuOpen} setOpen={setAppMenuOpen}>
        <AppMenuItem setOpen={setAppMenuOpen} leftIcon={<GearIcon size={20} />} label='Settings' goTo='settings' checkPermissionFor='settings'></AppMenuItem>
      </AppMenu>

    </div>
  )
}

export const AppMenu = ({ open, setOpen, children }) => {
  return (
    <CSSTransition
      in={open}
      timeout={100}
      unmountOnExit   
      classNames={{
          enter: style.appMenuEnter,
          enterActive: style.appMenuEnterActive,
          exit: style.appMenuExit,
          exitActive: style.appMenuExitActive
        }
      }   
    >
      <Box className={style.appMenuWrapper} borderRightColor="border.default" borderTopWidth={0} borderRightWidth={1} borderBottomWidth={0} borderLeft={0} borderStyle="solid">
        { children }
      </Box>
    </CSSTransition>    
  )
}

export const AppMenuItem = ({ setOpen, leftIcon, label, goTo, checkPermissionFor}) => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)      
  const permissionName = checkPermissionFor
  const navigate = useNavigate()

  function handleGoTo() {
    setOpen(false)    
    navigate('/' + goTo)  
  }

  if (checkMenuPermissions(permissionName, state.context.userInfo.user.permissions)) {
    return (    
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.5rem',
        cursor: 'pointer',
        ':hover': {
          color: 'accent.emphasis',
          bg: 'neutral.muted'
        }
      }}
      onClick={() => handleGoTo()}
      >
      <span style={{marginRight: '0.5rem'}}>{leftIcon}</span> <span>{label}</span>
      </Box>
    )
  } else {
    return ''
  }

}

export const UserAvatar = () => {
  const globalServices = useContext(GlobalStateContext)    
  const [ state  ] = useActor(globalServices.authService)    

  const avatarPath = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email_Address + '/' + state.context.userInfo.user.Avatar
  return (  
    <div className={style.avatarButtonWrapper}>
        <Avatar src={avatarPath} size={32} className={style.avatarButton}/>
    </div>
  )
}