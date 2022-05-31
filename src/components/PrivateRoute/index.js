import React, {useContext, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import config from 'config'
import useGetUserInfo from 'functions/user/useGetUserInfo'

const index = ({ element }) => {
  const userInfo = useGetUserInfo()
  const navigate = useNavigate()
    
  useEffect(() => {
    if (userInfo.completed) {
      if (!userInfo.success) {    
        navigate(config.urls.public.path)
      }    
    }
  }, [userInfo.completed])

  return (
    <>
      { (userInfo.inProgress) && 'loading'}
      { (userInfo.success && !userInfo.inProgress && userInfo.appStarted) && 
        <>
          { element }
        </>   
      }
    </>
  )

};

export default index;