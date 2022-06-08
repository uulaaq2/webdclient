import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@primer/react'
import { ArrowRightIcon } from '@primer/octicons-react'

import { checkMenuPermissions } from './../../functions/user/checkPermissions';

const index = ({ leftIcon, label, rightIcon = false, goTo}) => {
  const navigate = useNavigate()

  function handleGoto() {
    navigate('/' + goTo)
  }

  return (
    <Box 
      sx={
        {
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '0.5rem 0.5rem',
          bg: 'canvas.default',
          '&:hover': {
            bg: 'accent.fg',
            color: 'accent.subtle'
          }
        }
      }

      onClick={handleGoto}
    >
        <span>
            {leftIcon}
            {label}
        </span>

        <span>
          {rightIcon ? <ArrowRightIcon /> : ''}
        </span>
    </Box>
  );
};

export default index;