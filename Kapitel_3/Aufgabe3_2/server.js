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
    let server = Http.createServer();
    server.addListener("request", handleRequest); //create event listenener for requests,
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        if (_request) {
            _response.setHeader("content-type", "text/html; charset=utf-8"); //requests get put on the html
            _response.setHeader("Access-Control-Allow-Origin", "*");
            var url = Url.parse(_request.url, true);
            for (let key in url.query) {
                console.log(key + " : " + url.query[key]);
                _response.write(key + " : " + url.query[key] + "<br/>");
            }
            let responseJson = JSON.stringify(url.query);
            console.log(url.query);
            _response.write(responseJson);
            _response.end();
        }
        _response.end();
    }
})(Aufgabe3_1 = exports.Aufgabe3_1 || (exports.Aufgabe3_1 = {}));
//# sourceMappingURL=server.js.map