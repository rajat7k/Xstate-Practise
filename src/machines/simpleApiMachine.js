import { createMachine } from "xstate";

export const callApiMachine= 
/** @xstate-layout N4IgpgJg5mDOIC5QGMCGAbdBBADgSwDo8Ix0BiAMQFEAVAYQAkBtABgF1FQcB7WPAFzzcAdpxAAPRAFoALAGYWBAGwBGAOwAmFiw0AODTLVzdAVgA0IAJ7SAnDII25Ng7vl61mgL6eLaTLkIAGW5UCDxhKDIAJSoAZQB5QIA1KgARVg4kEB4+QRExSQQpNRUCDyUWGRkbG1dajSULayKNFRMCFV01QyM2tRYlGRNvXwxsfAJg0PDImIApKjoaDLEcgSFRLMKpOXa1GxZdFRkWNVMTExY5Jtt7R2dLmSVu0zORkD9xwgpUPHQAVwATmBomB+IDLCssms8ptQIUVBUCHI2vdWoZ9GpGlZECoWDYCBiGnoGjYVBoTLpvD4QMJuCR4FlPgFVrx1vkttIMcp1FodPpDMZzDiigoNMp9kojoMVE4qjJ3syJsRSKzchsClyDAQjq9pViTGphc0pFpSrpnojjrpTBoNLVFWMApMQmEImr2XCJNJOmoCCZnCxZUGybtdDcinj7IdHM8lM8NJpEY7-BNYv9kMg4IyuGzYZqEMd2l02oiTEo9HIK9cRaa2gQ+dUjtULkpjCmvgQfn8gWAPfnOYWhjqSiYyxXdFWNDWTSo5zrLQGUf08bobNTPEA */
createMachine({
    id:'callApi',
    initial: "idel",
    states: {
        idel: {
            on: {
                FETCH: "Loading"
            }
        },

        Loading: {
            on: {
                RESOLVED: "Success",
                REJECT: "Failure"
            }
        },

        Success: {},
        Failure: {
            on: {
                Retry: "Loading"
            }
        }
    },
})