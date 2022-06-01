import React from 'react'
import { Button } from '@primer/react'

const index = ({ 
  children,
  loadingElipses = false,
  ...rest
 }) => {
  return (
    <Button disabled={loadingElipses} {...rest}>{children} {loadingElipses && <span className='AnimatedEllipsis'></span>}</Button>
  );
};

export default index;