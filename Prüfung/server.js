"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Abgabe;
(function (Abgabe) {
    let dblink = "mongodb+srv://hfuadmindb:Umjr5zNUfMHxpGzn@cluster0.hppec.mongodb.net/MemoryGame?retryWrites=true&w=majority";
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
    //function handleListen(): void {     // do we still need to comment all of this?
    //    console.log("Listening");
    //}
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let urlpathtostring = url.pathname;
            let memorycards = { name: url.query.name + "", imageSource: url.query.imageSource + "" };
            let remove = url.query.name + "";
            let score = { name: url.query.name + "", time: (url.query.time + "") };
            //if heroku url showMeTheCards, await function call
            if (urlpathtostring == "/showMeTheCards") {
                let show = await MemoryGameDisplay(dblink);
                _response.write(JSON.stringify(show));
            }
            //if heroku url addNewCards, await function call
            else if (urlpathtostring == "/addNewCards") {
                let response = await AddNewCards(dblink, memorycards);
                console.log(response);
                _response.write(response);
            }
            //if heroku url removeCards, await function call
            else if (urlpathtostring == "/removeCards") {
                let response = await RemoveCards(dblink, remove);
                console.log(response);
                _response.write(response);
            }
            //if heroku url memorygame, await function call
            else if (urlpathtostring == "/memorygame") {
                let cards = await MemoryGameDisplay(dblink);
                _response.write(JSON.stringify(cards));
            }
            //if heroku url saveRun, await function call
            else if (urlpathtostring == "/saveRun") {
                let response = await SaveCurrentRun(dblink, score);
                console.log(response);
                _response.write(response);
            }
            //if heroku url scoreDisplay, await function call
            else if (urlpathtostring == "/scoreDisplay") {
                let scores = await DisplayScore(dblink);
                _response.write(JSON.stringify(scores));
            }
        }
        _response.end();
    }
    async function MemoryGameDisplay(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection   
        let images = mongoClient.db("MemoryGame").collection("CardData");
        let cursor = images.find();
        console.log(cursor);
        //return found datas of cards
        let cardsweplaywith = await cursor.toArray();
        console.log(cardsweplaywith);
        return cardsweplaywith;
    }
    async function AddNewCards(_url, _card) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let images = mongoClient.db("MemoryGame").collection("CardData");
        //add memory card
        images.insertOne(_card);
        return "added";
    }
    async function RemoveCards(_url, _name) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let images = mongoClient.db("MemoryGame").collection("CardData");
        //delete memory card with this name
        images.deleteOne({ name: _name });
        return "removed";
    }
    async function SaveCurrentRun(_url, _score) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let player = mongoClient.db("MemoryGame").collection("PlayerData");
        //save the score of the current game into DB
        player.insertOne(_score);
        let scoreresponse = "Your score has been added!";
        return scoreresponse;
    }
    async function DisplayScore(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let player = mongoClient.db("MemoryGame").collection("PlayerData");
        //find the data of player
        let cursor = player.find();
        //Await found data from DB
        let result = await cursor.toArray();
        return result;
    }
})(Abgabe = exports.Abgabe || (exports.Abgabe = {}));
//# sourceMappingURL=server.js.map