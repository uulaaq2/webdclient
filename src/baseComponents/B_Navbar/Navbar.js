import style from './style.css'
import React, { Fragment, useState, useContext } from 'react'
import { useLocation  } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import config from 'config'
import logo from 'images/ibos.png'
import { checkMenuPermissions } from 'functions/user/checkPermissions'
import useAppnavigate from 'hooks/useAppnavigate'
import useAppLocation from 'hooks/useAppLocation'

import { Box, ActionList, theme, Avatar, ActionMenu } from '@primer/react'
import { HomeIcon, ThreeBarsIcon, ChevronLeftIcon, GearIcon, TriangleDownIcon } from '@primer/octicons-react'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { send } from 'process'
import { getLocalStorage } from 'functions/localStorage';

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
          {getLocalStorage('site').value}
        </Box>
      </span>

      

      <AppMenu open={appMenuOpen} setOpen={setAppMenuOpen}>
        <ActionList>

          <AppMenuItem 
            setOpen={setAppMenuOpen} 
            leadingVisual={<HomeIcon size={20} />} 
            label={config.urls.home.name}            
            goTo={config.urls.home.path}
          />              
          
          <AppMenuItem 
            setOpen={setAppMenuOpen} 
            leadingVisual={<GearIcon size={20} />} 
            label={config.urls.settings.name} 
            goTo={config.urls.settings.path}
          />

        </ActionList>
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
      <Box 
        sx={{
          bg: 'canvas.default'
        }}
        className={style.appMenuWrapper} 
        borderRightColor="border.default" 
        borderTopWidth={0} 
        borderRightWidth={1} 
        borderBottomWidth={0} 
        borderLeft={0} 
        borderStyle="solid"
      >
        { children }
      </Box>
    </CSSTransition>    
  )
}

export const AppMenuItem = ({ setOpen, leadingVisual, label, goTo }) => {
  const appLocation = useAppLocation();    
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)      
  const appNavigate = useAppnavigate()

  function handleGoTo() {
    setOpen(false)    
    if (appLocation.pieces[0] !== goTo) {
      appNavigate(goTo)
    }
  }
  let checkPermissionsFor = goTo === '/' ? 'home' : goTo

  if (checkMenuPermissions(checkPermissionsFor, state.context.userInfo.user.permissions)) {
    return (    
    <ActionList.Item 
      onClick={() => handleGoTo()} active={appLocation.pieces[0] === goTo}
    >
      <ActionList.LeadingVisual>{leadingVisual}</ActionList.LeadingVisual>
      {label}
    </ActionList.Item>
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

  const appNavigate = useAppnavigate()

  const avatarPath = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email_Address + '/' + state.context.userInfo.user.Avatar

  let avatarButtonStyleNames = style.avatarButton
  if (open) {
    avatarButtonStyleNames += ' ' + style.avatarButtonActive
  }

  function handleSignout() {
    send('SIGN_OUT')    
  }

  function handleSelectSite(site) {
    const token = getLocalStorage('token').value
    send('SIGN_IN', { requestType: 'signInWithToken', token, site })
    appNavigate(config.urls.home.path)
  }

  return (  
    <div className={style.avatarButtonWrapper}>
        <Avatar src={avatarPath} size={32} className={avatarButtonStyleNames} onClick={() => setOpen(!open)} ref={anchorRef} />

        <ActionMenu open={open} onOpenChange={setOpen} anchorRef={anchorRef}>
          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item
                className={style.userProfileMenuItemTitle}
              >
                {state.context.userInfo.user.Name}
              </ActionList.Item>
                            
              { checkMenuPermissions('userProfile', state.context.userInfo.user.permissions) &&
                <ActionList.Item className={style.userProfileMenuItem}>My profile</ActionList.Item>
              }    
                
              { state.context.userInfo.user.Sites.split(',').map(site => (
                  <ActionList.Item                         
                    className={`${style.userProfileMenuItem} ${site === getLocalStorage('site').value ? style.userProfileMenuActive : ''}`}
                    onClick={() => handleSelectSite(site)}
                  >
                    {site}
                  </ActionList.Item>
                ))                
              }

              <ActionList.Item 
                className={style.userProfileMenuItem}
                onClick={handleSignout}
              >
                Sign out
              </ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
    </div>
  )
}