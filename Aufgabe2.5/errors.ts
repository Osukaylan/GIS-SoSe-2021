namespace Aufgabe_2_5 {
    interface ServerMessage {
        message: string;
        error: string;

    }


    let fin: HTMLElement = document.getElementById("selectionWrapper");

    function finishing(source: string): void {
        //    const gewaehltes: EisWahl[] = waehlen();

        let img: HTMLElement = document.createElement("img");
        img.setAttribute("src", source);
        fin.appendChild(img);


    }
    finishing(sessionStorage.getItem("0"));
    finishing(sessionStorage.getItem("1"));
    finishing(sessionStorage.getItem("2"));

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

    if (window.location.href.includes("final.html")) {

        showCache();

    }
}