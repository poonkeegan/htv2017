function create4Way()
{
	road_width = 200;
	speed_lim = 60;
	hbound = 0.3;
	vbound = 0.85;
	hoffset = 0.1;
	voffset = 0.1;
	randlenv = (vbound*canvas.height)*Math.random()+(canvas.width*voffset);
	randlenh = (hbound*canvas.width)*Math.random()+(canvas.height*hoffset);
	horizontalRoad = new Road(road_width, 1, randlenh, speed_lim);
	verticalRoad = new Road(road_width, 0, randlenv, speed_lim);
	horizontalRoad.draw(canvas.width);
	verticalRoad.draw(canvas.height);
	roads.push(horizontalRoad);
	roads.push(verticalRoad);
}

function createTRoad()
{
	road_width = 200;	
	speed_lim = 60;
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
		verticalRoad = new Road(road_width, randroad, randlenv, speed_lim);
		horizontalRoad = new Road(road_width, 1, randlenh, speed_lim);
		horizontalRoad.draw(canvas.width);
		verticalRoad.draw(randlenh + 1);
	}
	else{
		verticalRoad = new Road(road_width, 0, randlenv, speed_lim);
		horizontalRoad = new Road(road_width, randroad, randlenh, speed_lim);
		horizontalRoad.draw(randlenv + 1);
		verticalRoad.draw(canvas.height);
		console.log("randlenv: " + randlenv + " randlenh: " + randlenh + " randroad: " + randroad);
	}
	roads.push(horizontalRoad);
	roads.push(verticalRoad);
}