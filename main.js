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
var spawnPoints = [];
var exits = [];
var intPoint = null;
var timeinterval = null;
var carstogen = null;
//creating roads
var spawnInterval = null;
var spawnState = false;
var generated = false;
var lastSpawn = null;
// which cars were colliding with ea/other
var collVeh = new Set();
function start()
{
	exits = [];
	vehicles = [];
	Tchecked = (Tbutton == null)?false:Tbutton.checked;
	var randroad= Math.floor(Math.random()*4);
	var randlenv = (0.85*canvas.height)*Math.random()+(canvas.width*0.1);
	var randlenh = (0.3*canvas.width)*Math.random()+(canvas.height*0.1);
    spawnPoints.length = 0;
	var speed_lim = 1;
    var offset = 35;
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
	//if it is a T intersection one of the roads will be cut off
	if(Tchecked)
	{
        //Randomly select one of the 2 roads to be cut off (0 or 1)
		if (Math.round(Math.random()))
		{
			verticalRoad.side = 0;
			intPoint = new Point(verticalRoad.position+1, CANVAS_HEIGHT);
			spawnPoints.push(new Point(verticalRoad.position + offset, 1),
            new Point(verticalRoad.position + verticalRoad.width - offset, CANVAS_HEIGHT-1));
            if(horizontalRoad.side == 1)
                spawnPoints.push(new Point(1, horizontalRoad.position + horizontalRoad.width - offset));
            else if(horizontalRoad.side == 2)
                spawnPoints.push(new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset));
		}
		else
		{
			horizontalRoad.side = 1;
			intPoint = new Point(CANVAS_WIDTH, horizontalRoad.position+1);
			spawnPoints.push(new Point(1, horizontalRoad.position + horizontalRoad.width - offset),
            new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset));
            if(verticalRoad.side == 0)
                spawnPoints.push(new Point(verticalRoad.position + offset, 1)); 
            else
                spawnPoints.push(new Point(verticalRoad.position + verticalRoad.width - offset, CANVAS_HEIGHT-1));
		}
	}
	else
	{
		horizontalRoad.side = 1;
		verticalRoad.side = 0;
		intPoint = new Point(CANVAS_WIDTH, CANVAS_HEIGHT);
		spawnPoints.push(new Point(verticalRoad.position + offset, 1),
        new Point(verticalRoad.position + verticalRoad.width - offset, CANVAS_HEIGHT-1),
        new Point(1, horizontalRoad.position + horizontalRoad.width - offset),
        new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset));
	}
	master();
}


function spawn_car()
{
	generated = true;
	for (i=0;i<carstogen;i++)
	{
		var randPoint = Math.floor(Math.random()*spawnPoints.length);
		if(lastSpawn == null)
		{
			lastSpawn = randPoint;
		}
		else if(lastSpawn == randPoint)
		{
			while(lastSpawn == randPoint)
			{
				randPoint = Math.floor(Math.random()*spawnPoints.length);
			}
			lastSpawn = randPoint;
		}
		else
		{
			lastSpawn = randPoint;
		}
        var point = spawnPoints[randPoint];
        if(point.x == 1)
            a = EAST;
        else if(point.x == CANVAS_WIDTH -1)
            a = WEST;
        else if(point.y == 1)
            a = SOUTH;
        else if(point.y == CANVAS_HEIGHT-1)
            a = NORTH;
		vehicles.push(new Vehicle(spawnPoints[randPoint].x, spawnPoints[randPoint].y, 30, 60, a));
	}
	lastSpawn = null;
}

function updateDrawCars(car)
{
    car.update();
    car.draw();
    //console.log(car.speed);
}
function removeOutOfBoundCars(car, index, arr)
{
    if(car.x > CANVAS_WIDTH || car.x < 0 || car.y > CANVAS_HEIGHT || car.y < 0)
        arr.splice(index, 1);
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
	handleCollision();
	//ctx.fillStyle = "#00ff3c"
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(document.getElementById("grassImage"),0,0);
	ctx.fillStyle = "#727272"
	horizontalRoad.draw(intPoint.x);
	verticalRoad.draw(intPoint.y);
	if(!spawnState)
	{
		spawnInterval = setInterval(spawn_car, timeinterval*1000);
		spawnState = true;
	}
	else if(spawnState && generated)
	{
		clearInterval(spawnInterval);
		spawnState = false;
		generated = false;
	}
	sliderControl();
	vehicles.forEach(updateDrawCars);
    vehicles.forEach(removeOutOfBoundCars);
	window.requestAnimationFrame(master);
}

function handleCollision(){
	var colliding = collidingCars();
	// Figure out which vehicles sets aren't colliding anymore
	var notColliding = collVeh.difference(colliding);
	for(let i of notColliding){
		i[0].accel = 1;
	}
	// Figure out which are
	for(let i of colliding){	
		//Slow down i[0]
		i[0].speed = i[0].speed/3;
	}
	collVeh = colliding;
}
function collidingCars()
{
	var colliding = new Set();
	for (i = 0; i < vehicles.length; i++) {
		for (j = 0; j < vehicles.length; j++){
			var xDist = Math.abs(vehicles[i].x - vehicles[j].x);
			var yDist = Math.abs(vehicles[i].y - vehicles[j].y);
			if(vehicles[i].end == NORTH || vehicles[i].end == SOUTH){
				angle = Math.abs(Math.atan(xDist/yDist));
			}
			else{
				angle = Math.abs(Math.atan(yDist/xDist));
			}			
			if (xDist*xDist + yDist*yDist < 10000 && angle < Math.PI/3){ // < radius^2 (radius = 60)
				colliding.add([vehicles[i], vehicles[j]]);
			}
		}
	}
	return colliding;
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
function boxCollision(x1,y1,w1,h1,x2,y2,w2,h2){
	return (x1 < x2 + w2 &&
   x1 + w1 > x2 &&
   y1 < y2 + h2 &&
   rh1 + y1 > y2);
}

document.getElementById("start").onclick = start;
document.body.appendChild(canvas);
