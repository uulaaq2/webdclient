import appStyle from 'app/style.css'
import React from 'react'
import { Heading, Button, Link, Spinner, Pagehead, Text } from '@primer/react'
import config from 'config'
import B_Listloading from 'baseComponents/B_Listloading'

const AppList = ({
  current,
  setMode
}) => {
  return (
    <>
      <div className='container-sm'>
        <Text sx={{fontSize: 3, display: 'block', marginBottom: '1rem'}}>Groups</Text>
        <div className={appStyle.listButtonGroupWrapper}>
          <Button onClick={() => setMode('new')}>New</Button>
        </div>
        <div className={appStyle.listWrapper}>
          <div className={appStyle.listHeader}>
            <div className={appStyle.listHeaderText}>
              { current.matches('inProgress') ? 'Loading...' : 'Name' }
            </div>
          </div>
          <div className={appStyle.listDataWrapper}>

            { (current.matches('finished') && current.context.list.status === 'ok') &&
              current.context.list.groups.map((group, i) => {
                return (
                  <div className={appStyle.listRow} key={i}>
                    <Link>{ group.Name }</Link>
                  </div>
                )
              })
            }

            { current.matches('inProgress') ? 
              <div className={appStyle.listRow}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Spinner size='small' /></div> 
              </div>
              : ''}

          </div>
        </div>
      </div>
    </>
  );
}

export default AppList