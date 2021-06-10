"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe3_1 = void 0;
const Http = require("http");
const Url = require("url");
var Aufgabe3_1;
(function (Aufgabe3_1) {
    console.log("Starting server changes");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8122;
    let server = Http.createServer(); // create server
    server.addListener("request", handleRequest); //create event listenener for requests,
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //requests get put on the html
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let refUrl = new URL(_request.url, "https://kapitel3gissose2021.herokuapp.com/");
        var url = Url.parse(_request.url, true);
        if (refUrl.pathname == "/html") {
            console.log("I work until here"); //just for me to see in heroku if it works
            for (let key in url.query) {
                _response.write("<p>" + key + " : " + url.query[key] + "<p/>");
            }
            _response.end();
        }
        else if (refUrl.pathname == "/json") {
            console.log("Json works"); //just for me to see in heroku if it works
            let responseJson = JSON.stringify(url.query);
            _response.write(responseJson); //write what is getting requested
            _response.end(); // response finished
        }
    }
})(Aufgabe3_1 = exports.Aufgabe3_1 || (exports.Aufgabe3_1 = {}));
//# sourceMappingURL=server.js.map