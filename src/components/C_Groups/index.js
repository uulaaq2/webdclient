import React from 'react'
import pageInitial from 'functions/pageInitial'
import B_MainSectionTitle from 'baseComponents/B_MainSectionTitle'
import config from 'config'

import { Box } from '@primer/react'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} )
  return (
    <>
      <B_MainSectionTitle title={config.urls.settings.groups.name} showTitle={showTitle} />
      <Box 
        sx={{
          bg: 'canvas.default'
        }}
      >      
        aaaa
      </Box>
    </>
  );
};

export default index;