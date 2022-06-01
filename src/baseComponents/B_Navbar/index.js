import React, { useContext, useState, createRef } from 'react'
import { Header, StyledOcticon, Avatar, Box, ActionMenu, ActionList, IconButton, Tooltip } from '@primer/react'
import { ThreeBarsIcon, GearIcon, TriangleDownIcon, PeopleIcon, SignOutIcon, ToolsIcon } from '@primer/octicons-react'

import config from 'config'
import { checkMenuPermissions, checkAccessPermission } from 'functions/user/checkPermissions'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import B_Button from 'baseComponents/B_Button';

const index = () => {
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    
  const userAvatar = config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email + '/' + state.context.userInfo.user.Avatar

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuAnchorRef = createRef()

  return (
  <Header sx={{ display: 'flex', justifyContent: 'space-between'}}>
    <div>
      <Header.Item>
          <Header.Link style={{ marginRight: '1rem'}}>
            <ThreeBarsIcon mr={2} />
          </Header.Link>
          <Header.Link href="#" sx={{ fontSize: '1.2rem'}}>
            <span>{config.app.name}</span>
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
            <ActionList>
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

export default index;