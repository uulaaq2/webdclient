import React from 'react'
import { AlertIcon } from '@primer/octicons-react'

const index = ({ message }) => {
  return (
    <div className="flash flash-error py-1 px-2">
      <AlertIcon /> {message}
    </div>
  );
};

export default index;