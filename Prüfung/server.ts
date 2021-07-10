import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { CardInterface } from "./interface";
import { Scores } from "./interface";


let cardInformation: Mongo.Collection;
let playerInformation: Mongo.Collection;
let dblink: string = "mongodb+srv://hfuadmindb:Umjr5zNUfMHxpGzn@cluster0.hppec.mongodb.net";

let port: number = Number(process.env.PORT);
if (!port)
    port = 8100;

startServer(port);

function startServer(_port: number | string): void {
    console.log("Starting server!");
    let server: Http.Server = Http.createServer();
    console.log("Server is up!");
    server.listen(_port);
    server.addListener("request", handleRequest);
}

async function connectToMongoCards(dblink: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(dblink, options);
    await mongoClient.connect();
    cardInformation = mongoClient.db("MemoryGame").collection("CardData");
    console.log("connecting db", cardInformation != undefined);
}
async function connectToMongoPlayer(dblink: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(dblink, options);
    await mongoClient.connect();
    playerInformation = mongoClient.db("MemoryGame").collection("PlayerData");
    console.log("connecting db", playerInformation != undefined);
}

//function handleListen(): void {     // do we still need to comment all of this?
//    console.log("Listening");
//}

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("I hear voices!");

    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let memorycards: CardInterface = { name: url.query.name + "", imageSource: url.query.imageSource + "" };
        let remove: string | string[] = url.query.name + "";
        let score: Scores = { name: url.query.name + "", time: parseInt(url.query.time + "") };
        if (url.pathname == "/ShowMeTheCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let show: CardInterface[] = await MemoryGameDisplay(dblink);
            _response.write(JSON.stringify(show));
            //await connectToMongo(dblink);
        }
        if (url.pathname == "/AddNewCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let response: string = await AddNewCards(dblink, memorycards);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/RemoveCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let response: string = await RemoveCards(dblink, remove);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/memorygame") {
            let cards: CardInterface[] = await MemoryGameDisplay(dblink);
            _response.write(JSON.stringify(cards));
        }
        if (url.pathname == "/SaveRun") {
            let response: string = await SaveCurrentRun(dblink, score);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/ScoreDisplay") {
            let scores: Scores[] = await DisplayScore(dblink);
            _response.write(JSON.stringify(scores));
        }
    }
    _response.end();
}

async function MemoryGameDisplay(_url: string): Promise<CardInterface[]> {
    //fire off connection function
    connectToMongoCards(dblink);
    //find the data of the momory card
    let cursor: Mongo.Cursor = cardInformation.find();
    //return found datas of cards
    let cards: CardInterface[] = await cursor.toArray();
    return cards;
}

async function AddNewCards(_url: string, _card: CardInterface): Promise<string> {
    //fire off connection function
    connectToMongoCards(dblink);
    //add memory card
    cardInformation.insertOne(_card);
    return "added";
}

async function RemoveCards(_url: string, _name: string | string[]): Promise<string> {
    //fire off connection function
    connectToMongoCards(dblink);
    //delete memory card with this name
    cardInformation.deleteOne({ id: _name });
    return "removed";
}
async function SaveCurrentRun(_url: string, _score: Scores): Promise<string> {
    //fire off connection function
    connectToMongoPlayer(dblink);
    //save the score of the current game into DB
    cardInformation.insertOne(_score);
    let scoreresponse: string = "Your score has been added!";
    return scoreresponse;
}
async function DisplayScore(_url: string): Promise<Scores[]> {
    //fire off connecting function
    connectToMongoPlayer(dblink);
    //find the data of player
    let cursor: Mongo.Cursor = playerInformation.find();
    //Await found data from DB
    let result: Scores[] = await cursor.toArray();
    return result;
}
