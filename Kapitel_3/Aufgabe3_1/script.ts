async function sendValues(): Promise<void> {

    let values: FormData = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    for (let entry of values) {
        console.log(entry);
        console.log("name:" + entry[0]);
        console.log("value:" + entry[1]);
    }
    let query: URLSearchParams = new URLSearchParams(<any>values);
    let _url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com/";
    _url = _url + "?" + query.toString();
    console.log(_url);
    let ant: Response = await fetch(_url);
    let output: string = await ant.text();
    console.log(output);
    let ret: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("output");
    ret.innerText = output;   
}
let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("button");
button.addEventListener("click", sendValues);