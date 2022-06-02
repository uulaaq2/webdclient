import React, { useContext, useState, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading, Header, StyledOcticon, Avatar, Box, ActionMenu, ActionList, IconButton, Tooltip } from '@primer/react'
import { HomeIcon, ThreeBarsIcon, GearIcon, TriangleDownIcon, PeopleIcon, SignOutIcon, ToolsIcon } from '@primer/octicons-react'

import config from 'config'
import { checkMenuPermissions, checkAccessPermission } from 'functions/user/checkPermissions'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import B_Button from 'baseComponents/B_Button';
import { Navigate } from 'react-router-dom'

const index = () => {
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    
  const userAvatar = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email + '/' + state.context.userInfo.user.Avatar

  const [appMenuOpen, setAppMenuOpen] = useState(false)
  const appMenuAnchorRef = createRef()

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuAnchorRef = createRef()

  return (

  <Header sx={{ display: 'flex', justifyContent: 'space-between'}}>
    <AppMenu state={state} open={appMenuOpen} onOpenChange={setAppMenuOpen} anchorRef={appMenuAnchorRef} />
    <div>
      <Header.Item>
          <Header.Link ref={appMenuAnchorRef} onClick={() => setAppMenuOpen(!appMenuOpen)}>
            <ThreeBarsIcon mr={2} />
            <span style={{ display: 'inline-block', fontSize: '1rem', marginLeft: '0.5rem'}}>{config.app.name}</span>
          </Header.Link>
      </Header.Item>
    </div>
    
    <Box display={'flex'} flexDirection='row'>

      <Header.Link ref={profileMenuAnchorRef} onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
          <Avatar src={userAvatar} size={32} square alt="@octocat" />
          <TriangleDownIcon />
      </Header.Link>


        <ActionMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen} anchorRef={profileMenuAnchorRef}>
          <ActionMenu.Overlay align='end'>
            <ActionList.Group title={state.context.userInfo.user.Name}>
              <Heading sx={{fontSize: '0.7rem', mt: -1, ml: 3, fontWeight: 'normal', opacity: 0.8}}>{state.context.userInfo.user.Title}</Heading>
            </ActionList.Group>
            <ActionList showDividers>
                { checkMenuPermissions('user/userProfile', state.context.userInfo.user.permissions) && 
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <PeopleIcon />
                    </ActionList.LeadingVisual>
                    Profile
                  </ActionList.Item>
                }
                <ActionList.Item onClick={() => send('SIGN_OUT')}>
                  <ActionList.LeadingVisual>
                    <SignOutIcon />
                  </ActionList.LeadingVisual>                
                  Sign out
                </ActionList.Item>

            </ActionList>
          </ActionMenu.Overlay>
      </ActionMenu>
    </Box>
  </Header>    
  );
};

const AppMenu = ( { state, open, onOpenChange, anchorRef }) => {
  const navigate = useNavigate()
  function handleGoTo(pageName) {
    onOpenChange(false)
    navigate(pageName)
  }

  return (
    <ActionMenu open={open} onOpenChange={onOpenChange} anchorRef={anchorRef}>
    <ActionMenu.Overlay>
      <ActionList>
        <ActionList.Item onClick={() => handleGoTo('/')}>
          <ActionList.LeadingVisual>
            <HomeIcon />
          </ActionList.LeadingVisual>
          Home
        </ActionList.Item>
        <ActionList.Item onClick={() => handleGoTo('/')}>
          <ActionList.LeadingVisual>
            <HomeIcon />
          </ActionList.LeadingVisual>
          Public
        </ActionList.Item>        
        { checkMenuPermissions('app/settings', state.context.userInfo.user.permissions) && 
          <ActionList.Item onClick={() => handleGoTo('settings')}>
            <ActionList.LeadingVisual>
              <GearIcon />
            </ActionList.LeadingVisual>
            Settings
          </ActionList.Item>
        }
      </ActionList>
    </ActionMenu.Overlay>
  </ActionMenu>
  )
}

export default index;