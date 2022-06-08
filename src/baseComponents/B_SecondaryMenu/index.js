import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@primer/react'
import { ArrowRightIcon } from '@primer/octicons-react'
import config from 'config'

import { checkMenuPermissions } from './../../functions/user/checkPermissions';

const index = ({ goTo, label, leftIcon, rightIcon = false, selected, setSelectedMenu }) => {
  function handleClick() {
    setSelectedMenu(goTo)
  }

  return (
    <Box 
      sx={
        {
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '0.5rem 0.5rem',
          bg: () => goTo !== selected ? config.theme.colors.secMenuItemBg : config.theme.colors.secMenuItemSelectedBg,
          color: () => goTo !== selected ? config.theme.colors.secMenuItemFont : config.theme.colors.secMenuItemSelectedFont,
          '&:hover': () => goTo !== selected ? {
            bg: () => goTo !== selected ? config.theme.colors.secMenuItemHoverBg : '',
            color: () => goTo !== selected ? config.theme.colors.secMenuItemHoverFont : ''
          } : ''
        }
      }

      onClick={handleClick}
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