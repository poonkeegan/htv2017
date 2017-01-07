var canvas = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");

//running is a var to show whether the canvas has been drawn or not
var running = false;
function drawCanvas()
{
	var sbutton = document.getElementById("start");
	var Tbutton = document.getElementById("T");
	var fourwaybutton = document.getElementById("4way");
	var iform = document.getElementById("interform");
	var Tchecked = Tbutton.checked;
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
		document.body.appendChild(canvas);
		sbutton.value="Stop";
		running = true;
		iform.style.visibility = "hidden";
	}
	else
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		sbutton.value="Start";
		running = false;
		iform.style.visibility = "visible";
	}
}

function create4Way()
{
	road_width = 200;
	hbound = 0.3;
	vbound = 0.85;
	hoffset = 0.1;
	voffset = 0.1;
	randlenv = (vbound*canvas.height)*Math.random()+(canvas.width*voffset);
	randlenh = (hbound*canvas.width)*Math.random()+(canvas.height*hoffset);
	horizontalRoad = new Road(road_width, 1, randlenh);
	verticalRoad = new Road(road_width, 0, randlenv);
	horizontalRoad.draw(canvas.width);
	verticalRoad.draw(canvas.height);
}

function createTRoad()
{
	road_width = 200;	
	randroad = (4*Math.random());
	randroad = Math.floor(randroad);	
	hbound = 0.3;
	vbound = 0.85;
	hoffset = 0.1;
	voffset = 0.1;
	randlenv = (vbound*canvas.height)*Math.random()+(canvas.width*voffset);
	randlenh = (hbound*canvas.width)*Math.random()+(canvas.height*hoffset);
	if(randroad == 0 || randroad == 3)
	{
		verticalRoad = new Road(road_width, randroad, randlenv);
		horizontalRoad = new Road(road_width, 1, randlenh);
		horizontalRoad.draw(canvas.width);
		verticalRoad.draw(randlenh + 1);
	}
	else{
		verticalRoad = new Road(road_width, 0, randlenv);
		horizontalRoad = new Road(road_width, randroad, randlenh);
		horizontalRoad.draw(randlenv + 1);
		verticalRoad.draw(canvas.height);
		console.log("randlenv: " + randlenv + " randlenh: " + randlenh + " randroad: " + randroad);
	}
}