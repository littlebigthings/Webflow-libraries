# Webflow Form Data Tracker
## _Access webflow form data after successful form submission_

A library use to run you custom function after successful form submission on webflow.

## Features
- Run user defined function after form submission.
- Provide form data after submission.

## Installation

Add the below script into the `</body>` tag of you webflow page.

```HTML
<script src="https://cdn.jsdelivr.net/gh/littlebigthings/Webflowlibraries@master/FormTracker/scripts/formSubmissionTrigger.js"></script>
```

### Now add [data-observe="form"]  into the form element of webflow.
![Alt text](https://cdn.jsdelivr.net/gh/littlebigthings/Webflowlibraries@master/FormTracker/Assets/image.png "Attribute")
![Alt text](https://cdn.jsdelivr.net/gh/littlebigthings/Webflowlibraries@master/FormTracker/Assets/image%20(1).png "Element")

## USE:-
Define your form/forms array in a variable and define your function where you want to recieve form data and run operations.

### You can use a single form element or array of elements with the custom functions which you want to execute on them.
```javascript
const formArray= [
    {
        formElement:document.querySelector("[data-observe='form']"),
        callback:callbackOne,
    },
    {
        formElement:document.querySelector("[data-observe='analytics']"),
        callback:callbackTwo,
    }
]
```

### Define your custom code

```javascript
function callbackOne(formData){
    //your own custom logic ⚙️
    
    //form data 👇🏽
    console.log(formData, "one")
}

function callbackTwo(formData){
    //your own custom logic ⚙️
    
    //form data 👇🏽
    console.log(formData, "two")
}
```

### Initiallize library
```javascript
formArray.forEach(formObj =>{
    new TRIGGERSUBMISSION(formObj)
})
```