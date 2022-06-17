import appStyle from 'app/style.css'
import React, { useEffect } from 'react'
import { Heading, Button, Link, Spinner, Pagehead, Text, Flash, StyledOcticon } from '@primer/react'
import { CircleSlashIcon } from '@primer/octicons-react'
import config from 'config'
import B_Listloading from 'baseComponents/B_Listloading'
import getGroups from 'functions/groups/getGroups'

import { useMachine } from '@xstate/react'
import { apiMachine } from 'state/apiMachine'

const AppList = ({
  setMode
}) => {
  
  const [current, send] = useMachine(apiMachine)

  const stateObj = {
    inProgress: current.context.inProgress
  }

  useEffect(() => {
    send('START',{
      startFunction: getGroups,
      name: '',
      orderByFields: ''
    })
  }, [])

  useEffect(() => {
    console.log(current)
  }, [current.value])

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
              Name
            </div>
          </div>
          { stateObj.inProgress ? 
                <div className={appStyle.listLoadingWrapper}><Spinner size='small' /></div>                     
              : 
                ''
          }
          <div className={appStyle.listDataWrapper}>

            { (current.matches('finished') && current.context.data.status === 'ok') &&
              current.context.data.groups.map((group, i) => {
                return (
                  <div className={appStyle.listRow} key={i}>
                    <Link>{ group.Name }</Link>
                  </div>
                )
              })
            }
          </div>

        </div>

        { current.context.data.message  &&
          <Flash  variant='danger' sx={{ marginTop: '1rem'}}>
            <StyledOcticon icon={CircleSlashIcon} />
            { current.context.data.message }
          </Flash>
        }
      </div>
    </>
  )

}

export default AppList