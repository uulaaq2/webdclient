import style from './style.css'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useLocation  } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'

import config from 'config'
import logo from 'images/ibos.png'
import { checkMenuPermission, checkPermission } from 'functions/user/checkPermission'
import useAppnavigate from 'hooks/useAppnavigate'
import useAppLocation from 'hooks/useAppLocation'

import { Box, ActionList, theme, Avatar, ActionMenu, Link, Autocomplete } from '@primer/react'
import { HomeIcon, GlobeIcon, ThreeBarsIcon, ChevronLeftIcon, GearIcon, TriangleDownIcon, TriangleUpIcon } from '@primer/octicons-react'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
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
          <AppMenuItems />
      </AppMenu>

    </div>
  )
}

export const AppMenu = ({ open, setOpen, children }) => {    
  const styles = useSpring({
    left: open ? 0 : -220
  })

  const sideBarStyles = {
    position: 'absolute',
    left: '0',
    top: 'calc(var(--nav-size))',
    height: 'calc(100% - var(--nav-size))',
    background: 'var(--color-canvas-default)',
    padding: '1rem',
    zIndex: '10000',
    borderRight: '1px solid var(--color-border-default)',
  }

  return (
    <animated.div    
      style={{
        ...sideBarStyles,
        ...styles
      }}
    >
      {children}
    </animated.div>
  )
}

export const AppMenuItems = () => {
  const appLocation = useAppLocation();    
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)      
  const appNavigate = useAppnavigate() 
  const permissions = state.context.userInfo.user.permissions
  const [settingsOpen, setSettingsOpen] = useState(true)

  function handleGoTo(goTo) {
    if (appLocation.pieces[0] !== goTo) {
      appNavigate(goTo)
    }
  }

  return (         
    <ActionList>

      <ActionList.Item 
        onClick={() => handleGoTo(config.urls.home.path)}
        active={appLocation.pieces[0] === config.urls.home.path}
        className={`${style.fontWeightNormal} ${style.noBackground}`}
      >
        <ActionList.LeadingVisual><HomeIcon /></ActionList.LeadingVisual>
        {config.urls.home.name}
      </ActionList.Item>

      <ActionList.Item 
        onClick={() => handleGoTo(config.urls.public.path)}
        active={appLocation.pieces[0] === config.urls.public.path}
        className={`${style.fontWeightNormal} ${style.noBackground}`}
      >
        <ActionList.LeadingVisual><GlobeIcon /></ActionList.LeadingVisual>
        {config.urls.public.name}
      </ActionList.Item>
      
      { checkMenuPermission(config.urls.settings.id, permissions) &&
       <>
       <ActionList.Item 
          //onClick={() => setSettingsOpen(!settingsOpen)}
          onClick={() => handleGoTo(config.urls.settings.path)}
          active={appLocation.pieces[0] === config.urls.settings.path}
          className={`${style.fontWeightNormal} ${style.noBackground}`}
        >
          <ActionList.LeadingVisual><GearIcon /></ActionList.LeadingVisual>
          {config.urls.settings.name}
          <ActionList.TrailingVisual>{ appLocation.pieces[0] !== config.urls.settings.path ? <TriangleDownIcon /> : <TriangleUpIcon /> }</ActionList.TrailingVisual>

        </ActionList.Item>

        { appLocation.pieces[0] === config.urls.settings.path &&
          <>
            { checkMenuPermission(config.urls.settings.users.id, permissions) &&
              <Box className={style.subMenuWrapper}>
                <ActionList.Item
                  onClick={() => handleGoTo(config.urls.settings.users.path)}
                  className={`${appLocation.fullPath === config.urls.settings.users.path ? style.subMenuActive : ''} ${style.noBackground}`}
                >
                  {config.urls.settings.users.name}
                </ActionList.Item>
              </Box>
            }
            
            { checkMenuPermission(config.urls.settings.users.id, permissions) &&
              <Box className={style.subMenuWrapper}>
              <ActionList.Item
                  onClick={() => handleGoTo(config.urls.settings.departments.path)}
                  className={`${appLocation.fullPath === config.urls.settings.departments.path ? style.subMenuActive : ''} ${style.noBackground}`}
                >
                  {config.urls.settings.departments.name}
                </ActionList.Item>
              </Box>
            }

            <Box className={style.subMenuWrapper}>
            <ActionList.Item
                onClick={() => handleGoTo(config.urls.settings.groups.path)}
                className={`${appLocation.fullPath === config.urls.settings.groups.path ? style.subMenuActive : ''} ${style.noBackground}`}
              >
                {config.urls.settings.groups.name}
              </ActionList.Item>
            </Box>
          </>
        }
        </>
      }
      
    </ActionList>      
    )  
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
                            
              { checkMenuPermission('userProfile', state.context.userInfo.user.permissions) &&
                <ActionList.Item className={style.userProfileMenuItem}>My profile</ActionList.Item>
              }    
                
              { state.context.userInfo.user.Sites.split(',').map((site, i) => (
                  <ActionList.Item                         
                    className={`${style.userProfileMenuItem} ${site === getLocalStorage('site').value ? style.userProfileMenuActive : ''}`}
                    onClick={() => handleSelectSite(site)}
                    key={i}
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