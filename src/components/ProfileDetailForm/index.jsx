import { useMachine } from '@xstate/react'
import React from 'react'
import { profileDetailMachine } from './profileDetailFormMachine'

export default function ProfileDetailForm() {


    const persistedLoginMachine = profileDetailMachine.withContext({
        isUserLogin: (() => {
            return localStorage.getItem('isLogin') === 'true' ? true : false;

        })()
    })

    const [state, send] = useMachine(persistedLoginMachine);


    function formPage() {
        return <div className="formPage">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
            <br />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="number" name='phoneNumber' />
            <br />
            <button onClick={() => send('ONSUBMIT')}>Submit</button>
        </div>
    }

    function showUserPresentPage() {
        const currentState = state.value.userPresent;
        console.log(currentState)
        switch (currentState) {
            case 'form': {
                return formPage();
            }
            case 'successScreen': {
                return <div> Form Update successfully <br /> <button onClick={() => send('LOGOUT')}>LogOut</button>  </div>
            }
            case 'failureScreen': {
                return <div> Unable to Fetch Data <br /> <button onClick={() => send('RETRY')} >Retry</button> </div>
            }
        }
    }

    function showVerificationPage() {
        return <div className="verificationPage">
            <label htmlFor="otpField">Enter OTP</label>
            <input type="number" name="otpField" />
            <br />
            <button onClick={() => send('VERIFYOTP')} >Verify</button>
        </div>
    }

    function showLoginPage() {
        return <div className="loginPage">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="number" name='mobileNumber' />
            <br />
            <button onClick={() => send('GETOTP')} >Get OTP</button>
        </div>
    }

    function userNotPresentPage() {
        const currentState = state.value.userNotPresent;
        switch (currentState) {
            case 'loginPage': {
                return showLoginPage();
            }
            case 'verificationPage': return showVerificationPage()
            default: {
                return <div>
                    some thing went Wrong
                </div>
            }

        }
    }


    return (
        <div>
            {state.matches('userNotPresent') ? userNotPresentPage() : showUserPresentPage()}
        </div>
    )
}
