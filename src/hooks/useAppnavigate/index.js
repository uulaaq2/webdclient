import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)   

  const navigate = useNavigate()

  function doNavigate(goTo) {
    if (goTo === 'home') {
      state.context.currentPage = 'home'
      return navigate('/')
    } else {
      state.context.currentPage = goTo      
      return navigate('/' + goTo)
    }
  }

  return doNavigate

};

export default index;