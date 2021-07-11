"use strict";
//we are on admin.html
if ((document.querySelector("title").getAttribute("id") == "Admin")) {
    //display all cards with name and image once, that are in the game and can potentially occur in the game(example: more then 8 cards are in the database)
    async function showImages() {
        //establish heroku connection
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100"; //local testing
        url += "/showMeTheCards";
        let response = await fetch(url);
        let output = await response.json(); //wait for response of all cards then load
        console.log(output);
        let firstDiv = document.getElementById("showImages");
        firstDiv.innerHTML = ""; //clean the firstDiv
        for (let i = 0; i < output.length; i++) { //go through array of .length
            let div = cardData(output[i]);
            firstDiv.appendChild(div);
        }
    }
    let cardpicturesbutton = document.getElementById("showallcards");
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
    //add a new card with given Name and link to db
    async function AddCard() {
        let data = new FormData(document.forms[0]);
        //establish heroku connection
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100";  //local testing
        url += "/addNewCards";
        let query = new URLSearchParams(data);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.text();
        console.log(output);
        //reload current page
        location.reload();
    }
    let buttonAdd = document.getElementById("add");
    buttonAdd.addEventListener("click", AddCard);
    //function: removes the card with the name you have put in from the database and reload page
    async function removeCard() {
        let daten = new FormData(document.forms[1]);
        //establish heroku connection
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100"; //for local testings 
        url += "/removeCards";
        let query = new URLSearchParams(daten);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let output = await response.text();
        console.log(output);
        //reload page
        location.reload();
    }
    let buttonRemoveCard = document.getElementById("remove");
    buttonRemoveCard.addEventListener("click", removeCard);
}
//YourScpre page
else if ((document.querySelector("title").getAttribute("id") == "YourScore")) {
    let serverResponse = document.getElementById("serverresponse");
    //sets time variable to the duration that we calculated
    let time = sessionStorage.getItem("duration");
    //get element with id "time" and set the text inside to the duration we saved in variable "time"
    let scoreTime = document.getElementById("time");
    scoreTime.value = time; //save the scoretime into the time element
    //name and score(time) are input into database, data is being fetched from heroku url with /saveRun at end, then redirect to highscore page.   
    async function dataInput() {
        let data = new FormData(document.forms[0]);
        //establish heroku connection
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100"; //local test
        url += "/saveRun"; // 
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
        window.location.href = "Highscore.html"; //redirect to highscore page
    }
}
//Highscore Page
if ((document.querySelector("title").getAttribute("id") == "Highscore")) {
    //load all scores once page loads
    displayAllScores();
    //displays the scores by sorted array and calls empty function. keeps only the 10 fastest scores
    async function displayAllScores() {
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100"; //local testings
        url += "/scoreDisplay";
        let response = await fetch(url);
        let output = await response.json();
        let sortedScores = output;
        sort(sortedScores);
        empty();
        let goTo = 0;
        //if the array length of sortedScores is less then 10, set goTo to the current length of it
        if (sortedScores.length < 10) {
            goTo = sortedScores.length;
        }
        else {
            goTo = 10;
        }
        //run loop until it eaches either 10, or the current number of scores
        for (let i = 0; i < goTo; i++) {
            let rowName = document.getElementById("e" + i.toString());
            let rowTime = document.getElementById("r" + i.toString());
            let name = document.createElement("span");
            name.innerText = sortedScores[i].name + ": ";
            rowName.appendChild(name);
            let time = document.createElement("span");
            time.innerText = sortedScores[i].time.toString() + "'s";
            rowTime.appendChild(time);
        }
    }
    let scoreButton = document.getElementById("showScores");
    scoreButton.addEventListener("click", displayAllScores);
    let newGamebutton = document.getElementById("newGame");
    newGamebutton.addEventListener("click", newGame);
    //sort the scores in the array by lowest time when finished the game
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
        //Quelle: we learned this in first semester
        return _sortArray;
    }
    //empties name and time from score list, so it doesnt keep adding it next to each other when pressing refresh button
    function empty() {
        for (let i = 0; i < 10; i++) {
            let rowName = document.getElementById("e" + i);
            let rowTime = document.getElementById("r" + i);
            rowName.innerHTML = "";
            rowTime.innerHTML = "";
        }
    }
    function newGame() {
        //redirection to game.html
        window.location.href = "Game.html";
    }
}
// on the game page
if ((document.querySelector("title").getAttribute("id") == "Memory")) {
    let couples = 0;
    let _cardsAmount = 0;
    //display all card in array (up to 8 couples) once play button has been clicked.
    async function displayCards() {
        //heroku connection
        let url = "https://kapitel3gissose2021.herokuapp.com";
        //let url: RequestInfo = "http://localhost:8100"; //local test 
        url += "/showMeTheCards";
        let response = await fetch(url);
        let output = await response.json();
        console.log(output);
        let cardstoplay = [];
        //if the json has less then 8 cards, set output.length to new card amount, otherwise set it to 8 cards
        if (output.length < 8) {
            _cardsAmount = output.length;
        }
        else {
            _cardsAmount = 8;
        }
        // for each card run for loop, even if less then 8 cards, the code will run. create doublets of each card
        for (let i = 0; i < _cardsAmount; i++) {
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
        //measure time since start and save it into session
        let date = new Date();
        let timeSinceStart = date.getTime();
        sessionStorage.setItem("start", timeSinceStart.toString());
        console.log(timeSinceStart);
    }
    let playButton = document.getElementById("play");
    playButton.addEventListener("click", displayCards);
    //show the background for every the amount of given cards. if there is less then 8 couples, no extra background will be placed
    function showBackground() {
        let amountAllowed = _cardsAmount * 2;
        for (let i = 0; i < amountAllowed; i++) {
            let background = document.getElementById(i.toString());
            background.style.opacity = "100";
            background.style.color = "#99cc00";
        }
    }
    //randomize the position of all 'playable' cards on the website
    function position(_cardstoplay) {
        //Quelle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        _cardstoplay.sort(() => .5 - Math.random()); //randomly sorts the Array
        let amountAllowed = _cardsAmount * 2;
        for (let i = 0; i < amountAllowed; i++) {
            let card = cardImage(_cardstoplay[i]);
            let place = document.getElementById(i.toString()); // Yup, Tablecell is got with random position
            place.appendChild(card);
        }
    }
    //displays the image of each card, and sets its size to a fixxed value (the background image is only 300x300)
    function cardImage(_choice) {
        let image = document.createElement("img");
        image.classList.add("Card");
        image.src = _choice.imageSource;
        image.addEventListener("click", revealCard);
        image.style.opacity = "0"; //because card is still hidden
        image.style.width = "300px";
        image.style.height = "300px";
        return image;
    }
    let revealedCards = []; //save revealed cards so you can compare
    //gets called when a card(target) is clicked
    function revealCard(_e) {
        let revealed = _e.target;
        revealedCards.push(revealed);
        revealed.style.opacity = "100"; //show card
        //if the two picked cards are revealed and match, add 1 to the couples count
        if (revealedCards.length == 2) {
            if (revealedCards[0].src == revealedCards[1].src) {
                revealedCards = []; //empty the array
                couples += 1;
                //if all couples of the given card amount have been found, end the game and get the time of when game ended - when it started
                if (couples == _cardsAmount) {
                    let date2 = new Date();
                    let gameend = date2.getTime();
                    console.log(gameend);
                    let gametime = (gameend - parseInt(sessionStorage.getItem("start"))) / 1000; //divide with 1k for seconds
                    sessionStorage.setItem("duration", gametime.toString());
                    console.log(gametime);
                    window.location.href = "YourScore.html"; //redirect to score page
                    //Quelle: https://www.w3schools.com/js/js_window_location.asp
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
    //if the picked cards do not match, set opacity to 0
    function unReveal() {
        for (let i = 0; i < revealedCards.length; i++) {
            revealedCards[i].style.opacity = "0";
        }
        revealedCards = []; //empty the array again
    }
}
//# sourceMappingURL=pagescript.js.map