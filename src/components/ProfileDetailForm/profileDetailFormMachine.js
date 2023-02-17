import { assign, createMachine } from "xstate";

const fetchFormDetail= (userId)=>{
    // return fetch('dummyURL').then((response)=>response.json);
    return new Promise((resolve,reject)=>{
        resolve('val');
    })
}

export const profileDetailMachine= 
/** @xstate-layout N4IgpgJg5mDOIC5QAUBOB7AZgSwDZgBEwAXAQzwDF1UBbAOmwnwGIBhACzAGMBrIsvLADaABgC6iUAAd0sbMWzoAdpJAAPRAEYAbHQBMAdhEGAnAFYzIgMya9ZqwA4zAGhABPRDZN0ALNqvaIj6aFjomegC+Ea5oWHiEJOS4VLR0AK6wYKhocGBKxMwQymAMSgBu6DwlMMQpNPxJwuKqMnIKyqoaCGYGDnRmDg56Jj4+dnpWPgauHggmpnTaDkYiepom80EmUTEYOPgNlNT0GVk5mfnMWRiodFK4pMSYx3Q1dYe4TRJIIK3yiiofl0DD4rPoDGYTDofOYzFM9DNENoFqM9BMzJorJYhgYdiBYvsEgJki9TtlULl8nRnrRmAB5AByAGUAKoAIQAsgBJAAqom+0lk-w6QK0ITMdF6JlWUwcISm2kRc20mn6OixPjhQQc2jMeIJ8Q+dXSmXJlOI1KSaQpTK4FLyzAASgBRHmOgCa-JaQvagNAXU0IhMuj8gT0yMmyPDSuRBjoJkcVixZjRBisCf1e0NiSOqTJ5zyFtgaS4XDgsFt9qUzAAMugoHS0sQvT8-r7OogALTmSUiBxWEGrSYDlzuLuBuiaZYw2XaKaaEHaTNxA45kl500M9DEAtU3D17BKZCkGDMADirrpPOQLcFbQBHYQmlsfSDjjWDiC2mGMbjQ2sPjGOspiWJoy6EkapKbtuu4WmUWTYDgXCPACx6ngAas6jpchQ7pXjezStj6D6iggoxxiIGLzCq-YWOmipjk+yyTpRqx2JMmqfj44HZsSxpkluO4UhccEIUhKHKGhYDnpe14AIJnnJXIMrevzESK-qIFCIaGMYI4GBCPhKiEIiLNKtiUXofgBGBeJKOgEBwKoBqrnxxzeveGnqF2djeI4cIDiIz4GFOEJKp2gZxpipjSuGcIGLqS7RPiWauUkxqMPgHnCn63kIJ2ayqv5oJGMFoWjrMKq6CqBh6MYc5BVZPFpbmJymrB2XtqR9imQMQwjGMKaTNMjEBb4CZBUYun2HqyUuUS6VQWcwmFtS7lEZ5uVdBsYKmKsUKQvY-gIoxgxgsiQWrM+oyQtxc2pQtrUmst5qWng1pgJWYB5J1JGaXMfiTpoN3St+Zi6iYv59INSaWDC-Yhc1j3rm1L0iXQxaluWX0-RtOWPrYgF0AOqa2LpywOEqph9BdgaFSDd27CuyP8dBQnmr9XnArY-QJmFjERd4uqDOGwPrMEwRI5BG5ZIJsF0PuUCHlJnNbYgCW9XzFVaaqELLEGemGFMUtrqzsswStVLwagiHYMhvoq3jXX-Qjk6go4tjaCMQVWEqA5xpCdVoiIKoWIdURREAA */
 createMachine(
    {
        predictableActionArguments: true,
        id:'ProfileDetailForm',

        context:{
            isUserLogin:false,
            userID:1234,
        },

        states:{
            idle:{
               
                 on:{
                    CheckDetails: [{ target:'userPresent',cond:'isUserPresent' }]
                 }
                
            },

            userPresent:{
                invoke:{
                    id:'getFormDetails',
                    src:(context,event)=>fetchFormDetail(context.userID),
                    onDone:{
                        target:".form",
                    },
                    onError:{
                        target:".failureScreen",
                        internal: false
                    }

                },

                states: {
                    form: {
                        on: {
                            ONSUBMIT: "successScreen"
                        }
                    },

                    failureScreen:{
                        on: {
                            RETRY: "#ProfileDetailForm.userPresent"
                        }
                    },

                    successScreen:{
                        on: {
                            LogOut: "#ProfileDetailForm.userNotPresent"
                        }
                    }
                },
            },

            userNotPresent:{
                states:{
                    loginPage:{
                        on: {
                            GETOTP: "verificationPage"
                        }
                    },

                    verificationPage: {
                        on:{
                            VERIFYOTP:[{
                                target:"#ProfileDetailForm.userPresent",
                                cond: ()=>{ return true}
                            }],
                            GETOTPAGAIN:{
                                target:'loginPage'
                            }
                        }
                    }
                },

                initial: "loginPage"
            }
        },

        initial: "idle"
    },
    {
        guards:{
            isUserPresent:(context)=>context.isUserLogin===true
        }
    }
)
