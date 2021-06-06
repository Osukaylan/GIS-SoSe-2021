import * as Http from "http";
import * as Url from "url";

export namespace Aufgabe3_1 {
    console.log("Starting server changes");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8122;
    let server: Http.Server = Http.createServer();           
    server.addListener("request", handleRequest);           //create event listenener for requests,
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen(): void {             //fuction to log what has been listened.
        console.log("Listening");
    }
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {          //Requests are catched and handled here
        console.log("I hear voices!");
        if (_request) {
            _response.setHeader("content-type", "text/html; charset=utf-8");                //requests get put on the html
            _response.setHeader("Access-Control-Allow-Origin", "*");

            var url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
          
            for (let key in url.query) {
                console.log(key + " : " + url.query[key]);
                _response.write(key + " : " + url.query[key] + "<br/>");
            }
            let responseJson: string = JSON.stringify(url.query);
            console.log(url.query);
            _response.write(responseJson);
        
            _response.end();
        }
        _response.end();
    }
}