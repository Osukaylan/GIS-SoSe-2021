import * as Http from "http";
import * as Url from "url";

export namespace Aufgabe3_1 {
    console.log("Starting server changes");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8122;
    let server: Http.Server = Http.createServer();           // create server
    server.addListener("request", handleRequest);           //create event listenener for requests,
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen(): void {             //fuction to log what has been listened.
        console.log("Listening");
    }
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {          //Requests are catched and handled here
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");                //requests get put on the html
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let refUrl: URL = new URL(_request.url, "https://kapitel3gissose2021.herokuapp.com/");
        var url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        if (refUrl.pathname == "/html") {
            console.log("I work until here");
            for (let key in url.query) {
                _response.write("<p>" + key + " : " + url.query[key] + "<p/>");
            }
            _response.end();

        } else if (refUrl.pathname == "/json") {
            let responseJson: string = JSON.stringify(url.query);

            _response.write(responseJson);                      //write what is getting requested
            _response.end();            // response finished
        }
    }
}