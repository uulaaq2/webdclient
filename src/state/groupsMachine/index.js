import { createMachine, interpret, assign } from 'xstate'
import { setError, setSuccess, setWarning } from 'functions/setReply'
import getGroups from 'functions/groups/getGroups'
import newGroup from 'functions/groups/newGroup'

export const groupsMachine = createMachine({
  id: 'groupsMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: {    
    list: {

    },
    inProgress: false
  },

  states: {

    waiting: {
      on: {
        GET_GROUPS: {
          target: 'gettingGroups'
        },
        NEW: {
          target: 'addingGroup'
        }
      }
    },

    gettingGroups: {
      entry: assign({ inProgress: true}),      
      invoke: {
        id: 'getGroups',
        src: doGetGroups,
        onDone:[
          {
            target: 'finished',
            cond: (context, event) => event.data.status === 'ok'
          },
          {
            target: 'failed'
          }
        ]
      },
      exit: assign({ list: (context, event) => event.data })
    },

    addingGroup: {
      entry: assign({ inProgress: true}),
      invoke: {
        id: 'addGroup',
        src: doNewGroup,
        onDone: [
          {
            target: 'finished',
            actions: (c, e) => console.log('ok', e.data),
            cond: (context, event) => event.data.status === 'ok'
          },
          {
            actions: (c, e) => console.log('failed ', e.data),
            target: 'failed'
          }
        ]
      },      
      exit: assign({ list: (context, event) => event.data })
    },

    failed: {
      entry: assign({ inProgress: false})
    },

    finished: {
      entry: assign({ inProgress: false}),
      on: {
        GET_GROUPS: {
          target: 'gettingGroups'
        },
        NEW: {
          target: 'addingGroup'
        }
      }
    }

  }
  
})


async function doGetGroups(context, event) {
  try {     
    const { name, orderByFields} = event
    
    const result = await getGroups(name, orderByFields)    
   
    return result
  } catch (error) {
    return setError(error)
  }
}

async function doNewGroup(context, event) {
  try {
    const { name } = event
    
    const result = await newGroup(name)

    return result
  } catch (error) {
    return setError(error)
  }
}