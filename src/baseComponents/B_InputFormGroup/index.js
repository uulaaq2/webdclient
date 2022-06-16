import React from 'react'
import { FormControl, TextInput } from '@primer/react'

const index = ({ 
  id = '', 
  label = '', 
  type = 'text', 
  layout = 'vertical', 
  error = '', 
  maxLength = 255,
  gap = '0.5rem',
  inputRef = null,
  contrast = false,
  required = false,
  labelSX = {}
}) => {
  return (
    <FormControl sx={{width: '100%'}} required={required}>
        <FormControl.Label htmlFor={id} sx={{ width: '100%', marginBottom: {gap}, ...labelSX}}  >{label}</FormControl.Label>
        <TextInput max={maxLength} type={type} sx={{ width: '100%', marginBottom: {gap} }} ref={inputRef} contrast={contrast} />
        {error && (
          <FormControl.Validation id={`input-validation-${id}`} variant="error">
            {error}
          </FormControl.Validation>
        )}
    </FormControl>
  );

};

export default index;