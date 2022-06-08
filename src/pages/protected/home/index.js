import React from 'react';
import { ProtectedHome } from 'pages/protected/home'
import { PageLayout } from '@primer/react'
import pageInitial from 'functions/pageInitial'

const index = () => {
  pageInitial( {pageName: 'home'} )
  return (
    <>protected Home</>
  );
};

export default index;