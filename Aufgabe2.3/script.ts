const divCreator: HTMLElement = document.createElement("div");

var creator: HTMLElement = document.createElement("BUTTON");
creator.id = "RectangleCreator";
creator.innerHTML = "create a rectangle with me";
document.body.appendChild(creator);
document.getElementById("RectangleCreator").addEventListener("click", createbutton, { once: true });

interface Rectangle1 {
    x: number;
    y: number;
    w: number;
    h: number;
}

function createbutton(): Rectangle1 {
    let x: number = Math.floor(Math.random() * window.innerWidth / 2);
    let y: number = Math.floor(Math.random() * window.innerHeight / 2);
    
    if (y > window.innerHeight) {
        y = - window.innerHeight;
    }

    //let w: number = Math.floor(Math.random() * 200);
    let w: number = Math.floor(Math.random() * 200);

    if (w > window.innerWidth) {
        w = - window.innerWidth;
    }

    let h: number = Math.floor(Math.random() * 200);

    if (h > window.innerHeight) {
        y = - window.innerHeight;
    }

    drawRectangle1(x, y, w, h);
    grassdrawer(0, (window.innerHeight * 2) / 3, window.innerWidth, window.innerHeight / 3);
    housedrawer(200,  (window.innerHeight * 2) / 12, 300, window.innerHeight / 2);
    return { "x": x, "y": y, "w": w, "h": h };
}

function drawRectangle1(x: number, y: number, w: number, h: number): Rectangle1 {

    var rectReturn: Rectangle1 = { h: 0, x: 0, y: 0, w: 0 };

    if (document.createElement) {
        let rndmSquare: HTMLDivElement = document.createElement("div");
        rndmSquare.style.position = "relative";
        rndmSquare.style.left = x + "px";
        rndmSquare.style.top = y + "px";
        rndmSquare.style.width = w + "px";
        rndmSquare.style.height = h + "px";
        rndmSquare.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        rndmSquare.style.visibility = "visible";
        rndmSquare.id = "rndmSquare";
        document.body.appendChild(rndmSquare);
        document.getElementById("rndmSquare").style.zIndex = "1";
        console.log({ "x": x, "y": y, "w": w, "h": h });
        rectReturn.h = h;
        rectReturn.w = w;
        rectReturn.x = x;
        rectReturn.y = y;
    }

    return rectReturn;
}

function grassdrawer(x: number, y: number, w: number, h: number): void {
    let gras: HTMLDivElement = document.createElement("div");
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

function housedrawer(x: number, y: number, w: number, h: number): void {
    let house: HTMLDivElement = document.createElement("div");
    house.style.position = "absolute";
    house.style.left = x + "px";
    house.style.top = y + "px";
    house.style.width = w + "px";
    house.style.height = h + "px";
    house.style.backgroundColor = "gray";
    house.style.visibility = "visible";
    document.body.appendChild(house);
}

let refreshbutton: HTMLElement = document.createElement("BUTTON");
refreshbutton.id = "refresher";
refreshbutton.style.position = "absolute";
refreshbutton.innerHTML = "Refresh the page";
document.body.appendChild(refreshbutton);
document.getElementById("refresher").addEventListener("click", reload);

function reload(): void {
    location.reload();
}