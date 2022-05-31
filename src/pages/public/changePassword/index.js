import React, { useState, useRef, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import logo from 'images/logo.png'
import config from 'config'
import pageInitial from 'functions/pageInitial'
import { validateInputFields } from 'functions/validateInputFields'

const getToken = (token) => token.substring(0, token.length - 2)
const getShowCurrentPassword = (token) => token.charAt(token.length - 2) === '1' ? true : false
const getRedirectToUsersHomePage = (token) => token.charAt(token.length - 1) === '1' ? true : false

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
    console.log(state.value)
    console.log(state.context.userInfo)
    if (state.value === 'finished' && state.context.userInfo.status === 'ok') {
      setShowPasswordIsChanged(true)
      console.log('aaa')
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
    <>

    </>
  );
}

const PasswordIsChanged = ({ countDownFrom, redirectTo }) => {
  const [counter, setCounter] = useState(countDownFrom)
  const navigate = useNavigate()
  
  useEffect(() => {

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
   <></> 
  )
}

export default ChangePassword;