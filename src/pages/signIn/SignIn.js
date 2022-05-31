import logo from 'images/logo.png'
import React, {useState, useRef, useEffect, useContext} from 'react'

import config from 'config'
import pageInitial from 'functions/pageInitial'
import { validateInputFields } from 'functions/validateInputFields'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const SignIn = () => {
  pageInitial( {pageName: 'user.signIn'} )

  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const emailRef = useRef()
  const passwordRef = useRef()
  const rememberMeRef = useRef()  
  
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs] = useState({
    email: {      
      id: 'email',
      label: 'Email address or user name',
      type: 'text',
      errorText: '',
      ref: emailRef,
      required: true,
      validate: true
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      errorText: '',
      ref: passwordRef,
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  



  async function handleSignin() {
    const validateInputFieldsResult = validateInputFields(inputs)
    if (validateInputFieldsResult.status === 'error') { 
      throw new Error(validateInputFieldsResult.message) 
    }
    if (validateInputFieldsResult.status !== 'ok') return
  
    send('SIGN_IN', {    
      requestType: 'signInWihCredentials',
      email: emailRef.current.value, 
      password: passwordRef.current.value, 
      rememberMe: rememberMeRef.current.checked
    })

  }

  return (
    <>
      <div data-color-mode="auto" data-light-theme="light" data-dark-theme="dark_dimmed" className="p-3">
  <h4>Synced to system</h4>
  <code className="d-block mt-1 mb-3 color-fg-muted">
    data-color-mode="auto" data-light-theme="light" data-dark-theme="dark_dimmed"
  </code>
  <button className="btn">Button</button>
  <span className="Label ml-2">Label</span>
  <span className="Counter ml-2">123</span>
</div>
    </>
  );
};

export default SignIn