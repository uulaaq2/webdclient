import style from './style.css'
import React from 'react'
import { Box, Spinner } from '@primer/react'

const index = () => {
  return (
    <div className={style.spinner}>
      <Spinner />
    </div>
  );
};

export default index;