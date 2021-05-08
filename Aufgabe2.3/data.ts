interface InterfaceAnimal {
    name: string;
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