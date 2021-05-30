"use strict";
async function sendValues() {
    let values = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    for (let entry of values) {
        console.log(entry);
        console.log("name:" + entry[0]);
        console.log("value:" + entry[1]);
    }
    let query = new URLSearchParams(values);
    let _url = "https://kapitel3gissose2021.herokuapp.com/";
    _url = _url + "?" + query.toString();
    console.log(_url);
    let ant = await fetch(_url);
    let output = await ant.text();
    console.log(output);
    let ret = document.getElementById("output");
    ret.innerText = output;
}
let button = document.getElementById("btn");
button.addEventListener("click", sendValues);
//# sourceMappingURL=script.js.map