"use strict";
const divCreator = document.createElement("div");
var creator = document.createElement("BUTTON");
creator.id = "RectangleCreator";
creator.innerHTML = "create a rectangle with me";
document.body.appendChild(creator);
document.getElementById("RectangleCreator").addEventListener("click", createbutton, { once: true });
function createbutton() {
    let x = Math.floor(Math.random() * window.innerWidth / 2);
    let y = Math.floor(Math.random() * window.innerHeight / 2);
    if (y > window.innerHeight) {
        y = -window.innerHeight;
    }
    //let w: number = Math.floor(Math.random() * 200);
    let w = Math.floor(Math.random() * 200);
    if (w > window.innerWidth) {
        w = -window.innerWidth;
    }
    let h = Math.floor(Math.random() * 200);
    if (h > window.innerHeight) {
        y = -window.innerHeight;
    }
    drawRectangle1(createRectangle());
    drawRectangle2(createRectangle());
    grassdrawer(0, (window.innerHeight * 2) / 3, window.innerWidth, window.innerHeight / 3);
    housedrawer(200, (window.innerHeight * 2) / 12, 300, window.innerHeight / 2);
    return { "x": x, "y": y, "w": w, "h": h };
}
function grassdrawer(x, y, w, h) {
    let gras = document.createElement("div");
    gras.style.position = "absolute";
    gras.style.left = x + "px";
    gras.style.top = y + "px";
    gras.style.width = w + "px";
    gras.style.height = h + "px";
    gras.style.backgroundColor = "green";
    gras.style.visibility = "visible";
    gras.id = "canvasgras";
    document.body.appendChild(gras);
    document.getElementById("canvasgras").style.zIndex = "-1";
}
function housedrawer(x, y, w, h) {
    let house = document.createElement("div");
    house.style.position = "absolute";
    house.style.left = x + "px";
    house.style.top = y + "px";
    house.style.width = w + "px";
    house.style.height = h + "px";
    house.style.backgroundColor = "gray";
    house.style.visibility = "visible";
    house.id = "housepog";
    document.body.appendChild(house);
    document.getElementById("housepog").style.zIndex = "-1";
}
let refreshbutton = document.createElement("BUTTON");
refreshbutton.id = "refresher";
refreshbutton.style.position = "absolute";
refreshbutton.innerHTML = "Refresh the page";
document.body.appendChild(refreshbutton);
document.getElementById("refresher").addEventListener("click", reload);
function reload() {
    location.reload();
}
function createRectangle() {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let w = Math.floor(Math.random() * 200) + 1;
    let h = Math.floor(Math.random() * 200) + 1;
    return { "x": x, "y": y, "w": w, "h": h };
}
let rechtecke = createRectangle();
function drawRectangles1(rechtecke) {
    let rndmSquares = document.createElement("div");
    rndmSquares.style.position = "absolute";
    rndmSquares.style.left = rechtecke.x + "px";
    rndmSquares.style.top = rechtecke.y + "px";
    rndmSquares.style.width = rechtecke.w + "px";
    rndmSquares.style.height = rechtecke.h + "px";
    rndmSquares.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    rndmSquares.style.visibility = "visible";
    rndmSquares.id = "rndmSquares";
    document.body.appendChild(rndmSquares);
    document.getElementById("rndmSquares").style.zIndex = "1";
}
drawRectangles1(createRectangle());
drawRectangles1(createRectangle());
drawRectangles1(createRectangle());
let rechteckes = createRectangle();
function drawRectangle1(rechteckes) {
    let rndmSquare = document.createElement("div");
    rndmSquare.style.position = "absolute";
    rndmSquare.style.left = rechteckes.x + "px";
    rndmSquare.style.top = rechteckes.y + "px";
    rndmSquare.style.width = rechteckes.w + "px";
    rndmSquare.style.height = rechteckes.h + "px";
    rndmSquare.style.backgroundColor = "blue";
    rndmSquare.style.visibility = "visible";
    rndmSquare.id = "rndmSquare";
    document.body.appendChild(rndmSquare);
    document.getElementById("rndmSquare").style.zIndex = "1";
}
function drawRectangle2(rechteckes) {
    let rndmsquared = document.createElement("div");
    rndmsquared.style.position = "absolute";
    rndmsquared.style.left = rechteckes.x + "px";
    rndmsquared.style.top = rechteckes.y + "px";
    rndmsquared.style.width = rechteckes.w + "px";
    rndmsquared.style.height = rechteckes.h + "px";
    rndmsquared.style.backgroundColor = "blue";
    rndmsquared.style.visibility = "visible";
    rndmsquared.id = "rndmsquared";
    document.body.appendChild(rndmsquared);
    document.getElementById("rndmsquared").style.zIndex = "1";
}
//# sourceMappingURL=script.js.map