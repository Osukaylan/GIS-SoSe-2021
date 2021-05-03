var canvas: HTMLCanvasElement = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

console.log("canvas");


ctx.fillRect(150, 350, 300, 350);
ctx.fillStyle = "rgb(72, 173, 42)";
ctx.fillRect(0, 700, window.innerWidth, 247);

//dach
ctx.beginPath();
ctx.moveTo(100, 350);
ctx.lineTo(300, 250);
ctx.lineTo(500, 350);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = "#A1A1A1";
ctx.fill();

//baum
ctx.fillStyle = "#785926";
ctx.fillRect(700, 350, 100, 450);
var startX: number = 200;
var startY: number = 100;

// draw cloud shape
ctx.beginPath();
ctx.moveTo(170, 80);
ctx.bezierCurveTo(130, 100, 130, 150, 230, 150);
ctx.bezierCurveTo(250, 180, 320, 180, 340, 150);
ctx.bezierCurveTo(420, 150, 420, 120, 390, 100);
ctx.bezierCurveTo(430, 40, 370, 30, 340, 50);
ctx.bezierCurveTo(320, 5, 250, 20, 250, 50);
ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);
ctx.closePath();
ctx.lineWidth = 5;
ctx.fillStyle = "#8ED6FF";
ctx.fill();
ctx.strokeStyle = "#0000ff";
ctx.stroke();

//baum shape
ctx.beginPath();
ctx.moveTo(640, 300);
ctx.bezierCurveTo(600, 320, 600, 370, 670, 370);
ctx.bezierCurveTo(650, 400, 850, 400, 850, 370);
ctx.bezierCurveTo(850, 370, 930, 340, 850, 300);
//ctx.bezierCurveTo(650, 200, 850, 200, 650, 250);
ctx.bezierCurveTo(800, 250, 650, 250, 640, 300);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = "#3CAA2A";
ctx.fill();
ctx.strokeStyle = "#2C7E20";
ctx.stroke();

interface Rectangle1 {
    x: number;
    y: number;
    w: number;
    h: number;
}

function createRect(): Rectangle1 {

    let x: number = Math.floor(Math.random() * window.innerWidth);
    let y: number = Math.floor(Math.random() * window.innerHeight);
    let w: number = Math.floor(Math.random() * 200) + 1;
    let h: number = Math.floor(Math.random() * 200) + 1;
    console.log({"x": x, "y": y, "w": w, "h": h});
    return {"x": x, "y": y, "w": w, "h": h};
    }

let rechteck: Rectangle1 = createRect();    

function drawRect(_rechteck: Rectangle1): void {

    ctx.globalAlpha = 10;
    ctx.fillRect(_rechteck.x, _rechteck.y, _rechteck.w, _rechteck.h);
    ctx.fillStyle = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.strokeRect(_rechteck.x, _rechteck.y, _rechteck.w, _rechteck.h);

}

//drawRect(rechteck);
drawRect(createRect());
drawRect(createRect());
drawRect(createRect());

/*let baba: Rectangle = {"x": 100, "y": 100, "w": 200, "h": 300};

drawRect(baba);*/