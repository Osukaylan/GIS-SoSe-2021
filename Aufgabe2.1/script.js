"use strict";
/*function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func1();
    console.log("Logo!");
}

a1();

function func1(): void {
    console.log("Klar?");
}

/*
1a: gibt aus : Alles , Klar? , Logo!
1b:  Abfolge: a1() called function a1, der string ist auf Alles gesetzt und wird so in der console gelogged.
 In Z4 wird func1() aufgerufen.
 Hier wird das "Klar?" in der console gelogged und dann geht es oben in Z5 weiter in a1() mit dem consolen log Logo!

1c:
 function a1(): void {
    let x: string = "Alles Gute!";
    console.log(x);
    func1();
    console.log("Alles Logo!");
 }

 a1();

 function func1(): void {
    console.log("Alles klar?");
 }
 */
/*
a2
 function a2(): void {
    let i: number = 9;   | i ist 9

    do {
        console.log(i);  | i wird gelogged
        i = i - 1;       | i wird um -1 verringert
    } while( i > 0);     | schleife läuft bis 0 durch, währenddessen werden die zwischenergebnisse gelogged.
 }

 a2();                   | programm ende
 */
/*

a3
 Fehler stand da und dann war er wieder weg.
*/
/*
a4

 let x: string = "Hallo";
 console.log(x);
 func1(x);
 console.log(x);
 func2();
 func3();
 console.log(x);

 function func1(y: string): void{
    y = "Bla";
    console.log(y);
 }

 function func2(): void{
    let x: string = "Blubb";
    console.log(x);
 }

 function func3(): void{
    x = "Test";
 }

a: Ausgabe: Hallo, Bla, Hallo, Blubb, Test.
 Why?: Weil der string der in der main steht gleich bleibt und sich nicht verändert.
 Die reihenfolge ist festgelegt. also x=hallo, func1 = bla, x=hallo, func2=blubb, func3=test.

b: Globale Variablen werden ausserhalb einer funktion deklariert und existieren immer.
 Lokale Variablen werden innerhalb einer Funktion deklariert, wie zum beispiel func1 eine ist.
 Diese sind werden nur lokal in dieser funktion gespeichert.
 
 Übergabeparameter sind variablen die in der function mitgeliefert werden,
 wie zum beispiel function func1(y: string): void{
 hier wird der string y mitgegeben und ist für die übergabe der variable zuständig.
*/
/*
a5
a:
 let: multi1: number = 2;
 let: multi2: number = 3;

 function multiply(multi1: number, multi2: number): void {
    console.log(multi1 * multi2);
}

b:
 function max(multi1: number, multi2: number): void {
         if (multi1 < multi2) {
        console.log(multi2 + " ist größer");

        } else
        console.log(multi1 + " ist größer");
}

c:
 function 1to100(): void {
    let zähler: number = 0;
    let i: number = 0;
    while (i < 100) {
        counter += i;
        i++;

    }
    console.log(zähler);
}

d:
/*for ( var _i = 0; _i < 10; _i++) {
     console.log (Math.random() * 100 );
}

e:
 function factorial(z1: number): void {
    let zähler1: number = 1;

    for (var _i = 2; _i <= z1; _i++) {
        zähler1 *= _i;
    }
    console.log(zähler1);
}

f:
 function leapyears(): void {
    for (var jahr = 1900; year < 2021; jahr++) {
        if (jahr % 4 == 0 && (jahr % 100 != 0) || jahr % 400 == 0)
            console.log("Das Jahr: " + jahr + " ist ein Schaltjahr brudi");

    }
}
*/
/*
a6

a:
 let hashtag: String = "";
 for (var _i = 0; _i < 7; _i++) {
     hashtag += "#";
     console.log(hashtag);
}

b und c:
/*for (var _i = 0; _i < 100; _i++) {
    if (_i % 3 != 0 && _i % 5 != 0) {
        console.log(_i);
    }
    if (_i % 3 == 0) {
        console.log("Fizz");

    } else if (_i % 5 == 0) {
        console.log("Buzz");
    }
    /*hier jetzt aufgabe c */
/*
    if (_i % 3 == 0 && _i % 5 == 0) {
        console.log("FizzBuzz");
}

d:
 function schachbrett(Länge: number, Breite: number): void {

    for (var _i = 0; _i < Länge; _i++) {
        let Reie: String = "";
        for (var _a = 1; _a <= Breite; _a++) {

            if ((_i + _a) % 2 == 0) {
                reihe += "#";
            }
            console.log("");
        }
        console.log(Reie);
    }
} 
//# sourceMappingURL=script.js.map