import React, {useContext, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import config from 'config'
import useGetUserInfo from 'functions/user/useGetUserInfo'
import B_Navbar from 'baseComponents/B_Navbar'
import B_Pageloading from 'baseComponents/B_Pageloading'

const index = ({ element }) => {
  const userInfo = useGetUserInfo()
  const navigate = useNavigate()
    
  useEffect(() => {
    if (userInfo.completed) {
      if (!userInfo.success) {    
        console.log('navigate')
        navigate(config.urls.public.path)
      }    
    }
  }, [userInfo])

  return (
    <>
      { (userInfo.inProgress) && <B_Pageloading />}
      { (userInfo.success && !userInfo.inProgress && userInfo.appStarted) && 
        <>
          <B_Navbar />
          { element }
        </>   
      }
    </>
  )

};

export default index;