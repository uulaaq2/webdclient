import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)   

  const navigate = useNavigate()

  function doNavigate(goTo) {
    return navigate(goTo)
  }

  return doNavigate
};

export default index;