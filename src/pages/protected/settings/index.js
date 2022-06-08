import React from 'react'
import { Heading, Box, PageLayout } from '@primer/react'
import B_PageLayout from 'baseComponents/B_PageLayout'

import B_SecondaryMenu from 'baseComponents/B_SecondaryMenu'

const index = () => {
  return (
  <B_PageLayout>
    <PageLayout.Pane position="start">
      <Heading sx={{fontSize: 3, mb: 2}}>Settings</Heading>
      <Box>
        <B_SecondaryMenu
          label='Users'
          rightIcon={true}
        />

        <B_SecondaryMenu
          label='Departments'
          rightIcon={true}
        />

        <B_SecondaryMenu
          label='Groups'
          rightIcon={true}
          goTo={'settings/groups'}
        />

      </Box>
    </PageLayout.Pane>

    <PageLayout.Content>
    <Heading sx={{fontSize: 3, mb: 2}}>Groups</Heading>
    </PageLayout.Content>
  </B_PageLayout>
  );
};

export default index;