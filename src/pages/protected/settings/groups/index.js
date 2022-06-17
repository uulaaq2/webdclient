import appStyle from 'app/style.css'
import React, { useState, useEffect } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Box, ButtonGroup, Button, PageLayout, Heading, Breadcrumbs } from '@primer/react'
import GroupList from './GroupList'
import NewGroup from './NewGroup'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} ) 

  const [mode, setMode] = useState('list')

  return (
    <>
      <PageLayout>        
        <PageLayout.Content>
          { mode === 'new' && 
            <NewGroup setMode={setMode}/>
          }
          { mode === 'list' && 
            <GroupList setMode={setMode} />
          }
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default index;