class SVGINJECT {
    constructor(images) {
        this.imageArray = images;
        this.init();
    }

    init() {
        this.checkPassedArgs();
    }

    checkPassedArgs() {
        let allConditionsPassed = true;

        if (this.imageArray === undefined) {
            allConditionsPassed = false;
            throw new Error("Please pass an Image element.");
        }

        if (this.imageArray === null) {
            allConditionsPassed = false;
            throw new Error("Please pass an Image element.");
        }

        if(this.imageArray.length==0){
            allConditionsPassed = false;
            throw new Error("Please pass an ImageArray element.");
        }

        if (allConditionsPassed) {
            this.getAllImage();
        }
    }

    getAllImage() {
        if (this.imageArray.length > 0) {
            this.imageArray.forEach(async (image) => {
                let imageSrc = image.getAttribute("src");
                if (imageSrc.length > 0) {
                    let imageCode = await this.loadImgCode(imageSrc);
                    if (imageCode != undefined) {
                        this.appendImage(imageCode, image)
                    }
                }
            })
        }
    }

    async loadImgCode(imageSrc) {
        if (imageSrc.length > 0) {
            let imageData = await fetch(imageSrc)
                .then(data => {
                    return data.text()
                })
            return imageData;
        }
    }

    appendImage(svgToAdd, image) {
        let SVGCODE = svgToAdd;
        let divToinsertSvg = document.createElement("div")

        image.classList.forEach(className => {
            divToinsertSvg.classList.add(className);
        })

        divToinsertSvg.innerHTML = SVGCODE;
        let svgInsideDiv = divToinsertSvg.querySelector("svg")

        svgInsideDiv.setAttribute("width", "100%");
        svgInsideDiv.setAttribute("height", "100%");

        image.insertAdjacentElement("beforebegin", divToinsertSvg);
        image.remove();
    }
}


const images = document.querySelectorAll("[load-as='svg']");
new SVGINJECT(images)