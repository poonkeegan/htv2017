var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext("2d");
ctx.strokeRect(100,100,50,60);
ctx.strokeRect(0,0,canvas.width,canvas.height);
document.body.appendChild(canvas);
