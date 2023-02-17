import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'
import { profileDetailMachine } from './profileDetailFormMachine'

export default function ProfileDetailForm() {


    const persistedLoginMachine = profileDetailMachine.withContext({
        isUserLogin: (() => {
            // return localStorage.getItem('isLogin') === 'true' ? true : false;
            return true;
        })()
    })

    const [state, send] = useMachine(persistedLoginMachine);
    console.log(state.value)



    const { isUserLogin } = state.context;


    useEffect(() => {
        console.log('came in useEffect')
        isUserLogin && updateUserDetails()
    }, [])

    function updateUserDetails() {
        send('CheckDetails');
        console.log(state.value)
    }

    return (
        <div>
            {isUserLogin && 'isUserLogin'}
        </div>
    )
}
