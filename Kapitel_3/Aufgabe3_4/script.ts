import { ObjectID } from "mongodb";
import { Feedback } from "./interface";

{
    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("savefeedback");
    saveButton.addEventListener("click", ClickToSaveFeedback);
    let showButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showfeedbacks");
    showButton.addEventListener("click", ClickToShowFeedback);
    let serverAnswer: HTMLDivElement = <HTMLDivElement>document.getElementById("feedbacks");
    let url: string;
    let urlsearchParameters: URLSearchParams;

    function herokuURL(): void {
        url = "https://kapitel3gissose2021.herokuapp.com";
    }
    function getFormData(): void {
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        urlsearchParameters = new URLSearchParams(<any>formData);
    }
    async function ClickToSaveFeedback(): Promise<void> {
        herokuURL();
        getFormData();
        console.log("Your shit has been saved");
        url += "/saveFeedback" + "?" + urlsearchParameters.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverAnswer.innerText = displayResponse;
    }
    async function ClickToShowFeedback(): Promise<void> {
        herokuURL();
        serverAnswer.innerHTML = "";
        console.log("The world..");
        url += "/showFeedback" + "?";
        let response: Response = await fetch(url);
        let showresponse: Feedback[] = await response.json();
        for (let i in showresponse) {
            let query: Feedback = showresponse[i];
            let divvar: HTMLDivElement = document.createElement("div");
            serverAnswer.appendChild(divvar);
            let userinput: HTMLParagraphElement = document.createElement("p");
            userinput.appendChild(document.createTextNode("For business inquiries please contact " + query.u_input));
            divvar.appendChild(userinput);
            let userfeedback: HTMLParagraphElement = document.createElement("p");
            userfeedback.appendChild(document.createTextNode(query.feedback));
            divvar.appendChild(userfeedback);
            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.appendChild(document.createTextNode("deleteButton"));
            deleteButton.setAttribute("type", "button");
            deleteButton.addEventListener("click", ClickToDeleteFeedback);
            divvar.appendChild(deleteButton);
            async function ClickToDeleteFeedback(): Promise<void> {
                herokuURL();
                console.log("clicked");
                let mongoid: ObjectID = query._id;
                console.log("id: " + mongoid.toString());
                url += "/deleteFeedback" + "?_id=" + mongoid.toString();
                console.log(url);
                let response: Response = await fetch(url);
                let showresponse: string = await response.text();
                serverAnswer.innerHTML = showresponse;
            }
        }
        console.log(showresponse);
    }
}