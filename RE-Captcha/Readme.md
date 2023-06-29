```javascript

const formArray = [
    {
        formElement: document.querySelector("[data-enable='recaptcha']"),
        formSubmitcallback: callbackOne,
        tokenCallback: callbackTwo,
        sitekey: "6LcSy90mAAAAABoAB0BAYofqyQHu92xzz_5nhR62",
    },
]

function callbackOne(token) {
    console.log(token)
}
function callbackTwo(formData) {
    console.log(formData)
}

formArray.forEach(formObj => {
    EnableRecaptcha(formObj)
})

```