"use strict";
//we are on admin.html
if ((document.querySelector("title").getAttribute("id") == "Admin")) {
    async function showImages() {
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/showMeTheCards"; //Button anzeigen/aktualisieren gedrückt 
        //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
        //tslint:disable-next-line 
        let response = await fetch(url);
        let output = await response.json(); //hier auf Antowrt mit Daten warten 
        console.log(output);
        let firstDiv = document.getElementById("showImages");
        firstDiv.innerHTML = ""; //hier anzeigeDiv leeren bzw immmer überschreiben lassen 
        for (let i = 0; i < output.length; i++) { //Datenarray durchgehen und alle anzeigen 
            let div = cardData(output[i]);
            firstDiv.appendChild(div);
        }
    }
    let cardpicturesbutton = document.getElementById("showallcards"); //Button machen auf Admin
    cardpicturesbutton.addEventListener("click", showImages);
    function cardData(_cardo) {
        let cardo = document.createElement("div");
        cardo.classList.add("cardpicturedata");
        let image = document.createElement("img");
        image.src = _cardo.imageSource;
        cardo.appendChild(image);
        let namexd = document.createElement("p");
        namexd.innerText = _cardo.name;
        cardo.appendChild(namexd);
        return cardo;
    }
    async function AddCard() {
        let data = new FormData(document.forms[0]);
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/addNewCards"; //Button hinzufügen gedrückt 
        //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
        //tslint:disable-next-line 
        let query = new URLSearchParams(data);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.text();
        console.log(output);
        //reload current page
        location.reload();
    }
    let buttonHinzu = document.getElementById("add"); //Button machen auf Admin
    buttonHinzu.addEventListener("click", AddCard);
    async function removeCard() {
        let daten = new FormData(document.forms[1]);
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/removeCards"; //Button löschen gedrückt 
        //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
        //tslint:disable-next-line 
        let query = new URLSearchParams(daten);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.text();
        console.log(output);
        //reload page
        location.reload();
    }
    let buttonRemoveCard = document.getElementById("remove"); //Button machen auf Admin
    buttonRemoveCard.addEventListener("click", removeCard);
}
//YourScpre page
else if ((document.querySelector("title").getAttribute("id") == "YourScore")) {
    let serverResponse = document.getElementById("serverresponse");
    let time = sessionStorage.getItem("time");
    let scoreTime = document.getElementById("time");
    scoreTime.value = time; //gespeicherte Spielzeit in inputfeld speichern und dann in Anfrage übergeben
    async function dataInput() {
        let data = new FormData(document.forms[0]);
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/saveRun"; //Button bestaetigen gedrückt 
        //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
        //tslint:disable-next-line 
        let query = new URLSearchParams(data);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.text();
        serverResponse.innerHTML = output;
        setTimeout(redirection, 1800);
        //Quelle: https://www.w3schools.com/js/js_timing.asp
    }
    let buttonScore = document.getElementById("confirm");
    buttonScore.addEventListener("click", dataInput);
    function redirection() {
        window.location.href = "Highscore.html"; //Weiterleitung auf Highscoreseite
    }
}
//Highscore Page
if ((document.querySelector("title").getAttribute("id") == "Highscore")) {
    async function displayAllScores() {
        let data = new FormData(document.forms[0]);
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/scoreDisplay"; //Button bestaetigen gedrückt 
        //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
        //tslint:disable-next-line 
        let query = new URLSearchParams(data);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.json();
        let sortedScores = output;
        sort(sortedScores);
        empty();
        for (let i = 0; i < 10; i++) {
            let rowName = document.getElementById(i + "e");
            let rowTime = document.createElement(i + "r");
            let name = document.createElement("span");
            name.innerText = sortedScores[i].name + ": ";
            rowName.appendChild(name);
            let time = document.createElement("span");
            time.innerText = sortedScores[i].time + " s";
            rowTime.appendChild(time);
        }
    }
    let scoreButton = document.getElementById("showScores");
    scoreButton.addEventListener("click", displayAllScores);
    let newGamebutton = document.getElementById("newGame");
    newGamebutton.addEventListener("click", newGame);
    function sort(_sortArray) {
        let savethissomewhere;
        for (let j = 1; j < _sortArray.length; j++) {
            for (let q = _sortArray.length - 1; q >= j; q--) {
                if (parseInt(_sortArray[q - 1].time) > parseInt(_sortArray[q].time)) {
                    savethissomewhere = _sortArray[q - 1];
                    _sortArray[q - 1] = _sortArray[q];
                    _sortArray[q] = savethissomewhere;
                }
            }
        }
        //Quelle: Semester eins in programmieren
        return _sortArray;
    }
    function empty() {
        for (let i = 0; i < 10; i++) {
            let rowName = document.getElementById("e" + i);
            let rowTime = document.getElementById("r" + i);
            rowName.innerHTML = "";
            rowTime.innerHTML = "";
        }
    }
    function newGame() {
        window.location.href = "Spiel.html"; //Weiterleitung auf Spielseite
    }
}
// on the game page
if ((document.querySelector("title").getAttribute("id") == "Memory")) {
    let couples = 0;
    async function displayCards() {
        let url = "https://kapitel3gissose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
        //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
        url += "/memorygame"; //Button bestaetigen gedrückt 
        let response = await fetch(url);
        let output = await response.json();
        console.log(output);
        let cardstoplay = [];
        for (let i = 0; i < 10; i++) {
            let whichCard = Math.floor((Math.random() * ((output.length - 1) - 0 + 1)) + 0); //generate a random number inside scope of array length
            let firstCard = output[whichCard];
            let secondCard = firstCard;
            cardstoplay.push(firstCard);
            cardstoplay.push(secondCard);
            //Quelle: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            //removing the card I used out of the array to prevent duplications
            output.splice(whichCard, 1);
        }
        showBackground();
        position(cardstoplay);
        //measure time since start
        let date = new Date();
        let timeSinceStart = date.getTime();
        sessionStorage.setItem("start", timeSinceStart.toString());
        console.log(timeSinceStart);
    }
    let playButton = document.getElementById("play");
    playButton.addEventListener("click", displayCards);
    function showBackground() {
        for (let i = 1; i < 17; i++) {
            let background = document.getElementById(i + "");
            background.style.opacity = "100";
        }
    }
    function position(_cardstoplay) {
        //Quelle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        _cardstoplay.sort(() => .5 - Math.random()); //randomly sorts the Array
        for (let i = 1; i < 17; i++) {
            let card = cardImage(_cardstoplay[i]);
            let place = document.getElementById(i + ""); //Tablecell is got with random position
            place.appendChild(card);
        }
    }
    function cardImage(_choice) {
        let image = document.createElement("img");
        image.classList.add("Card");
        image.src = _choice.imageSource;
        image.addEventListener("click", revealCard);
        image.style.opacity = "0"; //because card is still hidden
        return image;
    }
    let revealedCards = []; //save revealed cards so you can compare
    function revealCard(_e) {
        let revealed = _e.target;
        revealedCards.push(revealed);
        revealed.style.opacity = "100"; //show card
        if (revealedCards.length == 2) {
            if (revealedCards[0].src == revealedCards[1].src) {
                revealedCards = []; //empty array
                couples += 1;
                if (couples == 8) {
                    let date2 = new Date();
                    let gameend = date2.getTime();
                    console.log(gameend);
                    let gametime = (gameend - parseInt(sessionStorage.getItem("start"))) / 1000; //divide 1k for seconds
                    sessionStorage.setItem("duration", gametime.toString());
                    console.log(gametime);
                    window.location.href = "YourScore.html"; //redirect to score page
                    //https://www.w3schools.com/js/js_window_location.asp
                }
            }
            else {
                setTimeout(unReveal, 1000);
                //https://www.w3schools.com/js/js_timing.asp
            }
        }
        else if (revealedCards.length > 2) {
            unReveal();
        }
    }
    function unReveal() {
        for (let i = 0; i < revealedCards.length; i++) {
            revealedCards[i].style.opacity = "0";
        }
        revealedCards = []; //empty array again
    }
}
//# sourceMappingURL=pagescript.js.map