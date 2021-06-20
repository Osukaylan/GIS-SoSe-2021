"use strict";

    let saveButton = document.getElementById("savefeedback");
    saveButton.addEventListener("click", ClickToSaveFeedback);
    let showButton = document.getElementById("showfeedbacks");
    showButton.addEventListener("click", ClickToShowFeedback);
    let serverAnswer = document.getElementById("Feedbacks");
    //let url: string;
    let urlsearchParameters;
    function herokuURL() {
        return "https://kapitel3gissose2021.herokuapp.com/";
    }
    function getFormData() {
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        urlsearchParameters = new URLSearchParams(formData);
    }
    async function ClickToSaveFeedback() {
        let url = herokuURL();
        getFormData();
        console.log("Your shit has been saved");
        url += "/saveFeedback" + "?" + urlsearchParameters.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        serverAnswer.innerText = displayResponse;
        console.log(displayResponse);
    }
    async function ClickToShowFeedback() {
        let url = herokuURL();
        serverAnswer.innerHTML = "";
        console.log("The world..");
        url += "/showFeedback" + "?";
        let response = await fetch(url);
        let showresponse = await response.json();
        for (let i in showresponse) {
            let query = showresponse[i];
            let divvar = document.createElement("div");
            serverAnswer.appendChild(divvar);
            let userinput = document.createElement("p");
            userinput.appendChild(document.createTextNode("For business inquiries please contact " + query.u_input));
            divvar.appendChild(userinput);
            let userfeedback = document.createElement("p");
            userfeedback.appendChild(document.createTextNode(query.feedback));
            divvar.appendChild(userfeedback);
            let deleteButton = document.createElement("button");
            deleteButton.appendChild(document.createTextNode("deleteButton"));
            deleteButton.setAttribute("type", "button");
            deleteButton.addEventListener("click", ClickToDeleteFeedback);
            divvar.appendChild(deleteButton);
            async function ClickToDeleteFeedback() {
                let url = herokuURL();
                console.log("clicked");
                let mongoid = query._id;
                console.log("id: " + mongoid.toString());
                url += "/deleteFeedback" + "?_id=" + mongoid.toString();
                console.log(url);
                let response = await fetch(url);
                let showresponse = await response.text();
                serverAnswer.innerHTML = showresponse;
            }
        }
        console.log(showresponse);
    }

//# sourceMappingURL=script.js.map