import { createMachine, interpret, assign } from 'xstate'
import getUserWithCredentials from 'functions/user/getUserWithCredentials'
import getUserWithToken from 'functions/user/getUserWithToken'
import { setLocalStorage, deleteLocalStorage } from 'functions/localStorage'
import { setError, setSuccess, setWarning } from 'functions/setReply'
import changeUserPassword from 'functions/user/changeUserPassword'

export const authMachine = createMachine({
  id: 'authMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: {
    userInfo: {
      status: ''
    },
    appMenuCurrentPage: '/',
    signInType: '',
    rememberMe: false,
    inProgress: false,
    appStarted: false
  },

  states: {

    waiting: {     
      on: {
        SIGN_IN: {          
          target: 'gettingUserInfo'        
        },
        FAIL: {          
          target: 'finished'
        }
      }
    },    

    gettingUserInfo: {            
      entry: assign({ inProgress: true }),
      invoke: {
        id: 'getUser',
        src: doGetUser,
        onDone: {          
          target: 'validatingUser'
        },
        onError: {          
          target: 'error'
        }
      },
      exit: [
              assign({ signInType: (context, event) => event.data.signInType }),      
              assign({ rememberMe: (context, event) => event.data.rememberMe }),                    
              assign({ userInfo: (context, event) => event.data.userInfo })            
            ]
    },

    validatingUser: {
      always: [
        {
          target: 'warning',          
          cond: (context, event) => context.userInfo.status === 'accountIsExpired'
        },
        {
          target: 'shouldChangePassword',
          cond: (context, event) => context.userInfo.status === 'shouldChangePassword'
        },        
        {
          target: 'warning',
          cond: (context, event) => context.userInfo.status === 'warning'
        },
        {
          target: 'error',
          cond: (context, event) => context.userInfo.status === 'error'
        },
        {
          target: 'error',
          cond: (context, event) => context.userInfo.status !== 'ok'
        },
        {
          target: 'settingToken',          
          cond: (context, event) => context.userInfo.status === 'ok'
        }
      ]         
    },    

    settingToken: {
      invoke: {
        id: 'storeToken',
        src: doStoreToken,
        onDone: [
          {
            target: 'success',
            cond: (context, event) => event.data.status === 'ok'
          },
          {
            target: 'warning',
            cond: (context, event) => event.data.status === 'warning'
          },
          {
            target: 'error',
            cond: (context, event) => event.data.status === 'error'
          }
        ]
      }
    },
    
    success: {
      always: {
        target: 'finished'
      }
    },    

    shouldChangePassword: {
      always: {
        target: 'finished'
      }
    },

    warning: {
      always: {
        target: 'finished'
      }
    },

    error: {
      always: {
        target: 'finished'
      }
    },

    fail: {
      always: {        
        target: 'finished'
      }
    },    

    signIngOut: {
      invoke: {
        onEntry: assign({ inProgress: true}),
        id: 'signOut',
        src: doSignout,
        onDone: {
          actions: assign({ userInfo: () => {return {status: ''}} }),
          target: 'finished'
        },
        exit: assign({ inProgress: false})
      }
    },

    finished: {
      entry: [assign({ inProgress: false}), assign({ appStarted: true })],
      on: {
        SIGN_IN: {
          target: 'gettingUserInfo',          
          cond: (context) => context.userInfo.status !== 'ok'
        },

        SIGN_OUT: {
          target: 'signIngOut'
        }
      }
    },
    
    clearingContext: {
      always: {
        actions: (context) => doClearContext(context),
        target: 'waiting'
      }
    }

  }
  
})

// Interpret the machine, and add a listener for whenever a transition occurs.
const service = interpret(authMachine).onTransition((state) => {
  console.log(state.value)
})

// Start the service
service.start()

// functions


// get user
async function doGetUser(context, event) {
  try {        
    const { requestType = '', email = undefined, password = undefined, rememberMe = undefined, token = undefined } = event  
    let signInType    
    let getUserResult
    let rememberMeTemp = rememberMe

    if (requestType === 'signInWihCredentials') {
      signInType = 'credentials'
      getUserResult = await getUserWithCredentials(email, password, rememberMe)
    }
    
    if (requestType === 'signInWithToken') {
      signInType = 'token'
      if (token) {
        getUserResult = await getUserWithToken(token)
        rememberMeTemp = getUserResult.rememberMe        
      } 
    }

    if (requestType === 'changeUserPassword') {
      signInType = 'credentials'      
      getUserResult = await changeUserPassword(token, password)
      rememberMeTemp = getUserResult.rememberMe
    }

    if (getUserResult.status === 'ok') {
      setLocalStorage('email_address', getUserResult.user.Email_Address, true)
    }

    return {
      userInfo: getUserResult,
      signInType,
      rememberMe: rememberMeTemp
    }

 
  } catch (error) {
    return {
      userInfo: setError(error),
      signInType: '',
      rememberMe: undefined
    }
  }
}

// store token, depending on config storeType
async function doStoreToken(context, event) {
  try {
    if (context.signInType === 'token') {
      return setSuccess()
    }
    
    const { rememberMe = false } = context
    const { token = '' } = context.userInfo    
    const { Can_Be_Remembered = false } = context.userInfo.user    

    const setTokenResult = await setLocalStorage('token', token, rememberMe && Can_Be_Remembered)

    return setTokenResult
  } catch (error) {
    return setError(error)
  }
}

async function doSignout(context, event) {
  deleteLocalStorage('token')
}

// clear context
function doClearContext(context) {
  context = {
    userInfo: {
      status: ''
    },
    inProgress: false
  }  

  console.log(context)
}