//Aufgabe 2

partSelections(bodyParts);
//bodySelections(bodyParts);
//pawsSelections(bodyParts);

function partSelections(headArray: BodyPart[]): void {


    for (let index: number = 0; index < headArray.length; index++) {
        let image: HTMLImageElement = document.createElement("img");
        image.src = headArray[index].imageSource;

        image.classList.add("generatedImage");
        image.addEventListener("click", function (): void {
            partChoser(headArray[index]);
        },                     false);
        document.body.append(image);
    }
    //if (document.head.title == "Chose Head")
}

function headSelections(headArray: BodyPart[]): void {


    for (let index: number = 0; index < headArray.length; index++) {
        let image: HTMLImageElement = document.createElement("img");
        image.src = headArray[index].imageSource;

        image.classList.add("generatedImage");
        image.addEventListener("click", function (): void {
            headChoser(headArray[index]);
        },                     false);
        document.body.append(image);
    }
    //if (document.head.title == "Chose Head")
}

function bodySelections(bodyArray: BodyPart[]): void {


    for (let index: number = 0; index < bodyArray.length; index++) {
        let image: HTMLImageElement = document.createElement("img");
        image.src = bodyArray[index].imageSource;

        image.classList.add("generatedImage");
        image.addEventListener("click", function (): void {
            bodyChoser(bodyArray[index]);
        },                     false);
        document.body.append(image);
    }

}

function pawsSelections(pawsArray: BodyPart[]): void {


    for (let index: number = 0; index < pawsArray.length; index++) {
        let image: HTMLImageElement = document.createElement("img");
        image.src = pawsArray[index].imageSource;

        image.classList.add("generatedImage");
        image.addEventListener("click", function (): void {
            pawsChoser(pawsArray[index]);
        },                     false);
        document.body.append(image);
    }

}

let itemsSelected: Items = { id1: 0, id2: 0, id3: 0, name: "" };


function updateItemsSelected(itemId: number, name: string): void {

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

function saveItems(): void {
    console.log("Here are your saved items: " + itemsSelected.name + " " + itemsSelected.id1, itemsSelected.id2, itemsSelected.id3);

}

function partChoser(part: BodyPart): void {
    //console.log(part.name + ", " + part.description + ", " + part.id + ", " + part.imageSource);

    updateItemsSelected(part.id, part.name);

}

function headChoser(head: BodyPart): void {
    console.log(head.name + ", " + head.description + ", " + head.id + ", " + head.imageSource);

    //updateItemsSelected(head.id);

}

function bodyChoser(body: BodyPart): void {
    console.log(body.description + ", " + body.id + ", " + body.imageSource);
    //updateItemsSelected(body.id);
}

function pawsChoser(paws: BodyPart): void {
    console.log(paws.description + ", " + paws.id + ", " + paws.imageSource);
    //updateItemsSelected(paws.id);
}

