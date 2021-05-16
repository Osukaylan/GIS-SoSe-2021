"use strict";
var Aufgabe_2_4;
(function (Aufgabe_2_4) {
    /*export interface BodyPart {
        name: string;
        imageSource: string;
        description: string;
    }

    export interface AllParts {
        heads: BodyPart[];
        bodies: BodyPart[];
        paws: BodyPart[];
    }

    export interface Selection {
        head: BodyPart;
        body: BodyPart;
        paw: BodyPart;
    }

    export let partes: AllParts = {
        heads: [
            { name: "Boris", description: "Asian Leopard Cat", imageSource: "images/Asian_Leopard_Cat.jpg" },
            { name: "Tess", description: "Japanese Bobtail", imageSource: "images/Untitled-1.png" },
            { name: "Gary", description: "Pixie Bob", imageSource: "images/Untitled-2.png" }
        ],
        bodies: [
            { name: "Dog", description: "CatFloppyEars", imageSource: "images/dog-body.jpg" },
            { name: "Lion", description: "CatSideEars", imageSource: "images/lion_body.png" },
            { name: "Bear", description: "CatNarrowEars", imageSource: "images/bear-body.jpg" }
        ],
        paws: [
            { name: "Tiger", description: "CatFloppyEars", imageSource: "images/tiger-paws.jpg" },
            { name: "Polar Bear", description: "CatSideEars", imageSource: "images/polar-bear-paws.jpg" },
            { name: "Dog", description: "CatNarrowEars", imageSource: "images/dog-paws.jpg" }
        ]
    };*/
    Aufgabe_2_4.myJSON = `
 {
    "heads":[
        {"name":"Boris",
        "description":"Asian Leopard Cat",
        "imageSource":"images/Asian_Leopard_Cat.jpg"},
        
        {"name":"Tess",
        "description":"Japanese Bobtail",
        "imageSource":"images/Untitled-1.png"},
        
        {"name":"Gary",
        "description":"Pixie Bob",
        "imageSource":"images/Untitled-2.png"}],
        
    "bodies":[
        {"name":"Dog",
        "description":"CatFloppyEars",
        "imageSource":"images/dog-body.jpg"},
        
        {"name":"Lion",
        "description":"CatSideEars",
        "imageSource":"images/lion_body.png"},
        
        {"name":"Bear",
        "description":"CatNarrowEars",
        "imageSource":"images/bear-body.jpg"}],
        
    "paws":[
        {"name":"Tiger",
        "description":"CatFloppyEars",
        "imageSource":"images/tiger-paws.jpg"},
    
        {"name":"Polar Bear",
        "description":"CatSideEars",
        "imageSource":"images/polar-bear-paws.jpg"},
        
        {"name":"Dog",
        "description":"CatNarrowEars",
        "imageSource":"images/dog-paws.jpg"}
    ]
}`;
    Aufgabe_2_4.myObj = JSON.parse(Aufgabe_2_4.myJSON);
})(Aufgabe_2_4 || (Aufgabe_2_4 = {}));
//# sourceMappingURL=data.js.map