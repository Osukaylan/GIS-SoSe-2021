let url: string;

async function sendValues(): Promise<string> {

    let userData: FormData = new FormData(document.forms[0]);
    let query: URLSearchParams = new URLSearchParams(<any>userData);
    url += "?" + query.toString();
    let response: Response = await fetch(url, { method: "get" });
    let responseText: string = await response.text();
    return responseText;
}

async function showhtmlVersion(): Promise<void> {
    url = "https://kapitel3gissose2021.herokuapp.com/html";
    //url = "http://127.0.0.1:8122/html";
    console.log(await sendValues());
}

async function showjsonVersion(): Promise<void> {
    url = "https://kapitel3gissose2021.herokuapp.com/json";
    //url = "http://127.0.0.1:8122/json";
    console.log(await sendValues());
}

function showServerResponse(response: string): void {
    let responseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
    responseDiv.innerHTML = "Response of server: " + response;
}

let buttonJson: HTMLButtonElement = <HTMLButtonElement>document.getElementById("ButtonJ");
buttonJson.addEventListener("click", showjsonVersion);

let buttonHtml: HTMLButtonElement = <HTMLButtonElement>document.getElementById("ButtonH");
buttonHtml.addEventListener("click", showhtmlVersion);