import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'
import { profileDetailMachine } from './profileDetailFormMachine'

export default function ProfileDetailForm() {


    const persistedLoginMachine = profileDetailMachine.withContext({
        isUserLogin: (() => {
            return localStorage.getItem('isLogin') === 'true' ? true : false;

        })()
    })

    const [state, send] = useMachine(persistedLoginMachine);



    function LoadScreen() {
        const currentState = state.value;
        console.log(currentState)
        switch (currentState) {
            case 'form': {
                break;
            }
            default: {
                send('form')
                console.log("Not match with any state")
                console.log(state.value)
            }
        }
    }


    useEffect(() => {

    }, [])

    return (
        <div>
            {LoadScreen()}
        </div>
    )
}
