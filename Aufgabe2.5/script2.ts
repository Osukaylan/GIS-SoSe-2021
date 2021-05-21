namespace Aufgabe_2_5 {

    function NextPage(): void {

        if (window.location.href.includes("head.html")) {

            window.open("body.html", "_self");

        }
        if (window.location.href.includes("body.html")) {

            window.open("paws.html", "_self");

        }
        if (window.location.href.includes("paws.html")) {

            window.open("final.html", "_self");

        }
    }

    function retrieveBodyParts(): BodyPart[] {
        let bodyParts: BodyPart[];

        if (window.location.href.includes("head.html"))
            bodyParts = myObj.heads;

        if (window.location.href.includes("body.html"))
            bodyParts = myObj.bodies;

        if (window.location.href.includes("paws.html"))
            bodyParts = myObj.paws;

        return bodyParts;
    }

    function savePartToSession(imgSrc: string): void {
        
        if (window.location.href.includes("head.html")) {
            sessionStorage.setItem("0", imgSrc);
        }

        if (window.location.href.includes("body.html")) {
            sessionStorage.setItem("1", imgSrc);
        }

        if (window.location.href.includes("paws.html")) {
            sessionStorage.setItem("2", imgSrc);
        }
    }

    // show selections.
    function showPreviousSelections(): void {

        if (window.location.href.includes("body.html")) {
            let wrapperdiv: HTMLElement = document.getElementById("selectedWrapper");

            let posLeft: string = "";
            let posTop: string = "";
            posLeft = (0 * 200) + "px";
            posTop = 100 + "px";

            let img: HTMLElement = document.createElement("img");
            img.style.position = "static";
            img.style.left = posLeft;
            img.style.top = posTop;
            img.style.margin = "10px";
            img.style.height = 200 + "px";
            img.style.width = 200 + "px";
            img.style.display = "inline";
            img.setAttribute("src", sessionStorage.getItem("0"));

            wrapperdiv.appendChild(img);
        }
        if (window.location.href.includes("paws.html")) {
            let wrapperdiv: HTMLElement = document.getElementById("selectedWrapper");

            for (let i: number = 0; i < 2; i++) {
                let posLeft: string = "";
                let posTop: string = "";
                posLeft = (0 * 200) + "px";
                posTop = 100 + "px";

                let img: HTMLElement = document.createElement("img");
                img.style.position = "static";
                img.style.left = posLeft;
                img.style.top = posTop;
                img.style.margin = "10px";
                img.style.height = 200 + "px";
                img.style.width = 200 + "px";
                img.style.display = "inline";
                img.setAttribute("src", sessionStorage.getItem(i.toString()));

                wrapperdiv.appendChild(img);
            }
        }
    }

    function showFinalSelection(): void {

        let selectedWrapper: HTMLElement = document.getElementById("selectedParts");
        // Display head
        let posLeft: string = "";
        let posTop: string = "";
        posLeft = (0) + "px";
        posTop = 200 + "px";

        let img: HTMLElement = document.createElement("img");
        img.style.position = "static";
        img.style.left = posLeft;
        img.style.top = posTop;
        img.style.margin = "15px";
        img.style.height = 500 + "px";
        img.style.width = 500 + "px";
        img.setAttribute("src", sessionStorage.getItem("0"));

        img.id = "head";
        selectedWrapper.appendChild(img);

        // Display body
        posLeft = "";
        posTop = "";
        posLeft = (400) + "px";
        posTop = 200 + "px";

        img = document.createElement("img");
        img.style.position = "static";
        img.style.left = posLeft;
        img.style.top = posTop;
        img.style.margin = "15px";
        img.style.height = 500 + "px";
        img.style.width = 500 + "px";
        img.setAttribute("src", sessionStorage.getItem("1"));

        img.id = "body";
        selectedWrapper.appendChild(img);

        // Display paws

        posLeft = "";
        posTop = "";
        posLeft = (800) + "px";
        posTop = 200 + "px";

        img = document.createElement("img");
        img.style.position = "static";
        img.style.left = posLeft;
        img.style.top = posTop;
        img.style.margin = "15px";
        img.style.height = 500 + "px";
        img.style.width = 500 + "px";
        img.setAttribute("src", sessionStorage.getItem("2"));

        img.id = "paws";
        selectedWrapper.appendChild(img);
        
    }

    //showPossibilities(myObj.heads);

    function createSelections(): void {
        let previousElement: HTMLElement = document.getElementById("selectionWrapper");
        let bodyParts: BodyPart[] = retrieveBodyParts();
        for (let i: number = 0; i < bodyParts.length; i++) {

            let posLeft: string = "";
            let posTop: string = "";
            posLeft = (i * 400) + "px"; 
            posTop = 200 + "px";

            let img: HTMLElement = document.createElement("img");
            img.style.position = "static";
            img.style.left = posLeft;
            img.style.top = posTop;
            img.style.margin = "15px";
            img.style.height = 500 + "px";
            img.style.width = 500 + "px";
            img.setAttribute("src", bodyParts[i].imageSource);


            img.addEventListener("click", function (): void { savePartToSession(bodyParts[i].imageSource); });
            img.addEventListener("click", NextPage);


            img.id = bodyParts[i].imageSource;
            previousElement.appendChild(img);
        }
    }

    if (window.location.href.includes("head.html") || window.location.href.includes("body.html") || window.location.href.includes("paws.html")) {
        createSelections();
        showPreviousSelections();
    }

    if (window.location.href.includes("final.html")) {
        showFinalSelection();
    }

}