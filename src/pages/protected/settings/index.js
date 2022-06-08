import React, { useState, useContext } from 'react'
import { Heading, Box, PageLayout } from '@primer/react'
import B_PageLayout from 'baseComponents/B_PageLayout'

import config from 'config'
import B_SecondaryMenu from 'baseComponents/B_SecondaryMenu'
import Groups from 'components/C_Groups'
import B_MainSectionTitle from 'baseComponents/B_MainSectionTitle'
import pageInitial from 'functions/pageInitial'

import { checkMenuPermissions } from 'functions/user/checkPermissions';

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  pageInitial({ pageName: 'settings' })
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const [selectedMenu, setSelectedMenu] = useState()

  return (
  <PageLayout>
    <PageLayout.Pane position="start">
      <B_MainSectionTitle title={config.urls.settings.name} showTitle={true} />
      <Box
        sx={{
          bg: config.theme.colors.secMenuBg
        }}
      >
        <SettingsMenu state={state} send={send} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </Box>
    </PageLayout.Pane>

    <PageLayout.Content>
      { selectedMenu === 'groups' && <Groups showTitle={false} />}
    </PageLayout.Content>
  </PageLayout>
  );
};

function SettingsMenu({ state, send, selectedMenu, setSelectedMenu}) {  
  const permissions = state.context.userInfo.user.permissions
  return (
    <>
      { checkMenuPermissions('settings/users', permissions) &&
        <B_SecondaryMenu
          goTo='users'
          label='Users'
          rightIcon={true}
          selected={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      }
      
      { checkMenuPermissions('settings/departments', permissions) &&
        <B_SecondaryMenu
          goTo='departments'
          label='Departments'
          rightIcon={true}
          selected={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
    }
    
    { checkMenuPermissions('settings/groups', permissions) &&
      <B_SecondaryMenu
        goTo='groups'
        label='Groups'
        rightIcon={true}
        selected={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    }
    </>
  )
}

export default index