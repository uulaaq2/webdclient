import React, { useState, useRef, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import logo from 'images/logo.png'
import config from 'config'
import pageInitial from 'functions/pageInitial'
import { validateInputFields } from 'functions/validateInputFields'

import { FormControl, Box, Heading } from '@primer/react'
import { CircleOcticon } from '@primer/react'
import { CheckIcon, RepoCloneIcon } from '@primer/octicons-react'

import B_Button from 'baseComponents/B_Button'
import B_InputFormGroup from 'baseComponents/B_InputFormGroup'
import B_CheckboxFormGroup from 'baseComponents/B_CheckboxFormGroup'
import B_Formerror from 'baseComponents/B_Formerror'

const getToken = (token) => token.substring(0, token.length - 1)
const getShowCurrentPassword = (token) => token.charAt(token.length - 1) === '1' ? true : false

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import useGetUserInfo from 'functions/user/useGetUserInfo'

const ChangePassword = () => {
  pageInitial( {pageName: 'user.changePassword'} )
  
  const { token } = useParams()
  const navigate = useNavigate()  

  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)  
  const [showPasswordIsChanged, setShowPasswordIsChanged] = useState(false)
 
  const currentPasswordRef = useRef()
  const newPasswordRef = useRef()
  const confirmNewPasswordRef = useRef()  
  
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs] = useState({
    currentPassword: {    
      id: 'currentPassword',
      label: 'Current password',
      type: 'password',
      errorText: '',
      ref: currentPasswordRef,
      required: getShowCurrentPassword(token),
      validate: getShowCurrentPassword(token)
    },    
    newPassword: {      
      id: 'newPassword',
      label: 'New password',
      type: 'password',
      errorText: '',
      ref: newPasswordRef,
      required: true,
      validate: true
    },
    confirmNewPassword: {
      id: 'confirmNewPassword',
      label: 'Confirm new password',
      type: 'password',
      errorText: '',
      ref: confirmNewPasswordRef,
      match: newPasswordRef,
      matchLabel: 'New Password',
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    const fieldToFocus = getShowCurrentPassword(token) ? currentPasswordRef : newPasswordRef    

    fieldToFocus.current.focus()
  }, [])

  useEffect(() => {    
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  useEffect(() => {
    if (state.value === 'finished' && state.context.userInfo.status === 'ok') {
      setShowPasswordIsChanged(true)
    }
  }, [state.value])

  const handleChangePassword = async () => {
    try {
      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult.status === 'error') { 
        throw new Error(validateInputFieldsResult.message) 
      }
      if (validateInputFieldsResult.status !== 'ok') return

      send('SIGN_IN', {    
        requestType: 'changeUserPassword',
        token: getToken(token),
        password: newPasswordRef.current.value
      })    
      
    } catch (error) {
    }
  }
  return (
    <div className='d-flex flex-column flex-justify-center flex-items-center mt-5'>
      <img src={logo} alt={config.app.name} width={90} className='mb-4'/>
      <Heading sx={{fontSize: '1.5rem', fontWeight: 'normal', mb: 3}}>Change your password</Heading>
      <div className='box col-11 col-sm-8 col-md-6 col-lg-5 col-xl-3 p-3 color-bg-subtle border'>
        <Box display="grid" gridGap={3}>
          { showPasswordIsChanged && 
            <PasswordIsChanged countDownFrom={10} redirectTo={config.urls.home} />
          }
          { !showPasswordIsChanged &&
            <>
              { getShowCurrentPassword(token) &&                    
                <FormControl>
                  <B_InputFormGroup 
                    id={inputs.currentPassword.id}
                    label={inputs.currentPassword.label} 
                    error={inputs.currentPassword.errorText}
                    type={inputs.currentPassword.type}
                    maxLength={inputs.currentPassword.maxLength}
                    inputRef={inputs.currentPassword.ref}
                  />
                </FormControl>
              }

              <FormControl>
                  <B_InputFormGroup 
                    id={inputs.newPassword.id}
                    label={inputs.newPassword.label} 
                    error={inputs.newPassword.errorText}
                    type={inputs.newPassword.type}
                    maxLength={inputs.newPassword.maxLength}
                    inputRef={inputs.newPassword.ref}
                  />
              </FormControl>   

              <FormControl>
                  <B_InputFormGroup 
                    id={inputs.confirmNewPassword.id}
                    label={inputs.confirmNewPassword.label} 
                    error={inputs.confirmNewPassword.errorText}
                    type={inputs.confirmNewPassword.type}
                    maxLength={inputs.confirmNewPassword.maxLength}
                    inputRef={inputs.confirmNewPassword.ref}
                  />
              </FormControl>                    

              <B_Button variant='primary' sx={{ marginTop: '0.5rem' }} onClick={handleChangePassword} loadingElipses={state.context.inProgress}>Change password</B_Button>

              { (state.context.userInfo.status === 'accountIsExpired' || state.context.userInfo.status === 'warning' || state.context.userInfo.status === 'error') &&
                    <>
                      <B_Formerror message={state.context.userInfo.message} />
                    </>
              }
            </>
          }
        </Box>
      </div>
    </div>
  );
}

const PasswordIsChanged = ({ countDownFrom, redirectTo }) => {
  const [counter, setCounter] = useState(countDownFrom)
  const navigate = useNavigate()
  
  useEffect(() => {
    console.log(redirectTo)
  }, [])

  useEffect(() => {
    if (countDownFrom === null) return

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      handleRedirect()
    }
    return () => clearInterval(timer);    
  }, [counter]);

  function handleRedirect() {
    if (!redirectTo)  {
      navigate('/')
    } else {
      navigate(redirectTo.path)
    }
  }
  
  return (
   <Box display={'flex'} alignItems='center' justifyContent='center' flexDirection='column'>
    <CircleOcticon icon={CheckIcon} size={32} sx={{bg: 'success.fg', color: 'fg.onEmphasis'}} />
    <Heading sx={{ fontSize: '1.2rem', fontWeight: 'normal', marginTop: '1rem', marginBottom: '2rem' }}>Your new password is set</Heading>
    <B_Button variant='primary' onClick={handleRedirect}>Go to {redirectTo.name} {counter}</B_Button>
   </Box>
  )
}

export default ChangePassword;