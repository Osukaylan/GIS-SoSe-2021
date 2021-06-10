"use strict";
let url; //pre declare url
async function sendValues() {
    let userData = new FormData(document.forms[0]);
    let query = new URLSearchParams(userData);
    url += "?" + query.toString();
    let response = await fetch(url, { method: "get" });
    let responseText = await response.text();
    return responseText;
}
async function showhtmlVersion() {
    url = "https://kapitel3gissose2021.herokuapp.com/html";
    //url = "http://127.0.0.1:8122/html";
    console.log(await sendValues());
    showServerResponse(await sendValues()); //execute showserverresponse on button click so html shows on website
}
async function showjsonVersion() {
    url = "https://kapitel3gissose2021.herokuapp.com/json";
    //url = "http://127.0.0.1:8122/json";
    console.log(await sendValues());
}
function showServerResponse(response) {
    let responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Response of server: " + response;
}
let buttonJson = document.getElementById("ButtonJ"); //give buttonJ with event click to execute showjsonVersion on click
buttonJson.addEventListener("click", showjsonVersion);
let buttonHtml = document.getElementById("ButtonH"); //give buttonH with event click to execute showhtmlVersion on click
buttonHtml.addEventListener("click", showhtmlVersion);
//# sourceMappingURL=script.js.map