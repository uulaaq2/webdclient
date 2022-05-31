import React, {useContext, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import config from 'config'
import SignIn from 'pages/signin/SignIn'
import useGetUserInfo from 'functions/user/useGetUserInfo'

const index = () => {
  const userInfo = useGetUserInfo()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (userInfo.completed) {
      if (userInfo.success) {    
        navigate(userInfo.user.Home_Page || config.urls.public.path)
      } else {
        if (userInfo.status === 'shouldChangePassword') {
          const token = userInfo.token
          const showCurrentPassword = '0'
          const redirectToUsersHomePage = '1'
          const url = config.urls.user.changePassword.path + '/' + token + showCurrentPassword + redirectToUsersHomePage
    
          navigate(url)
        }
      }    
    }
  }, [userInfo.completed])

  return (
    <>
      { (!userInfo.appStarted) && 'loading'}
      { (!userInfo.success && userInfo.appStarted) && <SignIn/>}
    </>
  )

};

export default index;