"use strict";
let url;
async function sendValues() {
    let values = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    let userData = new FormData(document.forms[0]);
    let query = new URLSearchParams(userData);
    url += "?" + query.toString();
    let response = await fetch(url, { method: "get" });
    let responseText = await response.text();
    return responseText;
}
async function showhtmlVersion() {
    url = "https://kapitel3gissose2021.herokuapp.com/html";
    console.log(await sendValues());
}
async function showjsonVersion() {
    url = "https://kapitel3gissose2021.herokuapp.com/json";
    console.log(await sendValues());
}
function showServerResponse(response) {
    let responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Response of server: " + response;
}
let buttonJson = document.getElementById("ButtonJ");
buttonJson.addEventListener("click", showjsonVersion);
let buttonHtml = document.getElementById("ButtonH");
buttonHtml.addEventListener("click", showhtmlVersion);
//# sourceMappingURL=script.js.map