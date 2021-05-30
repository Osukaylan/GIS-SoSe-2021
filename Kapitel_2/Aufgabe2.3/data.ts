/*interface HeadSelection {
    name: string;
    race: string;
    imageSource: string;
    personality: string;
}

interface BodySelection {
    name: string;
    race: string;
    imageSource: string;
    personality: string;
}

interface PawsSelection {

    race: string;
    imageSource: string;
    personality: string;
}

interface AnimalParts {
    head: string;
    body: string;
    paws: string;
}

class FinalCombination {
    pickedHead: string;
    pickedBody: string;
    pickedPaws: string;

    constructor(pickedHead: string, pickedBody: string, pickedPaws: string ) {
        this.pickedHead = pickedHead;
        this.pickedBody = pickedBody;
        this.pickedPaws = pickedPaws;
    }
}

let headArray: InterfaceAnimal[] = new Array;

headArray[0] = { name: "Boris", race: "Asian Leopard Cat", imageSource: "images/Asian_Leopard_Cat.jpg", personality: "Moody" };
headArray[1] = { name: "Rudi", race: "Japanese Bobtail Cat", imageSource: "images/Japanese_Bobtail.jpg", personality: "body" };
headArray[2] = { name: "Yumi", race: "Asian Leopard Cat", imageSource: "images/Pixie_Bob.jpg", personality: "Moody" };

let bodyArray: InterfaceAnimal[] = new Array;*/

interface BodyPart {
    name: string;
    imageSource: string;
    id: number;
    description: string;
}

class Items {
    id1: number;
    id2: number;
    id3: number;
    name: string;
    constructor(id1: number, id2: number, id3: number, name: string ) {
        this.id1 = id1;
        this.id2 = id2;
        this.id3 = id3;
        this.name = name;
    }
}

let bodyParts: BodyPart[] = new Array;

bodyParts[0] = { name: "Boris" , description: "CatFloppyEars", imageSource: "images/Asian_Leopard_Cat.jpg", id: 1 };
bodyParts[1] = { name: "Tess" , description: "CatSideEars", imageSource: "images/Japanese_Bobtail.jpg", id: 2 };
bodyParts[2] = { name: "Gary" , description: "CatNarrowEars", imageSource: "images/Pixie_Bob.jpg", id: 3 };
bodyParts[3] = { name: "a" , description: "CatFloppyEars", imageSource: "images/dog-body.jpg", id: 4 };
bodyParts[4] = { name: "b" , description: "CatSideEars", imageSource: "images/lion_body.png", id: 5 };
bodyParts[5] = { name: "c" , description: "CatNarrowEars", imageSource: "images/bear-body.jpg", id: 6 };
bodyParts[6] = { name: "d" , description: "CatFloppyEars", imageSource: "images/tiger-paws.jpg", id: 7 };
bodyParts[7] = { name: "e" , description: "CatSideEars", imageSource: "images/polar-bear-paws.jpg", id: 8 };
bodyParts[8] = { name: "f" , description: "CatNarrowEars", imageSource: "images/dog-paws.jpg", id: 9 };
