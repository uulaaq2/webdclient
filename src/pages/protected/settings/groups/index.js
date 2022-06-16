import appStyle from 'app/style.css'
import React, { useState, useEffect } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Box, ButtonGroup, Button, PageLayout, Heading, Breadcrumbs } from '@primer/react'
import GroupList from './GroupList'
import NewGroup from './NewGroup'

import { useMachine } from '@xstate/react'
import { groupsMachine } from 'state/groupsMachine'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} ) 
  const [current, send] = useMachine(groupsMachine)
  const [mode, setMode] = useState('list')
  
  useEffect(() => {
    send('GET_GROUPS', {name: '', orderByFields: ''})
  }, [])

  useEffect(() => {
    console.log(mode)
  }, [mode])

  return (
    <>
      <PageLayout>        
        <PageLayout.Content>
          { mode === 'new' && 
            <NewGroup current={current} send={send} setMode={setMode}/>
          }
          { mode === 'list' && 
            <GroupList current={current} setMode={setMode} />
          }
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default index;