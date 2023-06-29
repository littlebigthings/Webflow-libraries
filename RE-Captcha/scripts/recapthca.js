function EnableRecaptcha (obj){
    let formElement = obj.formElement;
    let form = formElement.querySelector("form");
    let sitekey = obj.sitekey;
    let submitCta = form != null ? form.querySelector("[type=submit]") : null;
    let tokenCallback = obj.tokenCallback;
    let formSubmitcallback = obj.formSubmitcallback;
    let dataTosend = {};
    let options = {
        attributes: true
    }
    let observer = new MutationObserver(handleMutation.bind(this))
    
    init()

    function init() {
        checkPassedArgs();
    }

    function checkPassedArgs() {
        let allConditionsPassed = true;

        if (formElement === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass an HTML element.");
        }

        if (formSubmitcallback === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass a formSubmit callback function.");
        }
        if (tokenCallback === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass a function to get token value.");
        }

        if (!(formElement instanceof Element)) {
            allConditionsPassed = false;
            throw new Error("Passed argument is not an HTML element.");
        }

        if (typeof tokenCallback !== "function") {
            allConditionsPassed = false;
            throw new Error("Passed argument is not a function.");
        }

        if (typeof formSubmitcallback !== "function") {
            allConditionsPassed = false;
            throw new Error("Passed argument is not a function.");
        }
        if (submitCta == null) {
            allConditionsPassed = false;
            throw new Error("Please add a submit button into form.");
        }

        if (allConditionsPassed) {
            startObserver();
            addTest();
            addSubmitListener();
        }
    }

    window.tokenCallback = tokenCallback;
    
    function addTest() {
        submitCta.classList.add("g-recaptcha");
        submitCta.setAttribute("data-sitekey", sitekey);
        submitCta.setAttribute("data-callback", "tokenCallback");
        submitCta.setAttribute("data-action", "submit");
    }

    function addSubmitListener(){
        submitCta.addEventListener("click", () => {
            form.requestSubmit();
        })
    }

    function startObserver() {
        if (formElement != undefined) {
            successWrapper = formElement.querySelector(".w-form-done");
            observer.observe(successWrapper, options);
        }
    }

    function handleMutation(mutationList, observer) {
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                if (mutation.target.style.display == "block") {
                    const formData = new FormData(form);
                    for (const data of formData) {
                        dataTosend = { ...dataTosend, [data[0]]: data[1] };
                    }
                    formSubmitcallback(dataTosend);
                }
            }
        })
    }
}



// Exporting the greet function
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // Export for Node.js
    module.exports = EnableRecaptcha;
  } else {
    // Export for browser
    window.EnableRecaptcha = EnableRecaptcha;
  }