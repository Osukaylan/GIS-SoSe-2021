namespace Endabgabe {

    //auf welcher Seite befinde ich mich --> wo brauche ich welche Funktionen?

    //Admin.html
    if ((document.querySelector("title").getAttribute("id") == "Admin" )) {

        async function anzeigeBilder(): Promise<void> {
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/kartenAnzeigen"; //Button anzeigen/aktualisieren gedrückt 
            
            //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let antwort: Response = await fetch(url);
            let ausgabe: Memorykarte[] = await antwort.json(); //hier auf Antowrt mit Daten warten 
            console.log(ausgabe); 
            

            let anzeigeDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("bildanzeige");
            anzeigeDiv.innerHTML = ""; //hier anzeigeDiv leeren bzw immmer überschreiben lassen 

            for (let i: number = 0; i < ausgabe.length; i++) { //Datenarray durchgehen und alle anzeigen 
                let div: HTMLDivElement = bildkarteInfos(ausgabe[i]); 
                anzeigeDiv.appendChild(div);
            }
        }

        let buttonBildanzeige: HTMLButtonElement = <HTMLButtonElement> document.getElementById("anzeigen"); //Button machen auf Admin
        buttonBildanzeige.addEventListener("click", anzeigeBilder);

        function bildkarteInfos(_karte: Memorykarte): HTMLDivElement { //hier Anzeige der Bildkarten mit Bildname 
            let karte: HTMLDivElement = document.createElement("div");
            karte.classList.add("BildkarteMitInfo");
    
            let image: HTMLImageElement = document.createElement("img");
            image.src = _karte.bildurl; 
            karte.appendChild(image);
    
            let name: HTMLParagraphElement = document.createElement("p");
            name.innerText = _karte.bildname;
            karte.appendChild(name);
    
            return karte;
        }


        async function bildHinzu(): Promise<void> { //Name und URL eingeben und abschicken 
            let daten: FormData = new FormData(document.forms[0]);
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/hinzufuegen"; //Button hinzufügen gedrückt 
            
            //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString();
            let antwort: Response = await fetch(url);
            let ausgabe: string = await antwort.text(); 
            console.log(ausgabe); 

            location.reload();
    
        }
    
        let buttonHinzu: HTMLButtonElement = <HTMLButtonElement> document.getElementById("hinzufuegen"); //Button machen auf Admin
        buttonHinzu.addEventListener("click", bildHinzu);

        async function bildLoeschen(): Promise<void> { //Name eingeben und abschicken 
            let daten: FormData = new FormData(document.forms[1]);
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/loeschen"; //Button löschen gedrückt 
            
            //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString();
            let antwort: Response = await fetch(url);
            let ausgabe: string = await antwort.text(); 
            console.log(ausgabe); 

            location.reload();
    
        }
    
        let buttonLoeschen: HTMLButtonElement = <HTMLButtonElement> document.getElementById("loeschen"); //Button machen auf Admin
        buttonLoeschen.addEventListener("click", bildLoeschen);

    }


    //Spiel.html
    if ((document.querySelector("title").getAttribute("id") == "Spiel" )) { //hier dann erstellen des Memorys mit den Daten aus der Datenbank
        
        let count: number = 0; //Counter zum Zählen der richtigen Pärchen 
        

        async function erstellen(): Promise<void> {
            let daten: FormData = new FormData(document.forms[0]); //Objekt FormData wird generiert
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/spielen"; //Button Play gedrückt

            //nächste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString(); //in String umwandeln 
            let antwort: Response = await fetch(url); //warten auf url
            let ausgabe: Memorykarte[] = await antwort.json(); //warten auf antwort 
            console.log(ausgabe);
            
            let spielkarten: Memorykarte[] = []; //hier 10 Pärchen bzw 20 Karten reinspeichern --> zufällig aus der ausgabe generieren lassen 

            for (let i: number = 0; i < 10; i++) { //10 Memorykarten generieren lassen und doppelt nehmen 
                let auswahl: number = Math.floor((Math.random() * ((ausgabe.length - 1) - 0 + 1)) + 0); //zufällige Zahl (innerhalb der Größe des ausgabearrays) generieren lassen 
                let karteEins: Memorykarte = ausgabe[auswahl];
                let karteZwei: Memorykarte = karteEins;

                spielkarten.push(karteEins); //hier in das spielkartenarray eintragen, um später damit weiterzuarbeiten 
                spielkarten.push(karteZwei);

                ausgabe.splice(auswahl, 1); //benutztes Bild aus dem Array entfernen, um Doppelungen zu verhindern 
                //Quelle: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

            }
            console.log(spielkarten); //nur Überprüfung 
            

            //jetzt dann Karten aus spielkartenarray zufällig positionieren 
            
            rückseitenEinblenden();
            position(spielkarten);

            //jetzt noch Zeit messen --> Anfangszeit 
            let date: Date = new Date();
            let spielbeginn: number = date.getTime(); //getTime in millisekunden 
            sessionStorage.setItem("beginn", spielbeginn.toString());
            console.log(spielbeginn);
            

            

        }

        let buttonPlay: HTMLButtonElement = <HTMLButtonElement> document.getElementById("spielen"); 
        buttonPlay.addEventListener("click", erstellen);


        function rückseitenEinblenden(): void {
            for (let i: number = 1; i < 21; i++) {
                let rückseite: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById(i + "");
                rückseite.style.opacity = "100";
            }
            
        }

        function position(_spielkarten: Memorykarte[]): void {
            _spielkarten.sort( () => .5 - Math.random() ); //sortiert das Array zufällig um 
            //Quelle: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array (Tipp von Marissa, nachdem meine Funktion nicht geklappt hat)


            //let spielPosition: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

            for (let i: number = 0; i < 20; i++) { //20 mal machen, um alle Karten zu positionieren 
                let karte: HTMLImageElement = bildkarte(_spielkarten[i]);

                let platz: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById(i + 1 + ""); //hier Tabellenzelle mit zufälliger Position "holen"
                platz.appendChild(karte); //karte in das Feld mit der zufällig generierten Position speichern 
            }
        } 


        function bildkarte(_auswahl: Memorykarte): HTMLImageElement { //hier Anzeige der Bildkarten (nur Bild)
        let image: HTMLImageElement = document.createElement("img");
        image.classList.add("Karte");
        image.src = _auswahl.bildurl;
        image.addEventListener("click", aufdecken); 
        image.style.opacity = "0"; //Karte noch verstecken 

        return image; 
        }


        let aufgedeckteKarten: HTMLImageElement[] = []; //Aufgedeckte Karten zwischenspeichern, um vergleichen zu können

        function aufdecken(_event: Event): void {
            let aufgedeckt: HTMLImageElement = <HTMLImageElement>_event.target;
            aufgedeckteKarten.push(aufgedeckt);
            aufgedeckt.style.opacity = "100"; //Bild dann anzeigen
            
            if (aufgedeckteKarten.length == 2) {
                if (aufgedeckteKarten[0].src == aufgedeckteKarten[1].src) {
                    aufgedeckteKarten = []; //Array wieder leeren 
                    count += 1;

                    if (count == 10) { //alle 10 Pärchen gefunden 
                        //Spiel beenden und Zeit stoppen und auf DeinScore weiterleiten 
                        let dateZwei: Date = new Date();
                        let spielende: number = dateZwei.getTime();
                        console.log(spielende);
                        
                        //Ende - Anfang = Spieldauer
                        let spielzeit: number = (spielende - parseInt(sessionStorage.getItem("beginn"))) / 1000; //durch 1000 dividieren für Sekunden 
                        sessionStorage.setItem("dauer", spielzeit.toString());
                        console.log(spielzeit); //Überprüfung
                        window.location.href = "DeinScore.html"; //Weiterleitung auf DeinScore 
                        //Quelle: https://www.w3schools.com/js/js_window_location.asp
                    
                    }

                }
                else {
                    //hier Zeitverzögerung 
                    setTimeout(zudecken, 1500);
                    //Quelle: https://www.w3schools.com/js/js_timing.asp
                }
            }
            else if (aufgedeckteKarten.length > 2) {
                zudecken();
            }
        }

        
        function zudecken(): void {
            for (let i: number = 0; i < aufgedeckteKarten.length; i++) {
                aufgedeckteKarten[i].style.opacity = "0";
            }
            aufgedeckteKarten = []; //Array wieder leeren 
        } 

        

    }

    //DeinScore.html
    else if ((document.querySelector("title").getAttribute("id") == "DeinScore" )) {
        
        let serverAntwort: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("serverantwort");
        let zeit: string = sessionStorage.getItem("dauer");
        console.log(zeit); //Überprüfung 
        
        let scoreZeit: HTMLInputElement = <HTMLInputElement> document.getElementById("zeit");
        scoreZeit.value = zeit; //gespeicherte Spielzeit in inputfeld speichern und dann in Anfrage übergeben

        async function datenEingeben(): Promise<void> { //Name und Score eingeben und abschicken an Datenbank
            let daten: FormData = new FormData(document.forms[0]);
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/scoredatenAbgeschickt"; //Button bestaetigen gedrückt 
            
            //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString();
            let antwort: Response = await fetch(url);
            let ausgabe: string = await antwort.text(); 
            console.log(ausgabe); //nur Überprüfung
            serverAntwort.innerHTML = ausgabe;

            setTimeout(weiterleitung, 2000);
            //Quelle: https://www.w3schools.com/js/js_timing.asp
    
        }
    
        let buttonScoredaten: HTMLButtonElement = <HTMLButtonElement> document.getElementById("bestaetigen"); 
        buttonScoredaten.addEventListener("click", datenEingeben);

        function weiterleitung(): void {
            window.location.href = "Highscoreliste.html"; //Weiterleitung auf Highscoreseite
        }

        
    }

    
    //Highscore.html
    else if ((document.querySelector("title").getAttribute("id") == "Highscore" )) {
        //hier Scoredaten anzeigen mit topZehn und dann nur die besten 10 anzeigen --> durchgehen und in Tabelle schreiben 
        async function scoresAnzeigen(): Promise<void> {
            let daten: FormData = new FormData(document.forms[0]);
            let url: RequestInfo = "https://gisombsose2021.herokuapp.com"; // Verbindung zu heroku (wichtig letzten / wegmachen)
            //let url: RequestInfo = "http://localhost:8100"; //zum lokal testen 
            url += "/scoredatenAnzeigen"; //Button anzeigen gedrückt 
            
            //näachste Zeile sorgt dafür, dass any nicht mehr unterstrichen wird
            //tslint:disable-next-line 
            let query: URLSearchParams = new URLSearchParams(<any>daten);
            url = url + "?" + query.toString();
            let antwort: Response = await fetch(url);
            let ausgabe: Scoredaten[] = await antwort.json(); //hier auf Antowrt mit Daten warten 
            //console.log(ausgabe); 

            //jetzt aus ausgabe die topZehn rausfiltern --> sortieren Funktion (von klein nach groß (Zeit)) und dann aus dem sortierten Array die ersten Zehn ausgeben 
            let scoresSortiert: Scoredaten[] = ausgabe;

            sortieren(scoresSortiert);
            leeren();
            

            for (let i: number = 0; i < 10; i++) { //hier werden dann immer nur die ersten 10 rausgezogen --> also die besten 10
                //hier in Tabelle einspeichern 
                let spalteName: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("n" + i); //immer eine Zeile weiter 
                let spalteZeit: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("z" + i);

                
                let name: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
                name.innerText = scoresSortiert[i].name + ": ";
                spalteName.appendChild(name);

                let zeit: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
                zeit.innerText = scoresSortiert[i].zeit + " s";
                spalteZeit.appendChild(zeit);

            }
        
        }

        let buttonScores: HTMLButtonElement = <HTMLButtonElement> document.getElementById("scoreAnzeige"); //Button machen auf DeinScore
        buttonScores.addEventListener("click", scoresAnzeigen);

        let buttonNeuesSpiel: HTMLButtonElement = <HTMLButtonElement> document.getElementById("neu"); //Button machen auf DeinScore
        buttonNeuesSpiel.addEventListener("click", neuesSpiel);


        function sortieren(_array: Scoredaten[]): Scoredaten[] {
            let zwischenpeicher: Scoredaten;
            for (let a: number = 1; a < _array.length; a++) {
                for (let b: number = _array.length - 1; b >= a; b--) {
                    if (parseInt(_array[b - 1].zeit) > parseInt(_array[b].zeit)) { //Zeitstring in Zahl umwandel, dass man vergleichen kann 
                        zwischenpeicher = _array[b - 1];
                        _array[b - 1] = _array[b];
                        _array[b] = zwischenpeicher;

                    }
                }
            }
            //Quelle: haben wir im ersten Semester in der Form in Programmieren gemacht
            return _array;
        }

        function leeren(): void {
            for (let i: number = 0; i < 10; i++) { 
                let spalteName: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("n" + i); 
                let spalteZeit: HTMLTableDataCellElement = <HTMLTableDataCellElement> document.getElementById("z" + i);

                spalteName.innerHTML = "";
                spalteZeit.innerHTML = "";

            }
        }

        function neuesSpiel(): void {
            window.location.href = "Spiel.html"; //Weiterleitung auf Spielseite
        }


        
    }



    interface Memorykarte {
        bildname: string;
        bildurl: string;
    }

    interface Scoredaten {
        name: string;
        zeit: string;
    }





}