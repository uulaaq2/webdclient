import React, { useState, useContext } from 'react'
import { ActionList, Box, PageLayout, Heading } from '@primer/react'
import B_PageLayout from 'baseComponents/B_PageLayout'

import config from 'config'
import PC_Groups from 'pageComponents/PC_Groups'
import PC_Departments from 'pageComponents/PC_Departments'
import PC_Users from 'pageComponents/PC_Users'
import pageInitial from 'functions/pageInitial'
import useAppnavigate from 'hooks/useAppnavigate'
import useAppLocation from 'hooks/useAppLocation'

import { checkMenuPermissions } from 'functions/user/checkPermissions';

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  pageInitial({ pageName: 'settings' })
  const appLocation = useAppLocation()  
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    
  const permissions = state.context.userInfo.user.permissions

  return (
  <PageLayout>
    <PageLayout.Header>
      <Heading sx={{fontSize: 3}}>{config.urls.settings.name}</Heading>
    </PageLayout.Header>
    <PageLayout.Pane position="start">       

        <ActionList sx={{ bg: 'canvas.default' }}>
          <SettingsMenuItem 
            label={config.urls.settings.users.name}
            goTo={config.urls.settings.users.path}
            state={state} 
          />

          <SettingsMenuItem 
            label={config.urls.settings.departments.name}
            goTo={config.urls.settings.departments.path}
            state={state} 
          />

          <SettingsMenuItem 
            label={config.urls.settings.groups.name}
            goTo={config.urls.settings.groups.path}
            state={state} 
          />          

        </ActionList>      

    </PageLayout.Pane>

    <PageLayout.Content>
      {appLocation.fullPath === '/settings/groups' && checkMenuPermissions(appLocation.fullPath, permissions) &&
        <PC_Groups />
      }

      {appLocation.fullPath === '/settings/departments' && checkMenuPermissions(appLocation.fullPath, permissions) &&
        <PC_Departments />
      }

      {appLocation.fullPath === '/settings/users' && checkMenuPermissions(appLocation.fullPath, permissions) &&
        <PC_Users />
      }
    </PageLayout.Content>
  </PageLayout>
  );
};

function SettingsMenuItem({ leadingVisual, label, state, goTo }) {  
  const appLocation = useAppLocation()    
  const appNavigate = useAppnavigate()

  function handleGoTo() {    
    if ( appLocation.fullPath !== goTo) {
      appNavigate(goTo)
    }
  } 

  return (
    <>
      { checkMenuPermissions(goTo, state.context.userInfo.user.permissions) &&
        <ActionList.Item onClick={() => handleGoTo()} active={appLocation.fullPath === goTo}>
          <ActionList.LeadingVisual>{leadingVisual}</ActionList.LeadingVisual>
          {label}
        </ActionList.Item>
      }     
    </>
  )
}

export default index