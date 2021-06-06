async function sendValues(): Promise<void> {

    let values: FormData = new FormData(document.forms[0]);
    console.log(": " + values.get("name"));
    let userData: FormData = new FormData(document.forms[0]);
    let url: string = "https://kapitel3gissose2021.herokuapp.com/";
    let query: URLSearchParams = new URLSearchParams(<any>userData);
    url += "?" + query.toString();
    let response: Response = await fetch(url, { method: "get" });
    let responseText: string = await response.text();
    console.log(responseText);
    showServerResponse(responseText);
}
function showServerResponse(response: string): void {
    let responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
    responseDiv.innerHTML = "Response of server: " + response;
}
let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
button.addEventListener("click", sendValues);