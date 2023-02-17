import {assign, createMachine} from 'xstate'

export const counterMachine=
/** @xstate-layout N4IgpgJg5mDOIC5QGED2BXAdgFzAJwGIBJAOWQCUBRAWUpIBUBtABgF1FQAHVWAS216pMHEAA9EAWgCMU5gDoAzABYFAdgCsAGhABPSQCYFAXyPa0WXIQAilCjTpM2I7nwFCR4hFPWq5ANnU-fS1dSQVmE1MQTFQIOBFzHHxnHn5BYSQxRH0lOSUADmYlP3yNbT0vKQU5ZiD1SKMgA */
createMachine(
  {
    id:'Counter',
    context:{
      count:0,
    },
    on:{
      INCREMENT:{
        actions: assign({count:(context)=>context.count+1})
      },
      DECREMENT:{
        actions:assign({count:(cntxt)=>cntxt.count-1})
      }
    }
  }
)

