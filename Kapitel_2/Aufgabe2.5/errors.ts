namespace Aufgabe_2_5 {
    interface ServerMessage {
        message: string;
        error: string;

    }


    const fin: HTMLElement = document.getElementById("selectedParts");
    let newButton: HTMLElement = document.getElementById("restart");
    let website: HTMLElement = document.getElementById("website");

    function finishing(source: string): void {
        
        console.log(source);
        console.log(fin);
        let img: HTMLElement = document.createElement("img");
        img.setAttribute("src", source);
        console.log(img);
        fin.appendChild(img);


    }

    finishing(sessionStorage.getItem("2"));
    finishing(sessionStorage.getItem("1"));
    finishing(sessionStorage.getItem("0"));

    let restart: HTMLButtonElement = document.createElement("button");
    restart.id = "restart";
    restart.innerHTML = "Create new animal";
    restart.addEventListener("click", restartPage);
    newButton.appendChild(restart);


    function restartPage(): void {

        window.open("head.html", "_self");

    }

    async function showCache(): Promise<void> {


        let query: URLSearchParams = new URLSearchParams(<any>sessionStorage);
        let url: string = "https://gis-communication.herokuapp.com";
        url = url + "?" + query.toString();
        let serverResponse: Response = await fetch(url);
        let awaitedResponse: ServerMessage = await serverResponse.json();

        if (awaitedResponse.error != undefined) {

            console.log(awaitedResponse.error);
            let backDiv: HTMLElement = document.getElementById("messageError");
            backDiv.appendChild(document.createTextNode("" + awaitedResponse.error));


        } else if (awaitedResponse.message != undefined) {

            console.log(awaitedResponse.message);
            let backDiv: HTMLElement = document.getElementById("message");
            backDiv.appendChild(document.createTextNode("" + awaitedResponse.message));
        }
    }

    showCache();

    function pageOpen(): void {
        window.open("https://osukaylan.github.io/GIS-SoSe-2021/Aufgabe1.3.2/");
    }

    let web: HTMLElement = document.createElement("page");
    web.innerText = "With this you get to my task 1.4 page.";
    web.addEventListener("click", pageOpen);
    website.appendChild(web);
}