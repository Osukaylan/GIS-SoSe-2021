"use strict";
var Aufgabe_2_5;
(function (Aufgabe_2_5) {
    let fin = document.getElementById("selectionWrapper");
    function finishing(source) {
        //    const gewaehltes: EisWahl[] = waehlen();
        let img = document.createElement("img");
        img.setAttribute("src", source);
        fin.appendChild(img);
    }
    finishing(sessionStorage.getItem("0"));
    finishing(sessionStorage.getItem("1"));
    finishing(sessionStorage.getItem("2"));
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
    if (window.location.href.includes("final.html")) {
        showCache();
    }
})(Aufgabe_2_5 || (Aufgabe_2_5 = {}));
//# sourceMappingURL=errors.js.map