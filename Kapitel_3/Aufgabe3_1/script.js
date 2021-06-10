"use strict";
/*
async function sendValues(): Promise<void> {

    let values: FormData = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    for (let entry of values) {
        console.log(entry);
        console.log("name:" + entry[0]);
        console.log("value:" + entry[1]);
    }
    let query: URLSearchParams = new URLSearchParams(<any>values);
    let _url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com/";       die url aus der die daten gezogen wrden sollen
    url = url + "?" + query.toString();  //mitnehmen in auf 3.2 <-- was in die url reingeadded werden soll
    console.log(_url);
    let ant: Response = await fetch(_url);  //fetch request für antwort vom serv
    let output: string = await ant.text();  // output soll auf antwort watren
    console.log(output);
    let ret: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("output");
    ret.innerText = output;
}
let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("button"); // button erstellen
button.addEventListener("click", sendValues);           //beim klick vom button sendvalues ausführn
*/ 
//# sourceMappingURL=script.js.map