var canvas = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");
Tbutton = document.getElementById("T");
fourwaybutton = document.getElementById("4way");
iform = document.getElementById("interform");
formtext = document.getElementById("formtext");
//roads = [];
var vehicles = [];
var spawnPoints = [];
var endPoints = [];
var offset = 35;
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

document.getElementById("timeslider").onchange = function(){
    sliderControl();
};
document.getElementById("carslider").onchange = function(){
    sliderControl();
};

function start()
{
    vehicles.length = 0;
	Tchecked = (Tbutton == null)?false:Tbutton.checked;
	var randroad= Math.floor(Math.random()*4);
	var randlenv = (0.75*canvas.height)*Math.random()+(canvas.width*0.1);
	var randlenh = (0.3*canvas.width)*Math.random()+(canvas.height*0.1);
    
    spawnPoints.length = 0;
    endPoints.length = 0;
	var speed_lim = 1;
    
    sliderControl();
    var spawnInterval = setInterval(spawn_car, timeinterval*1000);
    
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
            endPoints.push(new Point(verticalRoad.position + offset, CANVAS_HEIGHT - 1),
            new Point(verticalRoad.position + verticalRoad.width - offset, 1));
            if(horizontalRoad.side == 1)
            {
                spawnPoints.push(new Point(1, horizontalRoad.position + horizontalRoad.width - offset));
                endPoints.push(new Point(1, horizontalRoad.position + offset));
            }
            else if(horizontalRoad.side == 2)
            {
                spawnPoints.push(new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset));
                endPoints.push(new Point(CANVAS_WIDTH -1, horizontalRoad.position + horizontalRoad.width - offset));
            }
        }
		else
		{
			horizontalRoad.side = 1;
			intPoint = new Point(CANVAS_WIDTH, horizontalRoad.position+1);
			spawnPoints.push(new Point(1, horizontalRoad.position + horizontalRoad.width - offset),
            new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset));
            endPoints.push(new Point(CANVAS_WIDTH - 1, horizontalRoad.position + horizontalRoad.width - offset),
            new Point(1, horizontalRoad.position + offset));
            if(verticalRoad.side == 0)
            {
                spawnPoints.push(new Point(verticalRoad.position + offset, 1)); 
                endPoints.push(new Point(verticalRoad.position + verticalRoad.width - offset, 1)); 
            }
            else
            {
                spawnPoints.push(new Point(verticalRoad.position + verticalRoad.width - offset, CANVAS_HEIGHT-1));
                endPoints.push(new Point(verticalRoad.position + offset, CANVAS_HEIGHT-1));
            }
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
        
        for(i = 0; i < 4; i++)
               endPoints.push(findEndPoint(i));
    }
	master();
}

function findEndPoint(side)
{
    if(side == 0)
        return new Point(verticalRoad.position + verticalRoad.width - offset, 1);
    else if(side == 1)
        return new Point(1,horizontalRoad.position + offset);
    else if(side == 2)
        return new Point(CANVAS_WIDTH - 1, horizontalRoad.position + horizontalRoad.width - offset);
    else if(side == 3)
        return new Point(verticalRoad.position + offset, CANVAS_HEIGHT-1);
}
function findStartPoint(side)
{
    if(side == 0)
        return new Point(verticalRoad.position + offset, 1);
    else if(side == 1)
        return new Point(1, horizontalRoad.position + horizontalRoad.width - offset);
    else if(side == 2)
        return new Point(CANVAS_WIDTH - 1, horizontalRoad.position + offset); 
    else if(side == 3)
        return new Point(verticalRoad.position + verticalRoad.width - offset, CANVAS_HEIGHT-1);
}
function side(point)
{
    if(point.y == 1)
        return 0;
    else if(point.y == CANVAS_HEIGHT -1)
        return 3;
    else if(point.x == 1)
        return 1;
    else if(point.x == CANVAS_WIDTH -1 )
        return 2;
}
function spawn_car()
{
	var lastSpawn = null;
	for (i=0;i<carstogen;i++)
	{
		var rand1 = Math.floor(Math.random()*spawnPoints.length);
		if(lastSpawn == null)
 		{
 			lastSpawn = rand1;
 		}
 		else if(lastSpawn == rand1)
 		{
 			while(lastSpawn == rand1)
 			{
 				rand1 = Math.floor(Math.random()*spawnPoints.length);
 			}
 			lastSpawn = rand1;
 		}
 		else
 		{
 			lastSpawn = rand1;
 		}
        var startPoint = spawnPoints[rand1];
        do{
            var rand2 = Math.floor(Math.random()*endPoints.length);
            var endPoint = endPoints[rand2];
        }while(side(endPoint) == side(startPoint));
        
        if(startPoint.x == 1)
            vehicles.push(new Vehicle(startPoint.x, startPoint.y, 30, 60, EAST, endPoint));
        else if(startPoint.x == CANVAS_WIDTH -1)
            vehicles.push(new Vehicle(startPoint.x, startPoint.y, 30, 60, WEST, endPoint));
        else if(startPoint.y == 1)
            vehicles.push(new Vehicle(startPoint.x, startPoint.y, 30, 60, SOUTH, endPoint));
        else if(startPoint.y == CANVAS_HEIGHT-1)
            vehicles.push(new Vehicle(startPoint.x, startPoint.y, 30, 60, NORTH, endPoint));
	lastSpawn = null;
}
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
function master(){
	//handleCollision();
	collidingCars();
	//ctx.fillStyle = "#00ff3c"
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(document.getElementById("grassImage"),0,0);
	ctx.fillStyle = "#727272"
	horizontalRoad.draw(intPoint.x);
	verticalRoad.draw(intPoint.y);
	vehicles.forEach(updateDrawCars);
    vehicles.forEach(removeOutOfBoundCars);
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
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawn_car, timeinterval*1000);
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
			if ((vehicles[i].end == NORTH && vehicles[j].end == SOUTH) || vehicles[i]==SOUTH && vehicles[j]==NORTH){

			}
			else if ((vehicles[i].end == EAST && vehicles[j].end == WEST) || vehicles[i]==WEST && vehicles[j]==EAST)
			{

			}
			else if (xDist*xDist + yDist*yDist < 10000 && angle < Math.PI/3){ // < radius^2 (radius = 60)
				vehicles[i].accel = (xDist*xDist)+(yDist*yDist) - 400000;
			}
			else if (!(xDist*xDist + yDist*yDist < 10000 && angle < Math.PI/3)){ // < radius^2 (radius = 60)
				
				vehicles[i].accel = 0.1;
			}
		}
	}
	
}

function boxCollision(x1,y1,w1,h1,x2,y2,w2,h2){
	return (x1 < x2 + w2 &&
   x1 + w1 > x2 &&
   y1 < y2 + h2 &&
   rh1 + y1 > y2);
}

document.getElementById("start").onclick = start;
document.body.appendChild(canvas);
