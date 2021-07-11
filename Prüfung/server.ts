import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Abgabe {

    let dblink: string = "mongodb+srv://hfuadmindb:Umjr5zNUfMHxpGzn@cluster0.hppec.mongodb.net/MemoryGame?retryWrites=true&w=majority";

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

    //function handleListen(): void {     // do we still need to comment all of this?
    //    console.log("Listening");
    //}

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let urlpathtostring: string = <string>url.pathname;
            let memorycards: CardInterface = { name: url.query.name + "", imageSource: url.query.imageSource + "" };
            let remove: string | string[] = url.query.name + "";
            let score: Scores = { name: url.query.name + "", time: (url.query.time + "") };
            //if heroku url showMeTheCards, await function call
            if (urlpathtostring == "/showMeTheCards") {
                let show: CardInterface[] = await MemoryGameDisplay(dblink);
                _response.write(JSON.stringify(show));
            }
            //if heroku url addNewCards, await function call
            else if (urlpathtostring == "/addNewCards") {
                let response: string = await AddNewCards(dblink, memorycards);
                console.log(response);
                _response.write(response);
            }
            //if heroku url removeCards, await function call
            else if (urlpathtostring == "/removeCards") {
                let response: string = await RemoveCards(dblink, remove);
                console.log(response);
                _response.write(response);
            }
            //if heroku url memorygame, await function call
            else if (urlpathtostring == "/memorygame") {
                let cards: CardInterface[] = await MemoryGameDisplay(dblink);
                _response.write(JSON.stringify(cards));
            }
            //if heroku url saveRun, await function call
            else if (urlpathtostring == "/saveRun") {
                let response: string = await SaveCurrentRun(dblink, score);
                console.log(response);
                _response.write(response);
            }
            //if heroku url scoreDisplay, await function call
            else if (urlpathtostring == "/scoreDisplay") {
                let scores: Scores[] = await DisplayScore(dblink);
                _response.write(JSON.stringify(scores));
            }
        }
        _response.end();
    }

    async function MemoryGameDisplay(_url: string): Promise<CardInterface[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection   
        let images: Mongo.Collection = mongoClient.db("MemoryGame").collection("CardData");
        let cursor: Mongo.Cursor = images.find();
        console.log(cursor);

        //return found datas of cards
        let cardsweplaywith: CardInterface[] = await cursor.toArray();
        console.log(cardsweplaywith);
        return cardsweplaywith;
    }

    async function AddNewCards(_url: string, _card: CardInterface): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let images: Mongo.Collection = mongoClient.db("MemoryGame").collection("CardData");
        //add memory card
        images.insertOne(_card);
        return "added";
    }

    async function RemoveCards(_url: string, _name: string | string[]): Promise<string> {

        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let images: Mongo.Collection = mongoClient.db("MemoryGame").collection("CardData");
        //delete memory card with this name
        images.deleteOne({ name: _name });
        return "removed";
    }
    async function SaveCurrentRun(_url: string, _score: Scores): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let player: Mongo.Collection = mongoClient.db("MemoryGame").collection("PlayerData");

        //save the score of the current game into DB
        player.insertOne(_score);
        let scoreresponse: string = "Your score has been added!";
        return scoreresponse;
    }
    async function DisplayScore(_url: string): Promise<Scores[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        //call collection
        let player: Mongo.Collection = mongoClient.db("MemoryGame").collection("PlayerData");

        //find the data of player
        let cursor: Mongo.Cursor = player.find();
        //Await found data from DB
        let result: Scores[] = await cursor.toArray();
        return result;
    }
    export interface CardInterface {
        name: string;
        imageSource: string;
    }
    export interface Scores {
        name: string;
        time: string;
    }
}