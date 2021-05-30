"use strict";
var Aufgabe_2_5;
(function (Aufgabe_2_5) {
    const fin = document.getElementById("selectedParts");
    let newButton = document.getElementById("restart");
    let website = document.getElementById("website");
    function finishing(source) {
        console.log(source);
        console.log(fin);
        let img = document.createElement("img");
        img.setAttribute("src", source);
        console.log(img);
        fin.appendChild(img);
    }
    finishing(sessionStorage.getItem("2"));
    finishing(sessionStorage.getItem("1"));
    finishing(sessionStorage.getItem("0"));
    let restart = document.createElement("button");
    restart.id = "restart";
    restart.innerHTML = "Create new animal";
    restart.addEventListener("click", restartPage);
    newButton.appendChild(restart);
    function restartPage() {
        window.open("head.html", "_self");
    }
    async function showCache() {
        let query = new URLSearchParams(sessionStorage);
        let url = "https://gis-communication.herokuapp.com";
        url = url + "?" + query.toString();
        let serverResponse = await fetch(url);
        let awaitedResponse = await serverResponse.json();
        if (awaitedResponse.error != undefined) {
            console.log(awaitedResponse.error);
            let backDiv = document.getElementById("messageError");
            backDiv.appendChild(document.createTextNode("" + awaitedResponse.error));
        }
        else if (awaitedResponse.message != undefined) {
            console.log(awaitedResponse.message);
            let backDiv = document.getElementById("message");
            backDiv.appendChild(document.createTextNode("" + awaitedResponse.message));
        }
    }
    showCache();
    function pageOpen() {
        window.open("https://osukaylan.github.io/GIS-SoSe-2021/Aufgabe1.3.2/");
    }
    let web = document.createElement("page");
    web.innerText = "With this you get to my task 1.4 page.";
    web.addEventListener("click", pageOpen);
    website.appendChild(web);
})(Aufgabe_2_5 || (Aufgabe_2_5 = {}));
//# sourceMappingURL=errors.js.map