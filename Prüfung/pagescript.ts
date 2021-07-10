

    //we are on admin.html

    if ((document.querySelector("title").getAttribute("id") == "Admin")) {

        interface CardInterface {
            name: string;
            imageSource: string;
        }

        async function showImages(): Promise<void> {
            //establish heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com"; 
            //let url: RequestInfo = "http://localhost:8100"; //local testing
            url += "/showMeTheCards"; 
            let response: Response = await fetch(url);
            let output: CardInterface[] = await response.json(); //wait for response of all cards then load
            console.log(output);


            let firstDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("showImages");
            firstDiv.innerHTML = ""; //clean the firstDiv

            for (let i: number = 0; i < output.length; i++) { //go through array of .length
                let div: HTMLDivElement = cardData(output[i]);
                firstDiv.appendChild(div);
            }
        }

        let cardpicturesbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showallcards");
        cardpicturesbutton.addEventListener("click", showImages);

        function cardData(_cardo: CardInterface): HTMLDivElement {
            let cardo: HTMLDivElement = document.createElement("div");
            cardo.classList.add("cardpicturedata");
            let image: HTMLImageElement = document.createElement("img");
            image.src = _cardo.imageSource;
            cardo.appendChild(image);
            let namexd: HTMLParagraphElement = document.createElement("p");
            namexd.innerText = _cardo.name;
            cardo.appendChild(namexd);

            return cardo;
        }


        async function AddCard(): Promise<void> { 
            let data: FormData = new FormData(document.forms[0]);
            //establish heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com";
            //let url: RequestInfo = "http://localhost:8100";  //local testing
            url += "/addNewCards"; 
            let query: URLSearchParams = new URLSearchParams(<any>data);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let output: string = await response.text();
            console.log(output);
            //reload current page
            location.reload();

        }

        let buttonHinzu: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add");
        buttonHinzu.addEventListener("click", AddCard);

        async function removeCard(): Promise<void> { 
            let daten: FormData = new FormData(document.forms[1]);
            //establish heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com";
            //let url: RequestInfo = "http://localhost:8100"; //for local testings 
            url += "/removeCards";
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let output: string = await response.text();
            console.log(output);
            //reload page
            location.reload();

        }

        let buttonRemoveCard: HTMLButtonElement = <HTMLButtonElement>document.getElementById("remove"); 
        buttonRemoveCard.addEventListener("click", removeCard);

    }

    //YourScpre page
    else if ((document.querySelector("title").getAttribute("id") == "YourScore")) {

        let serverResponse: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("serverresponse");
        let time: string = sessionStorage.getItem("duration");

        let scoreTime: HTMLInputElement = <HTMLInputElement>document.getElementById("duration");
        scoreTime.value = time; //save the scoretime into the time element


        async function dataInput(): Promise<void> { //name and score are input into database
            let data: FormData = new FormData(document.forms[0]);
            //establish heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com"; 
            //let url: RequestInfo = "http://localhost:8100"; //local test
            url += "/saveRun"; // 

            let query: URLSearchParams = new URLSearchParams(<any>data);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let output: string = await response.text();
            serverResponse.innerHTML = output;

            setTimeout(redirection, 1800);
            //Quelle: https://www.w3schools.com/js/js_timing.asp

        }

        let buttonScore: HTMLButtonElement = <HTMLButtonElement>document.getElementById("confirm");
        buttonScore.addEventListener("click", dataInput);

        function redirection(): void {
            window.location.href = "Highscore.html"; //redirect to highscore page
        }


    }

    //Highscore Page
    if ((document.querySelector("title").getAttribute("id") == "Highscore")) {

        interface Scores {
            name: string;
            time: string;
        }

        async function displayAllScores(): Promise<void> {

            let data: FormData = new FormData(document.forms[0]);
            //hestablish heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com";
            //let url: RequestInfo = "http://localhost:8100"; //local testings
            url += "/scoreDisplay"; 
            let query: URLSearchParams = new URLSearchParams(<any>data);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let output: Scores[] = await response.json();

            let sortedScores: Scores[] = output;

            sort(sortedScores);
            empty();

            for (let i: number = 0; i < 10; i++) {
                let rowName: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.getElementById(i + "e");
                let rowTime: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.createElement(i + "r");
                let name: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
                name.innerText = sortedScores[i].name + ": ";
                rowName.appendChild(name);

                let time: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
                time.innerText = sortedScores[i].time + " s";
                rowTime.appendChild(time);
            }
        }

        let scoreButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showScores");
        scoreButton.addEventListener("click", displayAllScores);
        let newGamebutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("newGame");
        newGamebutton.addEventListener("click", newGame);

        function sort(_sortArray: Scores[]): Scores[] {
            let savethissomewhere: Scores;
            for (let j: number = 1; j < _sortArray.length; j++) {
                for (let q: number = _sortArray.length - 1; q >= j; q--) {
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
        function empty(): void {
            for (let i: number = 0; i < 10; i++) { 
                let rowName: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("e" + i); 
                let rowTime: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("r" + i);

                rowName.innerHTML = "";
                rowTime.innerHTML = "";

            }
        }

        function newGame(): void {
            //redirection to game.html
            window.location.href = "Game.html"; 
        }

    }

    // on the game page
    if ((document.querySelector("title").getAttribute("id") == "Memory")) {

        let couples: number = 0;

        async function displayCards(): Promise<void> {
            //heroku connection
            let url: RequestInfo = "https://kapitel3gissose2021.herokuapp.com"; 
            //let url: RequestInfo = "http://localhost:8100"; //local test 
            url += "/memorygame";
            let response: Response = await fetch(url);
            let output: CardInterface[] = await response.json();
            console.log(output);

            let cardstoplay: CardInterface[] = [];

            for (let i: number = 0; i < 8; i++) {
                let whichCard: number = Math.floor((Math.random() * ((output.length - 1) - 0 + 1)) + 0); //generate a random number inside scope of array length
                let firstCard: CardInterface = output[whichCard];
                let secondCard: CardInterface = firstCard;

                cardstoplay.push(firstCard);
                cardstoplay.push(secondCard);
                //Quelle: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                //removing the card I used out of the array to prevent duplications
                output.splice(whichCard, 1);
            }

            showBackground();
            position(cardstoplay);

            //measure time since start
            let date: Date = new Date();
            let timeSinceStart: number = date.getTime();
            sessionStorage.setItem("start", timeSinceStart.toString());
            console.log(timeSinceStart);
        }

        let playButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("play");
        playButton.addEventListener("click", displayCards);

        function showBackground(): void {
            for (let i: number = 0; i < 16; i++) {
                let background: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.getElementById(i.toString());
                background.style.opacity = "100";
                background.style.color = "#99cc00";
            }
        }

        function position(_cardstoplay: CardInterface[]): void {

            //Quelle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            _cardstoplay.sort(() => .5 - Math.random()); //randomly sorts the Array

            for (let i: number = 0; i < 16; i++) {
                let card: HTMLImageElement = cardImage(_cardstoplay[i]);
                let place: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.getElementById(i.toString()); // Yup, Tablecell is got with random position
                place.appendChild(card);
            }
        }


        function cardImage(_choice: CardInterface): HTMLImageElement {

            let image: HTMLImageElement = document.createElement("img");
            image.classList.add("Card");
            image.src = _choice.imageSource;
            image.addEventListener("click", revealCard);
            image.style.opacity = "0"; //because card is still hidden

            return image;
        }

        let revealedCards: HTMLImageElement[] = []; //save revealed cards so you can compare

        function revealCard(_e: Event): void {
            let revealed: HTMLImageElement = <HTMLImageElement>_e.target;
            revealedCards.push(revealed);
            revealed.style.opacity = "100"; //show card

            if (revealedCards.length == 2) {
                if (revealedCards[0].src == revealedCards[1].src) {
                    revealedCards = []; //empty the array
                    couples += 1;

                    if (couples == 8) {
                        let date2: Date = new Date();
                        let gameend: number = date2.getTime();
                        console.log(gameend);

                        let gametime: number = (gameend - parseInt(sessionStorage.getItem("start"))) / 1000; //divide with 1k for seconds
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

        function unReveal(): void {
            for (let i: number = 0; i < revealedCards.length; i++) {
                revealedCards[i].style.opacity = "0";
            }
            revealedCards = []; //empty the array again
        }
        interface CardInterface {
            name: string;
            imageSource: string;
        }


    }
