import { createMachine } from "xstate";

export const LoginMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBkD2UCWA7AdBiANmAMQAqASgJrIDyA4gJIByA2gAwC6ioADqrBgAuGVFm4gAHogC0AJgCMAdhxs2AZgAsithvnyArGsUAOYwBoQATxmKAnDgBs847bW2tbYxrb7FAXz8LNExcAEMAV0EACzAsYQBjUMESdi4kED4BYVFxKQR5dRxTNiVvB2N9B1l9cysbYxw1Y0V5B1tZRSa2B0VZAKD0bBwI6NiEpJT5NN5+IRExdLzTHDKHfVkNdbYNjVkLawRlNW3PNUNNNQddNX6QYKGAZQwoLHCeMipaRiYAQTof5ipcSZOY5RYyVoNbxqDZXWSmY6GfaIZxqHC2YzOVpnWTuXT6W73XBPF5vD7UejMP4A1hTYGzbILUB5aSQlbqWG7BE+NTIhAdWQrTZnWz6TZtNYBQIgLCoCBwcRE+lZea5GTeQVsVyKJwGTRanx81k9FQYgqKbRNUy2ByEwa4fBEZWgpmSGRnDSmoy6wzeWyGuoIaRrHDORT6Eq9IwW3Z2kLDSIxOIYRLJZ2MtVBwyOG3VLz6UUFKpG7TohS7DFsXoaKoaOOPcLxeJweDpEEZ8EINz2eTtAs2jTeC3GBwlwWtDS2XsabsT-zSok4EmvHjp1Wd+Q19Ezm22StrKujwOo9HlOz6fS9rWxqVAA */
    createMachine({
        id: 'Login',
        initial: 'idle',
        states: {
            idle: {
                on: {
                    TRYLOGIN: {
                        target:'authenticate',
                        actions:'FetchUser'
                    }
                }
            },

            authenticate: {
                always: [{
                    target: "Success",
                    cond:{
                        type: "verifyUser"
                    }
                }, "Signup"]
            },

            Success: {
                type: "final"
            },

            Signup: {
                on: {
                    TRYLOGINAGAIN: [{
                        target: "idle",
                        cond: "ValidDetails"
                    }, "Signup"]
                }
            }
        }
    },
        {
            guards: {
                verifyUser:(context,event)=>{

                }
            },
            actions:{
                FetchUser:(context,event)=>{

                }
            }
        }
    )