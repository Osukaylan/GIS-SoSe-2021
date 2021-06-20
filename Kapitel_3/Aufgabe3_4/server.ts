import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { Feedback } from "./interface";

export namespace Aufgabe3_4 {
    let feedbackInformation: Mongo.Collection;
    let result: Feedback[];
    //let databaseURL: string = "mongodb://localhost:27017"; local check
    let dblink: string = "mongodb+srv://hfuadmindb:Umjr5zNUfMHxpGzn@cluster0.hppec.mongodb.net";

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    startServer(port);
    connectToMongo(dblink);

    function startServer(_port: number | string): void {
        console.log("Starting server");
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToMongo(dblink: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(dblink, options);
        await mongoClient.connect();
        feedbackInformation = mongoClient.db("Feedbacks").collection("Feedback");
        console.log("connecting db", feedbackInformation != undefined);
    }
    
    function handleListen(): void {     // do we still need to comment all of this?
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            if (url.pathname == "/saveFeedback") {
                console.log(url);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                feedbackInformation.insertOne(url.query);
                _response.write("Your feedback was saved successfully.");
                await connectToMongo(dblink);
            }

            if (url.pathname == "/showFeedback") {  // checks the url if its showfeedback and stringifies it
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let cursor: Mongo.Cursor = feedbackInformation.find();
                result = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }

            if (url.pathname == "/deleteFeedback") {
                console.log(url.query);
                
                _response.setHeader("content-type", "text/html; charset=utf-8");
                feedbackInformation.deleteOne( {"_id": new Mongo.ObjectId(url.query._id.toString())});
                console.log("_id: " + new Mongo.ObjectId(url.query._id.toString()));
                
                _response.write("Feedback was deleted...");
                await connectToMongo(dblink);
            }
        }
        _response.end();
        console.log(_response + " I cant take it anymore, just go already!");
    }
}