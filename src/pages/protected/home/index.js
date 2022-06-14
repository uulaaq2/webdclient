import React, { useState } from 'react';
import { ProtectedHome } from 'pages/protected/home'
import { PageLayout } from '@primer/react'
import pageInitial from 'functions/pageInitial'

import { useSpring, animated } from 'react-spring'

const index = () => {
  pageInitial( {pageName: 'home'} )
  const [aaa, setAaa] = useState()

  const styles = useSpring(aaa)

  function handleClick(animate) {
    if (animate) {
      setAaa({
        from: { x: -100 },
        to: { x: 0 }    
      })
    } else {
      setAaa({
        from: { x: 0 },
        to: { x: -100 }    
      })
    }
  }


  return (
    <>
      protected Home
       <animated.div
        style={{
        width: 80,
        height: 80,
        backgroundColor: '#46e891',
        borderRadius: 16,
        ...styles,
      }}     
    />

    <button onClick={() => handleClick(true)}>aaa</button>
    <button onClick={() => handleClick(false)}>bbb</button>
    </>
  );
};

export default index;