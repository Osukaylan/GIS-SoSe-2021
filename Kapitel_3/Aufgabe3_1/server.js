"use strict";
/*
import * as Http from "http";

export namespace Aufgabe3_1 {
    console.log("Starting server"); //nur zum indizieren an die console/den user dass der server gestartet wird
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    //create new server
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);   Adde eventlistener zum server der handlerequest ausführt
    server.addListener("listening", handleListen);  Adde eventlistener zum server der handlerequest ausführt
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!"); // I hear voices wird in die console geloggt
        console.log(_request.url); //die url wird in die console geschrieben
        
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*"); //give everyone access
        _response.write(_request.url);          //server antwort ist jetzt die anfrage url
        _response.end();                    //antwort ist fertig, sag empfänger es kommt kein code
    }
    
}
*/ 
//# sourceMappingURL=server.js.map