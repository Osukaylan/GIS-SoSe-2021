namespace Aufgabe_2_4                                                                        {

//declaring them
export interface BodyPart {
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
}