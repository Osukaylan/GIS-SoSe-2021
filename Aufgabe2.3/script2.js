"use strict";
//Aufgabe 2
partSelections(bodyParts);
//bodySelections(bodyParts);
//pawsSelections(bodyParts);
function partSelections(headArray) {
    for (let index = 0; index < headArray.length; index++) {
        let image = document.createElement("img");
        image.src = headArray[index].imageSource;
        image.classList.add("generatedImage");
        image.addEventListener("click", function () {
            partChoser(headArray[index]);
        }, false);
        document.body.append(image);
    }
    //if (document.head.title == "Chose Head")
}
function headSelections(headArray) {
    for (let index = 0; index < headArray.length; index++) {
        let image = document.createElement("img");
        image.src = headArray[index].imageSource;
        image.classList.add("generatedImage");
        image.addEventListener("click", function () {
            headChoser(headArray[index]);
        }, false);
        document.body.append(image);
    }
    //if (document.head.title == "Chose Head")
}
function bodySelections(bodyArray) {
    for (let index = 0; index < bodyArray.length; index++) {
        let image = document.createElement("img");
        image.src = bodyArray[index].imageSource;
        image.classList.add("generatedImage");
        image.addEventListener("click", function () {
            bodyChoser(bodyArray[index]);
        }, false);
        document.body.append(image);
    }
}
function pawsSelections(pawsArray) {
    for (let index = 0; index < pawsArray.length; index++) {
        let image = document.createElement("img");
        image.src = pawsArray[index].imageSource;
        image.classList.add("generatedImage");
        image.addEventListener("click", function () {
            pawsChoser(pawsArray[index]);
        }, false);
        document.body.append(image);
    }
}
let itemsSelected = { id1: 0, id2: 0, id3: 0, name: "" };
function updateItemsSelected(itemId, name) {
    // Check to see what position the items are in
    // Save to the Id slot which is open
    if (itemsSelected.id1 == 0) {
        itemsSelected.id1 = itemId;
        itemsSelected.name = name;
    }
    else if (itemsSelected.id2 == 0) {
        itemsSelected.id2 = itemId;
    }
    else if (itemsSelected.id3 == 0) {
        itemsSelected.id3 = itemId;
        saveItems(); // Temporary for debug and proof
    }
}
function saveItems() {
    console.log("Here are your saved items: " + itemsSelected.name + " " + itemsSelected.id1, itemsSelected.id2, itemsSelected.id3);
}
function partChoser(part) {
    //console.log(part.name + ", " + part.description + ", " + part.id + ", " + part.imageSource);
    updateItemsSelected(part.id, part.name);
}
function headChoser(head) {
    console.log(head.name + ", " + head.description + ", " + head.id + ", " + head.imageSource);
    //updateItemsSelected(head.id);
}
function bodyChoser(body) {
    console.log(body.description + ", " + body.id + ", " + body.imageSource);
    //updateItemsSelected(body.id);
}
function pawsChoser(paws) {
    console.log(paws.description + ", " + paws.id + ", " + paws.imageSource);
    //updateItemsSelected(paws.id);
}
//# sourceMappingURL=script2.js.map