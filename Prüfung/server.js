"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
let cardInformation;
let playerInformation;
let dblink = "mongodb+srv://hfuadmindb:Umjr5zNUfMHxpGzn@cluster0.hppec.mongodb.net";
let port = Number(process.env.PORT);
if (!port)
    port = 8100;
startServer(port);
function startServer(_port) {
    console.log("Starting server!");
    let server = Http.createServer();
    console.log("Server is up!");
    server.listen(_port);
    server.addListener("request", handleRequest);
}
async function connectToMongoCards(dblink) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(dblink, options);
    await mongoClient.connect();
    cardInformation = mongoClient.db("MemoryGame").collection("CardData");
    console.log("connecting db", cardInformation != undefined);
}
async function connectToMongoPlayer(dblink) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(dblink, options);
    await mongoClient.connect();
    playerInformation = mongoClient.db("MemoryGame").collection("PlayerData");
    console.log("connecting db", playerInformation != undefined);
}
//function handleListen(): void {     // do we still need to comment all of this?
//    console.log("Listening");
//}
async function handleRequest(_request, _response) {
    console.log("I hear voices!");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        let url = Url.parse(_request.url, true);
        let memorycards = { name: url.query.name + "", imageSource: url.query.imageSource + "" };
        let remove = url.query.name + "";
        let score = { name: url.query.name + "", time: parseInt(url.query.time + "") };
        if (url.pathname == "/ShowMeTheCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let show = await MemoryGameDisplay(dblink);
            _response.write(JSON.stringify(show));
            //await connectToMongo(dblink);
        }
        if (url.pathname == "/AddNewCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let response = await AddNewCards(dblink, memorycards);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/RemoveCards") {
            console.log(url);
            _response.setHeader("content-type", "text/html; charset=utf-8");
            let response = await RemoveCards(dblink, remove);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/memorygame") {
            let cards = await MemoryGameDisplay(dblink);
            _response.write(JSON.stringify(cards));
        }
        if (url.pathname == "/SaveRun") {
            let response = await SaveCurrentRun(dblink, score);
            console.log(response);
            _response.write(response);
        }
        if (url.pathname == "/ScoreDisplay") {
            let scores = await DisplayScore(dblink);
            _response.write(JSON.stringify(scores));
        }
    }
    _response.end();
}
async function MemoryGameDisplay(_url) {
    //fire off connection function
    connectToMongoCards(dblink);
    //find the data of the momory card
    let cursor = cardInformation.find();
    //return found datas of cards
    let cards = await cursor.toArray();
    return cards;
}
async function AddNewCards(_url, _card) {
    //fire off connection function
    connectToMongoCards(dblink);
    //add memory card
    cardInformation.insertOne(_card);
    return "added";
}
async function RemoveCards(_url, _name) {
    //fire off connection function
    connectToMongoCards(dblink);
    //delete memory card with this name
    cardInformation.deleteOne({ id: _name });
    return "removed";
}
async function SaveCurrentRun(_url, _score) {
    //fire off connection function
    connectToMongoPlayer(dblink);
    //save the score of the current game into DB
    cardInformation.insertOne(_score);
    let scoreresponse = "Your score has been added!";
    return scoreresponse;
}
async function DisplayScore(_url) {
    //fire off connecting function
    connectToMongoPlayer(dblink);
    //find the data of player
    let cursor = playerInformation.find();
    //Await found data from DB
    let result = await cursor.toArray();
    return result;
}
//# sourceMappingURL=server.js.map