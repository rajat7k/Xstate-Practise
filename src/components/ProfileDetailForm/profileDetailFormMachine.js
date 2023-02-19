import {  createMachine } from "xstate";

const fetchFormDetail= (userId)=>{
    // return fetch('dummyURL').then((response)=>response.json);
    return new Promise((resolve,reject)=>{
        resolve();
    })
}

export const profileDetailMachine= 
/** @xstate-layout N4IgpgJg5mDOIC5QAUBOB7AZgSwDZgBEwAXAQzwDF1UBbAOmwnwGIBtABgF1FQAHdWNmLZ0AOx4gAHogBsAJgA0IAJ6IALAFZ2dDQGYAnIYCMcgOwy1pkwF9rStFjyES5XFVoMmYNke5IQ-ILCYhLSCLpy+nRGBnIyABzyGmoyGvpKqghG8XJ08aYa+TKm8REWRhq29hg4+ERklNT0AK6wYKhocGCixMwQYmAMogBu6ADWgzDE7jT1rrAcfnwCQiLi-mGJpnTmEfpq7GZquuwyGbKm23qFamrZGkYlMlUgDrXODW5NdK3tnW09ZjtDCoOi8XCkYiYb5TGZzPALLgSQKrEIbRBbHYyPYHI4nM4qRAaDTbOTxQpaMkRSLxF5vJzwr4eX4dVBdHp0aG0ZgAeQAcgBlACqACEALIASQAKotkStgutQGETHIjHR2PEcglUgdzKZzghUrpokYNQYNEbLJU7K8agyXI1mW1WeziJzXM02QKAMZs7rMABKAFEpQGAJqy-wohWhRAqtUarWJZLsPUG4kaHbknLsAzsDRk-R0u11B1MlrO-7dN2wZre71wWA+v2iZgAGR5AHEeUKZUio-K1rGEAWDaVtDTdLpjloTnJrdVHKXPjMfs6+ehiFWObh0FBsKJkKQYMxOyGeVLkJHlkEh+iEPPtKaEppNMUjB+1AbTYU6JZ9KY+YyEY+jJEWNr0suririyG5bmyAJusM7TYDg3qQmsR4ngAakGAYShQYYXle-Y3qiipSES+x5AUub5voppqKq6bxGo0RyFOujyAU8T6PkxZLh80HfLBm7bkhKFoRhYhYd4Z5SsRACCnaKRKfLXgEg5okqiCPtEpysckFpWJ+37sKmdAAfoMh8WkRo2C8ojoBAcASJBQmOjQcq3tplEIAAtASmSJDRnEmOw+xyMcagCe8jKrow+DeeRw5Md+phsbophTnEhyHPE2SmLF9oriJlYIdWyUxveBVRLskS4hl+IGgcbGpDIqbZGo+TmOBi5xWWMHla6nJNFVd46VkZo7PsBYpCBpy6AaxQyDougUmkU76OwmjFVBnlrn8FUcpgHper6YDdONvnKgZdByOZ8TmSY2X7PE6YGNEFqnNiFiWAVe0eeWh0uohdC1vWjbNpdFHRhNfkxKk6q6Dk5ImFOMjFMt5hrRt+hbTtC62oJ8Vle0cHiddFFhFY923BEJIlCSxxGAa+gPX+pjWfIRi3FF+OA6TTrk2Jx1uru+6HseYBU8OH5RFFxzzpc5JNazhJTbz6rYrmoGnBlGqC4NZOoBTYt0MhqCodg6EKrJsv3ncUSatkSQPWkZJmUYq0Wic5r6wctK2NYQA */
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
               
                always:[
                    {
                        target:'userPresent',
                        cond:(context)=>context.isUserLogin===true
                    },
                    {
                        target:'userNotPresent',
                    }
                ]
                
            },


            userPresent:{
                invoke:{
                    id:'getFormDetails',
                    src:(context,event)=>fetchFormDetail(context.userID),
                    onDone:{
                        target:".form",
                    },
                    onError:".failureScreen"

                },

                states: {
                    form: {
                        on: {
                            ONSUBMIT:{
                                target: "successScreen",
                            }
                        }
                        
                    },

                    failureScreen:{
                        on: {
                            RETRY: "#ProfileDetailForm.userPresent",
                        }
                    },

                    successScreen:{
                        on: {
                            LOGOUT: {
                                target:"#ProfileDetailForm.userNotPresent",
                                actions:()=> localStorage.removeItem('isLogin')
                            },
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
                                cond: ()=>{ return true},
                                actions:()=>{
                                    localStorage.setItem('isLogin','true')
                                }
                            }],
                        }
                    }
                },
                initial: "loginPage",
            }
        },

        initial: "idle"
    },
    
)
