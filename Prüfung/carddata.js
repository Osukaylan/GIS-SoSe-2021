"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
let url1;
let urlsearchParameters;
function herokuURL() {
    url1 = "https://kapitel3gissose2021.herokuapp.com";
}
function getFormData() {
    let formData = new FormData(document.forms[0]);
    //tslint:disable-next-line: no-any
    urlsearchParameters = new URLSearchParams(formData);
}
//when you are on game.html page
if ((document.querySelector("title").getAttribute("id") == "Game")) {
    let couples = 0;
    if (couples == 10) {
        //stop game and time, go over to YourScore page
    }
    async function create() {
        herokuURL();
        getFormData();
        url1 += "/gametime" + "?" + urlsearchParameters.toString();
        let response = await fetch(url1);
        let showresponse = await response.json();
        let cardstoplay = [];
        for (let i = 0; i < 10; i++) {
            let whichCard = Math.floor((Math.random() * ((showresponse.length - 1) - 0 + 1)) + 0); //zufällige Zahl (Größe des ausgabearrays) generieren lassen 
            let firstCard = showresponse[whichCard];
            let secondCard = firstCard;
            cardstoplay.push(firstCard);
            cardstoplay.push(secondCard);
            //ressource: //Src: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            //removing the card I used out of the array to prevent duplications
            showresponse.splice(whichCard, 1);
        }
        position(cardstoplay);
        //get time since start
    }
    let buttonPlay = document.getElementById("gametime");
    buttonPlay.addEventListener("click", create);
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    function position(_cardstoplay) {
        for (let i = 0; i < 16; i++) {
            let cardPosition = Math.floor((Math.random() * ((ids.length - 1) + 1)) + 0);
            let card = cardImage(_cardstoplay[cardPosition]);
            let scorePos = document.getElementById(cardPosition.toString());
            scorePos.appendChild(card);
        }
        function cardImage(_picked) {
            let image = document.createElement("img");
            image.classList.add("Card");
            image.src = _picked.imageSource;
            return image;
        }
    }
    //YourScpre page
    if ((document.querySelector("title").getAttribute("id") == "YourScore")) {
        async function inputData() {
            herokuURL();
            getFormData();
            url1 += "/saveFeedback" + "?" + urlsearchParameters.toString();
            let response = await fetch(url1);
            let showresponse = await response.text();
            console.log(showresponse);
        }
        let scoreButton = document.getElementById("confirm");
        scoreButton.addEventListener("click", inputData);
    }
    //Highscore Page
    if ((document.querySelector("title").getAttribute("id") == "Highscore")) {
        async function displayAllScores() {
            herokuURL();
            getFormData();
            url1 += "/saveFeedback" + "?" + urlsearchParameters.toString();
            let response = await fetch(url1);
            let showresponse = await response.json();
            console.log(showresponse);
            sort(showresponse);
            for (let i = 0; i < 10; i++) {
                let row = document.getElementById(i + "");
                let div = document.createElement("div");
                let name = document.createElement("span");
                name.innerText = showresponse[i].name;
                div.appendChild(name);
                let time = document.createElement("span");
                time.innerText = showresponse[i].time + "";
                div.appendChild(time);
                row.appendChild(div);
            }
        }
        let scoreButton = document.getElementById("showScores");
        scoreButton.addEventListener("click", displayAllScores);
        function sort(_sortArray) {
            let height = _sortArray.length - 1;
            let savethissomewhere;
            for (let j = 1; j < height; j++) {
                for (let q = height - 1; q >= j; q--) {
                    if (_sortArray[q - 1].time > _sortArray[q].time) {
                        savethissomewhere = _sortArray[q - 1];
                        _sortArray[q - 1] = _sortArray[q];
                        _sortArray[q] = savethissomewhere;
                    }
                }
            }
            return _sortArray;
        }
    }
    //on admin.html
    if ((document.querySelector("title").getAttribute("id") == "Admin")) {
        async function displayCards() {
            herokuURL();
            getFormData();
            url1 += "/cardsDisplay" + "?" + urlsearchParameters.toString();
            let response = await fetch(url1);
            let showresponse = await response.json();
            console.log(showresponse);
            let cardDiv = document.getElementById("cardpictures");
            cardDiv.innerHTML = "";
            for (let i = 0; i < showresponse.length; i++) {
                let div = cardData(showresponse[i]);
                cardDiv.appendChild(div);
            }
        }
        let cardpicturesbutton = document.getElementById("display");
        cardpicturesbutton.addEventListener("click", displayCards);
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
        async function addCard() {
            herokuURL();
            getFormData();
            url1 += "/addCard" + "?" + urlsearchParameters.toString();
            let response = await fetch(url1);
            let showresponse = await response.text();
            console.log(showresponse);
        }
        let buttonAddCard = document.getElementById("AddCard");
        buttonAddCard.addEventListener("click", addCard);
        async function removeCard() {
            herokuURL();
            let data = new FormData(document.forms[1]);
            url1 += "/loeschen";
            let query = new URLSearchParams(data);
            url = url + "?" + query.toString();
            let response = await fetch(url);
            let showresponse = await response.text();
            console.log(showresponse);
        }
        let buttonRemoveCard = document.getElementById("RemoveCard");
        buttonRemoveCard.addEventListener("click", removeCard);
    }
}
//# sourceMappingURL=carddata.js.map