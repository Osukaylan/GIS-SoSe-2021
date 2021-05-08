//Aufgabe 2
"use strict";
let headArray = new Array;
headArray[0] = { name: "Boris", race: "Asian Leopard Cat", imageSource: "images/Asian_Leopard_Cat.jpg", personality: "Moody" };
headArray[1] = { name: "Rudi", race: "Japanese Bobtail Cat", imageSource: "images/Japanese_Bobtail.jpg", personality: "Moody" };
headArray[2] = { name: "Yumi", race: "Asian Leopard Cat", imageSource: "images/Pixie_Bob.jpg", personality: "Moody" };
showImage(headArray);
function showImage(animalInterface) {
    for (let index = 0; index < animalInterface.length; index++) {
        let image = document.createElement("img");
        image.src = animalInterface[index].imageSource;
        image.classList.add("generatedImage");
        if (animalInterface[index].personality == "Moody") {
            image.addEventListener("click", headChoser);
        }
        else if (animalInterface[index].personality == "body") {
            image.addEventListener("click", bodyChoser);
        }
        else if (animalInterface[index].personality == "paws") {
            image.addEventListener("click", pawsChoser);
        }
        document.body.append(image);
    }
    //if (document.head.title == "Chose Head")
    let speicher = { head: "tester", body: "tester", paws: "tester" };
    function headChoser(click) {
        let img = click.currentTarget;
        speicher.head = img.src;
        console.log(img.src);
    }
    function bodyChoser(click) {
        let img = click.currentTarget;
        speicher.head = img.src;
        console.log(img.src);
    }
    function pawsChoser(click) {
        let img = click.currentTarget;
        speicher.head = img.src;
        console.log(img.src);
    }
}
//# sourceMappingURL=script2.js.map