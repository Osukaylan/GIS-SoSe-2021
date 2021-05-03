"use strict";
const divCreator = document.createElement("div");
var creator = document.createElement("BUTTON");
creator.id = "RectangleCreator";
creator.innerHTML = "create a rectangle with me";
document.body.appendChild(creator);
document.getElementById("RectangleCreator").addEventListener("click", createbutton, { once: true });
function createbutton() {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    if (y > window.innerHeight) {
        y = -200;
    }
    let w = Math.floor(Math.random() * 200);
    if (w > window.innerWidth) {
        w = -200;
    }
    let h = Math.floor(Math.random() * 200);
    if (h > window.innerHeight) {
        y = -200;
    }
    drawRectangle1(x, y, w, h);
    grassdrawer(0, window.innerHeight * 0.667, window.innerWidth, window.innerHeight / 3);
    housedrawer(200, window.innerHeight - 712, 300, 400);
    return { "x": x, "y": y, "w": w, "h": h };
}
function drawRectangle1(x, y, w, h) {
    var rectReturn = { h: 0, x: 0, y: 0, w: 0 };
    if (document.createElement) {
        let rndmSquare = document.createElement("div");
        rndmSquare.style.position = "absolute";
        rndmSquare.style.left = x + "px";
        rndmSquare.style.top = y + "px";
        rndmSquare.style.width = w + "px";
        rndmSquare.style.height = h + "px";
        rndmSquare.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        rndmSquare.style.visibility = "visible";
        rndmSquare.id = "rndmSquare";
        document.body.appendChild(rndmSquare);
        console.log({ "x": x, "y": y, "w": w, "h": h });
        rectReturn.h = h;
        rectReturn.w = w;
        rectReturn.x = x;
        rectReturn.y = y;
    }
    return rectReturn;
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
    document.body.appendChild(house);
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
//# sourceMappingURL=script.js.map