import React, { useState, useContext } from 'react'
import { ActionList, Box, PageLayout, Heading } from '@primer/react'
import B_PageLayout from 'baseComponents/B_PageLayout'

import config from 'config'
import pageInitial from 'functions/pageInitial'
import useAppnavigate from 'hooks/useAppnavigate'
import useAppLocation from 'hooks/useAppLocation'

import { checkPermission } from 'functions/user/checkPermission';

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
    <div>aaa</div>
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