import style from './style.css'
import React, { useContext, useState, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading, Header, StyledOcticon, Avatar, Box, ActionMenu, ActionList, IconButton, Tooltip } from '@primer/react'
import { HomeIcon, ThreeBarsIcon, GearIcon, TriangleDownIcon, PeopleIcon, SignOutIcon, ToolsIcon } from '@primer/octicons-react'

import logo from 'images/logo.png'
import config from 'config'
import { checkMenuPermissions, checkAccessPermission } from 'functions/user/checkPermissions'

import { CSSTransition } from 'react-transition-group'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import B_Button from 'baseComponents/B_Button';
import { Navigate } from 'react-router-dom'
import { exit } from 'process'
import { Navbar } from '../B_Navbar/Navbar';

const index = () => {
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    
  const userAvatar = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email_Address + '/' + state.context.userInfo.user.Avatar

  const [appMenuOpen, setAppMenuOpen] = useState(false)
  const appMenuAnchorRef = createRef()

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuAnchorRef = createRef()

};

const Navbar = () => {
  return (
    <div></div>
  )
}
const AppMenu = ({ open }) => {  
  return (
    <CSSTransition 
      in={open} 
      timeout={100} 
      unmountOnExit
      classNames={
        {
          enterDone: style.appMenuEnterActive,
          exitDone: style.appMenuExitActive
        }
      }
    >
      <Box borderWidth={1} borderStyle="solid" p={3} className={style.appMenuWrapper}>      
        sdfjkl;asdfkjlsadjflk
      </Box>
    </CSSTransition>
  )
}

export default index;