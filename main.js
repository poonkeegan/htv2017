var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext("2d");

//running is a var to show whether the canvas has been drawn or not
var running = false;
function drawCanvas()
{
	var sbutton = document.getElementById("start");
	var Tbutton = document.getElementById("T");
	var fourwaybutton = document.getElementById("4way");
	var iform = document.getElementById("interform");
	if(!running)
	{
		ctx.strokeRect(0,0,canvas.width,canvas.height);
		if(Tbutton.checked)
		{
			ctx.strokeRect(0,100,canvas.width,60);
			ctx.strokeRect((canvas.width/3)+10,100,((canvas.width/3)+20),canvas.height);
		}
		else
		{
			ctx.strokeRect(0,100,canvas.width,60);
			ctx.strokeRect((canvas.width/3)+10,0,((canvas.width/3)+20),canvas.height);
		}
		document.body.appendChild(canvas);
		sbutton.value="Stop";
		running = true;
		iform.style.visibility = "hidden"
	}
	else
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		sbutton.value="Start";
		running = false;
		iform.style.visibility = "visible"
	}
}

