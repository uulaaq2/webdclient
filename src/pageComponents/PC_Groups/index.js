import React from 'react'
import pageInitial from 'functions/pageInitial'
import B_MainSectionTitle from 'baseComponents/B_MainSectionTitle'
import config from 'config'

import { Box, Button } from '@primer/react'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} )
  return (
    <>
      <Box 
        sx={{

        }}
      >             
        <Box pb={3}>
          <Button variant='primary'>New group</Button>
        </Box>
        <Box sx={{bg: 'white'}} p={2}>
aaaa
        </Box>
      </Box>
    </>
  );
};

export default index;