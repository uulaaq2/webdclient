import React from 'react'
import { Checkbox, CheckboxGroup, FormControl } from '@primer/react'

const index = ({ 
  id = '', 
  label = '', 
  value = '', 
  layout = 'horizontal', 
  caption = '',
  inputRef = null
}) => {

  return (
    <CheckboxGroup>
      <FormControl layout={layout}>
        <Checkbox value={value} ref={inputRef} />
        <FormControl.Label sx={{ fontWeight: 'normal' }}>{label}</FormControl.Label>
        {caption &&
          <FormControl.Caption id={`CC-${id}`}>{caption}</FormControl.Caption>
        }
      </FormControl>
    </CheckboxGroup>
  );

};

export default index;