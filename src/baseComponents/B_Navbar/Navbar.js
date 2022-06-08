import style from './style.css'
import React, { Fragment, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import config from 'config'
import logo from 'images/ibos.png'
import { checkMenuPermissions } from 'functions/user/checkPermissions'
import useAppnavigate from 'hooks/useAppnavigate'

import { Box, ActionList, theme, Avatar, ActionMenu } from '@primer/react'
import { HomeIcon, ThreeBarsIcon, ChevronLeftIcon, GearIcon, TriangleDownIcon } from '@primer/octicons-react'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { send } from 'process'

export const Navbar = (props) => {
  return (
    <div className={style.navbar}>
      { props.children }
    </div>
  );
}

export const HamburgerMenu = ( props ) => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)     
  const [appMenuOpen, setAppMenuOpen] = useState(false)

  return (
    <div className={style.hamburgerMenuWrapper}>

      <span className={style.hamburgerMenuContent} onClick={() => setAppMenuOpen(!appMenuOpen)}>
        <span className={style.iconButton}>
          {!appMenuOpen && <ThreeBarsIcon/> }
          {appMenuOpen && <ChevronLeftIcon />}
        </span>        
        <img src={logo} alt='' className={style.logo} />
        <Box 
          sx={{
            fontSize: '0.7rem',
            marginLeft: '0.5rem',
            opacity: '0.8',
            cursor: 'pointer'
          }}
        >
          {state.context.userInfo.user.Site}
        </Box>
      </span>

      

      <AppMenu open={appMenuOpen} setOpen={setAppMenuOpen}>
        <AppMenuItem setOpen={setAppMenuOpen} leftIcon={<HomeIcon size={20} />} label='Home' goTo='home' checkPermissionFor='home'></AppMenuItem>
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
  const appNavigate = useAppnavigate()

  function handleGoTo() {
    setOpen(false)    
    if (state.context.currentPage !== goTo) {
      appNavigate(goTo)
    }
  }

  if (checkMenuPermissions(permissionName, state.context.userInfo.user.permissions)) {
    return (    
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.5rem',
        cursor: 'pointer',
        borderColor: 'accent.emphasis',
        bg: () => state.context.currentPage === goTo ? 'neutral.muted' : '',
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
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    
  
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.createRef()

  const avatarPath = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email_Address + '/' + state.context.userInfo.user.Avatar

  let avatarButtonStyleNames = style.avatarButton
  if (open) {
    avatarButtonStyleNames += ' ' + style.avatarButtonActive
  }

  function handleSignout() {
    send('SIGN_OUT')    
  }
  return (  
    <div className={style.avatarButtonWrapper}>
        <Avatar src={avatarPath} size={32} className={avatarButtonStyleNames} onClick={() => setOpen(!open)} ref={anchorRef} />

        <ActionMenu open={open} onOpenChange={setOpen} anchorRef={anchorRef}>
          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Group title={state.context.userInfo.user.Name}>
                { checkMenuPermissions('userProfile', state.context.userInfo.user.permissions) &&
                  <ActionList.Item>My profile</ActionList.Item>
                }
                <ActionList.Divider />
                <ActionList.Item onClick={handleSignout}>Sign out</ActionList.Item>
              </ActionList.Group>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
    </div>
  )
}