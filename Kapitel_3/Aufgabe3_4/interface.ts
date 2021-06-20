import { ObjectID } from "mongodb";

export interface Feedback {
    _id: ObjectID;
    u_input: string;
    feedback: string;
}