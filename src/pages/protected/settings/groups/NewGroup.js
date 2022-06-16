import appStyle from 'app/style.css'
import React, { useState, useEffect, useRef } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Flash, TextInput, Box, ButtonGroup, Button, PageLayout, Heading, Text, Pagehead, FormControl } from '@primer/react'
import B_InputFormGroup from 'baseComponents/B_InputFormGroup'

import { useMachine } from '@xstate/react'
import { groupsMachine } from 'state/groupsMachine'

const NewGroup = ({
  current,
  send,
  setMode
}) => {
  const nameRef = useRef()
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs] = useState({
    name: {      
      id: 'name',
      label: 'Name',
      type: 'text',
      errorText: '',
      ref: nameRef,
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  return (
    <>

      <div className='container-sm'>
        <Text sx={{fontSize: 3, display: 'block', marginBottom: '1rem'}}>New group</Text>
        <Box display={'inline-grid'} gridGap={3} sx={{width: '100%'}}>
          <FormControl required>
            <FormControl.Label>Name</FormControl.Label>
            <TextInput ref={inputs.name.ref} block contrast />
          </FormControl>   
          <FormControl>
            <Button variant='primary' onClick={() => send('NEW', {name: nameRef.current.value})}>
              Save { current.value === 'inProgress' ? <span className='AnimatedEllipsis'></span> : ''}
            </Button>
          </FormControl>    
          <FormControl>
            { current.value === 'failed' && current.context.list.errno && current.context.list.errno === 1062 ? <Flash variant="danger">{nameRef.current.value} Exists! please choose a different name for the new group</Flash> : ''} 
            { console.log(current.context) }
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default NewGroup;