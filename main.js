var canvas = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");
Tbutton = document.getElementById("T");
fourwaybutton = document.getElementById("4way");
iform = document.getElementById("interform");
formtext = document.getElementById("formtext");
//roads = [];
vehicles = [];
var exits = [];
var intPoint = null;
var timeinterval = null;
var carstogen = null;
//creating roads
var spawnState = true;
function start()
{
	exits = [];
	vehicles = [];
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


function spawn_car()
{
	for (i=0;i<carstogen;i++)
	{
		if (!Tchecked)
		{
			start_position = Math.floor(4*Math.random());

		}
		else
		{
			start_position = Math.floor(3*Math.random());
			start_position = exits[start_position];
				
		}
		if (start_position == 0)
		{
			x = verticalRoad.position+((ROAD_WIDTH)/12);
			y = -30;
			a = rad(0);
		}
		else if (start_position == 1)
		{
			x = 40;
			y = horizontalRoad.position+((3*ROAD_WIDTH)/5);
			a = rad(90);
		}
		else if (start_position == 2)
		{
			x = canvas.width - 70;
			y = horizontalRoad.position+((ROAD_WIDTH)/12);
			a = rad(270);
		}
		else if (start_position == 3)
		{
			x = verticalRoad.position+((9*ROAD_WIDTH)/12);
			y = canvas.height-30;
			a = rad(180);
		}
		vehicles.push(new Vehicle(x,y,30,60,a));
	}
}

function drawCar()
{
	for(i=0;i<vehicles.length;i++)
	{
		vehicles[i].draw();
		//console.log(carstogen);
	}
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
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle=("#00ff30");
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle=("#6a6a6a");
	horizontalRoad.draw(intPoint.x);
	verticalRoad.draw(intPoint.y);
	sliderControl();
	if(spawnState)
	{
		setInterval(spawn_car, timeinterval*1000);
		spawnState = false;
	}
	drawCar();
	console.log(vehicles);
	window.requestAnimationFrame(master);
}

function sliderControl()
{
	timeslider = document.getElementById("timeslider");
	document.getElementById("timeinterval").innerHTML = timeslider.value;
	timeinterval = timeslider.value;
	carslider = document.getElementById("carslider");
	document.getElementById("carinterval").innerHTML = carslider.value;
	carstogen = carslider.value;
}

document.getElementById("start").onclick = start;
document.body.appendChild(canvas);
