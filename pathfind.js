
/**
*SOURCE: https://en.wikipedia.org/wiki/A*_search_algorithm
*/
function distance(start, goal){
	xDis = Math.abs(start.x - goal.x);
	yDis = Maths.abs(start.y - goal.y);
	return xDis + yDis;
}

function reconstructPath(cameFrom, currNode){
	totalPath = [currNode];
	while(cameFrom.has(currNode)){
		currNode = cameFrom[currNode];
		totalPath.push(currNode);
	}
	return totalPath;
}

function aStar(start, goal){

	evaluatedSet = new Set();
	openSet = new Set();
	openSet.add(start);

	cameFrom = new Map();

	gScore = new Map();
	gScore.set(start, 0);

	fScore = new Map();
	fscore.set(start, distance(start, goal));

	while (openSet.size > 0){
		// Find node with lowest fscore;
		var curr = null;
		var lowFscore = Infinity;
		for(let i of x) {
			if (fScore.get(i) < lowFscore){
				curr = i;
				lowFscore = fScore.get(i);
			}
		}

		if(curr == goal){
			return reconstructPath(cameFrom, curr);
		}

		openSet.delete(curr);
		evaluatedSet.add(curr);
		// Loop through 4 possible intersection adjacent to current
		for(int i = 0; i < 4; i++){
			neighbour = curr.intersections[i];
			if(!evaluatedSet.has(neighbour){
				tempGscore = gScore.get(curr) + curr.getInterDist(i);
				if(!openSet.has(neighbour){
					openSet.add(neighbour);
					fScore.set(neighbour, Infinity);
					gScore.set(neighbour, Infinity);
				}
				if(tempGscore < gScore.get(neighbour)){
					cameFrom.set(neighbour, curr);
					gScore.set(neighbour, tempGscore);
					fScore.set(neighbour, gScore.get(neighbour) + distance(neighbour, goal));
				}
			}
		}
	}
}