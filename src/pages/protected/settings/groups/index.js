import appStyle from 'app/style.css'
import React from 'react'
import pageInitial from 'functions/pageInitial'
import B_MainSectionTitle from 'baseComponents/B_MainSectionTitle'
import config from 'config'
import { Box, ButtonGroup, Button, PageLayout } from '@primer/react'
import B_Table from 'baseComponents/B_Table'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} )
  return (
    <>
      <PageLayout>
        <PageLayout.Content>
          <Box className={appStyle.customBox}>
            <Box>
              <ButtonGroup>
                <Button>New group</Button>              
              </ButtonGroup>
            </Box>

            <Box sx={{marginTop: '10px'}} className='bHeader'>
              <B_Table
                headers={['Name', 'Description', 'Date', 'User']}
              >

              </B_Table>
            </Box>
          </Box>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default index;