import { CardInterface } from "./interface";
import { Scores } from "./interface";

let url1: string;
let urlsearchParameters: URLSearchParams;
function herokuURL(): void {
    url1 = "https://kapitel3gissose2021.herokuapp.com";
}
function getFormData(): void {
    let formData: FormData = new FormData(document.forms[0]);
    //tslint:disable-next-line: no-any
    urlsearchParameters = new URLSearchParams(<any>formData);
}
//when you are on game.html page
if ((document.querySelector("title").getAttribute("id") == "Game")) {

    let couples: number = 0;

    if (couples == 10) {
        //stop game and time, go over to YourScore page
    }



    async function create(): Promise<void> {

        herokuURL();
        getFormData();
        url1 += "/gametime" + "?" + urlsearchParameters.toString();
        let response: Response = await fetch(url1);
        let showresponse: CardInterface[] = await response.json();
        let cardstoplay: CardInterface[] = [];

        for (let i: number = 0; i < 10; i++) {
            let whichCard: number = Math.floor((Math.random() * ((showresponse.length - 1) - 0 + 1)) + 0); //zufällige Zahl (Größe des ausgabearrays) generieren lassen 
            let firstCard: CardInterface = showresponse[whichCard];
            let secondCard: CardInterface = firstCard;

            cardstoplay.push(firstCard);
            cardstoplay.push(secondCard);

            //ressource: //Src: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            //removing the card I used out of the array to prevent duplications
            showresponse.splice(whichCard, 1);
        }
        position(cardstoplay);

        //get time since start
    }
    let buttonPlay: HTMLButtonElement = <HTMLButtonElement>document.getElementById("gametime");
    buttonPlay.addEventListener("click", create);

    let ids: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    function position(_cardstoplay: CardInterface[]): void {
        for (let i: number = 0; i < 16; i++) {
            let cardPosition: number = Math.floor((Math.random() * ((ids.length - 1) + 1)) + 0);
            let card: HTMLImageElement = cardImage(_cardstoplay[cardPosition]);

            let scorePos: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.getElementById(cardPosition.toString());
            scorePos.appendChild(card);
        }

        function cardImage(_picked: CardInterface): HTMLImageElement {
            let image: HTMLImageElement = document.createElement("img");
            image.classList.add("Card");
            image.src = _picked.imageSource;
            return image;
        }
    }

    //YourScpre page
    if ((document.querySelector("title").getAttribute("id") == "YourScore")) {

        async function inputData(): Promise<void> {

            herokuURL();
            getFormData();
            url1 += "/saveFeedback" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url1);
            let showresponse: string = await response.text();
            console.log(showresponse);

        }

        let scoreButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("confirm");
        scoreButton.addEventListener("click", inputData);

    }

    //Highscore Page
    if ((document.querySelector("title").getAttribute("id") == "Highscore")) {

        async function displayAllScores(): Promise<void> {

            herokuURL();
            getFormData();
            url1 += "/saveFeedback" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url1);
            let showresponse: Scores[] = await response.json();
            console.log(showresponse);
            sort(showresponse);

            for (let i: number = 0; i < 10; i++) {
                let row: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.getElementById(i + "");
                let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                let name: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
                name.innerText = showresponse[i].name;
                div.appendChild(name);

                let time: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
                time.innerText = showresponse[i].time + "";
                div.appendChild(time);

                row.appendChild(div);
            }
        }

        let scoreButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showScores");
        scoreButton.addEventListener("click", displayAllScores);

        function sort(_sortArray: Scores[]): Scores[] {
            let height: number = _sortArray.length - 1;
            let savethissomewhere: Scores;
            for (let j: number = 1; j < height; j++) {
                for (let q: number = height - 1; q >= j; q--) {
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

        async function displayCards(): Promise<void> {

            herokuURL();
            getFormData();
            url1 += "/cardsDisplay" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url1);
            let showresponse: CardInterface[] = await response.json();
            console.log(showresponse);
            let cardDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("cardpictures");
            cardDiv.innerHTML = "";

            for (let i: number = 0; i < showresponse.length; i++) {
                let div: HTMLDivElement = cardData(showresponse[i]);
                cardDiv.appendChild(div);
            }
        }

        let cardpicturesbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("display");
        cardpicturesbutton.addEventListener("click", displayCards);

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

        async function addCard(): Promise<void> {

            herokuURL();
            getFormData();
            url1 += "/addCard" + "?" + urlsearchParameters.toString();
            let response: Response = await fetch(url1);
            let showresponse: string = await response.text();
            console.log(showresponse);

        }

        let buttonAddCard: HTMLButtonElement = <HTMLButtonElement>document.getElementById("AddCard");
        buttonAddCard.addEventListener("click", addCard);

        async function removeCard(): Promise<void> {

            herokuURL();
            let data: FormData = new FormData(document.forms[1]);
            url1 += "/loeschen";
            let query: URLSearchParams = new URLSearchParams(<any>data);
            url = url + "?" + query.toString();
            let response: Response = await fetch(url);
            let showresponse: string = await response.text();
            console.log(showresponse);

        }

        let buttonRemoveCard: HTMLButtonElement = <HTMLButtonElement>document.getElementById("RemoveCard");
        buttonRemoveCard.addEventListener("click", removeCard);
    }
}
