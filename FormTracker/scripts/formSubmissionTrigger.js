class TRIGGERSUBMISSION {
    constructor(obj) {
        this.formElement = obj.formElement;
        this.form = this.formElement.querySelector("form");
        this.callback = obj.callback;
        this.dataTosend = {};
        this.options = {
            attributes: true
        }
        this.observer = new MutationObserver(this.handleMutation.bind(this))
        this.init();
    }
    init() {
        this.checkPassedArgs();
    }

    checkPassedArgs() {
        let allConditionsPassed = true;
      
        if (this.formElement === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass an HTML element.");
        }
        
        if (this.callback === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass a function.");
        }
        
        if (!(this.formElement instanceof Element)) {
            allConditionsPassed = false;
            throw new Error("Passed argument is not an HTML element.");
        }
        
        if (typeof this.callback !== "function") {
            allConditionsPassed = false;
            throw new Error("Passed argument is not a function.");
        }
              
        if (allConditionsPassed) {
          this.startObserver();
        }
      }
      
    startObserver() {
        if (this.formElement != undefined) {
            this.successWrapper = this.formElement.querySelector(".w-form-done");
            this.observer.observe(this.successWrapper, this.options);
        }
    }

    handleMutation(mutationList, observer) {
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                if (mutation.target.style.display == "block") {
                    const formData = new FormData(this.form);
                    for (const data of formData) {
                        this.dataTosend = {...this.dataTosend, [data[0]]: data[1]};
                      }
                    this.callback(this.dataTosend);
                }
            }
        })
    }
}

module.exports = TRIGGERSUBMISSION;