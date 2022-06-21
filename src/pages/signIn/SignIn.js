import logo from 'images/logo.png'
import React, {useState, useRef, useEffect, useContext} from 'react'

import config from 'config'
import pageInitial from 'functions/pageInitial'
import { validateInputFields } from 'functions/validateInputFields'

import { FormControl, Box, Heading } from '@primer/react'
import B_Button from 'baseComponents/B_Button'
import B_InputFormGroup from 'baseComponents/B_InputFormGroup'
import B_CheckboxFormGroup from 'baseComponents/B_CheckboxFormGroup'
import B_Formerror from 'baseComponents/B_Formerror'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { getLocalStorage } from 'functions/localStorage';

const SignIn = () => {
  pageInitial( {pageName: 'user.signIn'} )

  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const emailRef = useRef()
  const passwordRef = useRef()
  const rememberMeRef = useRef()  
  const [storedEmailAddress, setStoredEmailAddress] = useState('')
  
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

  useEffect(() => {
    const storedEmailAddress = getLocalStorage('email_address').value   

    if (!storedEmailAddress || storedEmailAddress === 'undefined') {
      emailRef.current.focus()
    } else {
      emailRef.current.value = storedEmailAddress
      passwordRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

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
    <div className='d-flex flex-column flex-justify-center flex-items-center mt-5 '>
      <img src={logo} alt={config.app.name} width={90} className='mb-4'/>
      <Heading sx={{fontSize: '1.5rem', fontWeight: 'normal', mb: 3}}>Welcome</Heading>
      <div className='box col-11 col-sm-8 col-md-6 col-lg-5 col-xl-3 p-3 color-bg-subtle border'>
        <Box display="grid" gridGap={3}>
          <FormControl>
            <B_InputFormGroup 
              id={inputs.email.id}
              label={inputs.email.label} 
              error={inputs.email.errorText}
              type={inputs.email.type}
              maxLength={inputs.email.maxLength}
              inputRef={inputs.email.ref}   
              required      
              labelSX={{fontWeight: 'normal'}}        
            />
          </FormControl>

          <FormControl>
            <B_InputFormGroup 
              id={inputs.password.id}
              label={inputs.password.label}             
              error={inputs.password.errorText}
              type={inputs.password.type}
              maxLength={inputs.password.maxLength}
              inputRef={inputs.password.ref}     
              required
              labelSX={{fontWeight: 'normal'}}       
            />
          </FormControl>

          <FormControl>
            <B_CheckboxFormGroup 
              id='keepMeSignedIn' 
              label='Keep me signed in' 
              inputRef={rememberMeRef}
            />
          </FormControl>

          <B_Button variant='primary' sx={{ marginTop: '0.5rem' }} onClick={handleSignin} loadingElipses={state.context.inProgress}>Sign in</B_Button>

          { (state.context.userInfo.status === 'accountIsExpired' || state.context.userInfo.status === 'warning' || state.context.userInfo.status === 'error') &&
                <>
                  { console.log(state.context.userInfo)}
                  <B_Formerror error={state.context.userInfo} />
                </>
              }
        </Box>
      </div>
    </div>
  );
};

export default SignIn