import { createMachine, interpret, assign } from 'xstate'
import { setError, setSuccess, setWarning } from 'functions/setReply'

export const apiMachine = createMachine({
  id: 'apiMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: {    
    data: {},
    inProgress: false
  },

  states: {

    waiting: {
      entry: () => console.log('waiting'),
      on: {
        START: {
          target: 'starting'
        }
      }
    },

    starting: {
      entry: assign({ inProgress: true}),      
      invoke: {
        id: 'started',
        src: start,
        onDone:[
          {
            target: 'finished',
            cond: (c, e) => e.data.status === 'ok'
          },
          {
            target: 'failed'
          }
        ]
      },
      exit: assign({ data: (c, e) => e.data })
    },

    failed: {
      entry: assign({ inProgress: false}),
      on: {
        RESET: {
          target: 'waiting'
        }
      }
    },

    finished: {
      entry: assign({ inProgress: false}),
      on: {
        RESET: {
          target: 'waiting'
        }
      }
    }

  }
  
})

async function start(c, e) {
  let params = []

  for (let key in e.fields) {  
    if (typeof(e[key]) !== 'function') {
      params.push(e.fields[key])
    }
  }  

  const result = await e.startFunction(...params)

  return result
}