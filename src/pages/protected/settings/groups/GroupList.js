import appStyle from 'app/style.css'
import React, { useEffect } from 'react'
import { Box, Heading, Button, Link, Spinner, Pagehead, Text, Flash, StyledOcticon } from '@primer/react'
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
      fields: {
        name: '',
        orderByFields: 'Name',
        order: 'ASC'
      }
    })
  }, [])

  useEffect(() => {
    console.log(current)
  }, [current.value])

  return (
    <>
    <div className="container-sm clearfix">
      <div className="Box Box--condensed">
        <div className="Box-header d-flex flex-items-center">
          <h3 className="Box-title overflow-hidden flex-auto">
            { config.urls.settings.groups.name }
          </h3>
          <button className="btn btn-primary btn-sm" onClick={() => setMode('new')}>
            New
          </button>
        </div>
        { (current.matches('finished') && current.context.data.status === 'ok') &&
           current.context.data.groups.map((g, i) => {
            return (
              <div className="Box-body Box-row--hover-gray">
              <a onClick={() => alert('aaa')} className='color-fg-default'>{ g.Name }</a>
              </div>    
            )
        })}

        { current.context.inProgress && 
          <Box display={'flex'} alignItems='center' justifyContent='center' p={2}>
            <Spinner size='small' /> 
          </Box>
        }
      </div>
    </div>

    </>
  )

}

export default AppList