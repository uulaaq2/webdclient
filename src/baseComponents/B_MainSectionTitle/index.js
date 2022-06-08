import React from 'react'
import { Heading } from '@primer/react'

const index = ({ title = false, showTitle = false }) => {

  return (
    <Heading 
      sx={{fontSize: 3, mb: 2, opacity: () => showTitle ? '1' : '0' }}
    >
      {title}
    </Heading>
  );
};

export default index;