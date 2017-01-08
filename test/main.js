var canvas = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");
//test code
ctx.strokeRect(0,0,canvas.width,canvas.height);
//var car = new Vehicle(200, 0, 20, 40, 0, new Point(200, 0));
var car2 = new Vehicle(200, 0, 20, 40, 0, new Point(200, 0));

var pause = false;
//master loop
function master()
{
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.moveTo(0, 92.2568);
    ctx.lineTo(CANVAS_WIDTH, 92.2568);
    ctx.stroke();
    ctx.closePath();
   // car.update();
    car2.update();
    //car.draw();
    car2.draw();
    if(!pause)
        window.requestAnimationFrame(master);
}
master();
function mouseClick(evt)
{
    var pos = getMousePos(canvas, evt);
    //car.dest = new Point(200-92.2568, 92.2568);
    car2.dest = new Point(200+92.2568, 92.2568);
    pause = !pause;
    if(!pause)
        master();
    //print(pos.x + " " + pos.y);
}
window.addEventListener("click", mouseClick);
document.body.appendChild(canvas);
