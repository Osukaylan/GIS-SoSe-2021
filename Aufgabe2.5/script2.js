"use strict";
var Aufgabe_2_5;
(function (Aufgabe_2_5) {
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
    function retrieveBodyParts() {
        let bodyParts;
        if (window.location.href.includes("head.html"))
            bodyParts = myObj.heads;
        if (window.location.href.includes("body.html"))
            bodyParts = myObj.bodies;
        if (window.location.href.includes("paws.html"))
            bodyParts = myObj.paws;
        return bodyParts;
    }
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
    function createSelections() {
        let previousElement = document.getElementById("selectionWrapper");
        let bodyParts = retrieveBodyParts();
        for (let i = 0; i < bodyParts.length; i++) {
            let posLeft = "";
            let posTop = "";
            posLeft = (i * 400) + "px";
            posTop = 200 + "px";
            let img = document.createElement("img");
            img.style.position = "static";
            img.style.left = posLeft;
            img.style.top = posTop;
            img.style.margin = "15px";
            img.style.height = 500 + "px";
            img.style.width = 500 + "px";
            img.setAttribute("src", bodyParts[i].imageSource);
            img.addEventListener("click", function () { savePartToSession(bodyParts[i].imageSource); });
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
})(Aufgabe_2_5 || (Aufgabe_2_5 = {}));
//# sourceMappingURL=script2.js.map