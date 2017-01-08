var canvas = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");
Tbutton = document.getElementById("T");
fourwaybutton = document.getElementById("4way");
iform = document.getElementById("interform");

formtext = document.getElementById("formtext");
//roads = [];
//vehicles = [];
var exits = [];
var intPoint = null;
//creating roads
function start()
{
	exits = [];
	Tchecked = (Tbutton == null)?false:Tbutton.checked;
	var randroad= Math.floor(Math.random()*4);
	var randlenv = (0.85*canvas.height)*Math.random()+(canvas.width*0.1);
	var randlenh = (0.3*canvas.width)*Math.random()+(canvas.height*0.1);
	var speed_lim = 1;
	if(randroad == 0 || randroad == 3)
	{
		verticalRoad = new Road(ROAD_WIDTH, randroad, randlenv, speed_lim);
		horizontalRoad = new Road(ROAD_WIDTH, 1, randlenh, speed_lim);
	}
	else
	{
		verticalRoad = new Road(ROAD_WIDTH, 0, randlenv, speed_lim);
		horizontalRoad = new Road(ROAD_WIDTH, randroad, randlenh, speed_lim);
	}
	
	if(Tchecked)
	{
		if (Math.round(Math.random()))
		{
			verticalRoad.side = 0;
			intPoint = new Point(verticalRoad.position+1, CANVAS_HEIGHT);
			exits.push(0);
			exits.push(horizontalRoad.side);
			exits.push(3);
		}
		else
		{
			horizontalRoad.side = 1;
			intPoint = new Point(CANVAS_WIDTH, horizontalRoad.position+1);
			exits.push(1);
			exits.push(2);
			exits.push(verticalRoad.side);
		}
	}
	else
	{
		horizontalRoad.side = 1;
		verticalRoad.side = 0;
		intPoint = new Point(CANVAS_WIDTH, CANVAS_HEIGHT);
		exits.push(0);
		exits.push(1);
		exits.push(2);
		exits.push(3);
	}
	master();
}
//running is a var to show whether the canvas has been drawn or not
/*
var running = false;
function drawCanvas()
{
	sbutton = document.getElementById("start");
	Tbutton = document.getElementById("T");
	fourwaybutton = document.getElementById("4way");
	iform = document.getElementById("interform");
	Tchecked = (Tbutton == null)?false:Tbutton.checked;
	formtext = document.getElementById("formtext");
	//if more than 2 intersections add more variables and booleans
	if(!running)
	{
		ctx.strokeRect(0,0,canvas.width,canvas.height);
		if(Tchecked)
		{
			//draw tbutton
			createTRoad();
		}
		else
		{
			create4Way();
		}
		ctx.fillStyle=("#BED0BE");
		//ctx.fillRect(100,100,35,70);
		document.body.appendChild(canvas);
		sbutton.value="Stop";
		running = true;
		iform.style.visibility = "hidden";
		formtext.style.visibility = "hidden";
	}
	else
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle=("#000000");
		sbutton.value="Start";
		running = false;
		iform.style.visibility = "visible";
		formtext.style.visibility = "visible";
		//roads = [];
	}

}
*/
function master(){
	if(intPoint != null){window.alert(horizontalRoad.side);}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	horizontalRoad.draw(intPoint.x);
	verticalRoad.draw(intPoint.y);
	sliderControl();
	window.requestAnimationFrame(master);
}
function sliderControl()
{
	var timeinterval = document.getElementById("timeslider");
	document.getElementById("timeinterval").innerHTML = timeinterval.value;
	var carstogen = document.getElementById("carslider");
	document.getElementById("carinterval").innerHTML = carstogen.value;
}
function test()
{
	window.alert("butt");
}
document.getElementById("start").onclick = start;
document.body.appendChild(canvas);