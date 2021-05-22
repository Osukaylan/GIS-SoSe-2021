"use strict";
var Aufgabe_2_5;
(function (Aufgabe_2_5) {
    /*function FetchJSON(): AllParts {
                
        const fetchPromise = fetch("https://raw.githubusercontent.com/Osukaylan/GIS-SoSe-2021/main/Aufgabe2.5/data.json");
        fetchPromise.then(response => {
        console.log(response);
        response.json();


        });

        var parsedFile: AllParts = JSON.parse(theResponseJsonVar);

        return parsedFile;
    }*/
    //2 functions to deal with success or error
    function NextPage() {
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
    function retrieveBodyParts(allParts) {
        let type = allParts.heads;
        if (window.location.href.includes("head.html"))
            type = allParts.heads;
        if (window.location.href.includes("body.html"))
            type = allParts.bodies;
        if (window.location.href.includes("paws.html"))
            type = allParts.paws;
        return type;
    }
    async function fetchJSON(_url) {
        let antwort = await fetch(_url);
        let data = await antwort.json();
        console.log("Response", data);
        let chose = retrieveBodyParts(data);
        createSelections(chose);
    }
    fetchJSON("data.json");
    function savePartToSession(imgSrc) {
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
    function showPreviousSelections() {
        if (window.location.href.includes("body.html")) {
            let wrapperdiv = document.getElementById("selectedWrapper");
            let posLeft = "";
            let posTop = "";
            posLeft = (0 * 200) + "px";
            posTop = 100 + "px";
            let img = document.createElement("img");
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
            let wrapperdiv = document.getElementById("selectedWrapper");
            for (let i = 0; i < 2; i++) {
                let posLeft = "";
                let posTop = "";
                posLeft = (0 * 200) + "px";
                posTop = 100 + "px";
                let img = document.createElement("img");
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
    function showFinalSelection() {
        let selectedWrapper = document.getElementById("selectedParts");
        // Display head
        let posLeft = "";
        let posTop = "";
        posLeft = (0) + "px";
        posTop = 200 + "px";
        let img = document.createElement("img");
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
    /*function createSelections(): void {
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
    }*/
    function createSelections(_chosen) {
        let previousElement = document.getElementById("selectionWrapper");
        for (let i = 0; i < _chosen.length; i++) {
            let img = document.createElement("img");
            img.setAttribute("src", _chosen[i].name);
            img.addEventListener("click", function () { savePartToSession(_chosen[i].imageSource); });
            img.addEventListener("click", NextPage);
            img.id = _chosen[i].imageSource;
            previousElement.appendChild(img);
        }
    }
    if (window.location.href.includes("head.html") || window.location.href.includes("body.html") || window.location.href.includes("paws.html")) {
        showPreviousSelections();
    }
    if (window.location.href.includes("final.html")) {
        showFinalSelection();
    }
})(Aufgabe_2_5 || (Aufgabe_2_5 = {}));
//# sourceMappingURL=script2.js.map