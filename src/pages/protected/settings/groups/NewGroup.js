import appStyle from 'app/style.css'
import React, { useState, useEffect, useRef } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Flash, TextInput, Box, ButtonGroup, Button, PageLayout, Heading, Text, Pagehead, FormControl, UnderlineNav } from '@primer/react'
import B_InputFormGroup from 'baseComponents/B_InputFormGroup'
import newGroup from 'functions/groups/newGroup'
import { validateInputFields, addError } from 'functions/validateInputFields'

import { useMachine } from '@xstate/react'
import { apiMachine } from 'state/apiMachine'

const NewGroup = ({
  setMode
}) => {
  pageInitial( {pageName: 'settings.groups.new'} ) 
  const [current, send] = useMachine(apiMachine)
  const stateObj = {
    inProgress: current.context.inProgress
  }  
  const nameRef = useRef()
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs, setInputs] = useState({
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

  useEffect(() => {
    if ((
        current.context.data.errno && 
        current.context.data.errno === 1062
        ))
    {
      send('RESET')
      addError(inputs.name, 'Already exists')      
    }

    if ((current.matches('finished') && current.context.data.status === 'ok')) {
      //setMode('list')
    }
  }, [current.value])

  async function handleSubmit() {
    const validateInputFieldsResult = validateInputFields(inputs)
    if (validateInputFieldsResult.status === 'error') { 
      throw new Error(validateInputFieldsResult.message) 
    }
    if (validateInputFieldsResult.status !== 'ok') return

    send('START', {
      startFunction: newGroup,
      fields: {
        name: nameRef.current.value
      }
    })

    console.log('abc ', inputs)
  }



  return (
    <>      
      <div className='container-sm'>        
        <Text sx={{fontSize: 3, display: 'block', marginBottom: '1rem'}}>{ config.urls.settings.groups.new.name }</Text>
        <UnderlineNav aria-label="Main">
          <UnderlineNav.Link selected>
            Details
          </UnderlineNav.Link>
          { current.context.data.status === 'ok' && <UnderlineNav.Link>Permissions</UnderlineNav.Link> }
        </UnderlineNav>
        
        <Box sx={{width: '100%', marginTop: '1rem'}}>
          <FormControl required>
            <FormControl.Label>Name
              {inputs.name.errorText && (
                <span class="IssueLabel color-bg-danger-emphasis color-fg-on-emphasis ml-2 anim-scale-in">{inputs.name.errorText}</span> 
                )}
            </FormControl.Label>
            <TextInput ref={inputs.name.ref} block contrast />
          </FormControl>   
          <Box marginTop={3}>                        
            <button 
              className="btn btn-primary mr-2" 
              type="button" 
              onClick={handleSubmit}      
              style={{width: '5rem'}}
              disabled={ current.context.inProgress || current.context.data.status === 'ok' }
            >
              Save { current.context.inProgress ? <span className='AnimatedEllipsis'></span> : ''}
            </button>
            <button className="btn btn-invisible" type="button" onClick={() => setMode('list')}>
              { current.context.data.status !== 'ok' ? 'Cancel' : 'Close'}
              
            </button>
          </Box>    

          <FormControl>
            { current.value === 'failed' ?                 
                  <>
                    { (current.context.data.errno && current.context.data.errno !== 1062) ?                      
                      <Flash variant="danger">
                        { current.context.data.message }
                      </Flash> 
                      :
                      ''
                    }
                  </>               
              : ''
            } 
          </FormControl>
        </Box>

      </div>
    </>
  );
};

export default NewGroup;