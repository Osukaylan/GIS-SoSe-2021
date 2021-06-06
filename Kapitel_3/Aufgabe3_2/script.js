"use strict";
async function sendValues() {
    let values = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    let userData = new FormData(document.forms[0]);
    let url = "https://kapitel3gissose2021.herokuapp.com/";
    let query = new URLSearchParams(userData);
    url += "?" + query.toString();
    let response = await fetch(url, { method: "get" });
    let responseText = await response.text();
    console.log(responseText);
    showServerResponse(responseText);
}
function showServerResponse(response) {
    let responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Response of server: " + response;
}
let button = document.getElementById("button");
button.addEventListener("click", sendValues);
//# sourceMappingURL=script.js.map