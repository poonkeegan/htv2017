function Vehicle(x, y, w, h, t, end) {
	this.x = x;
	this.y = y;
	var carImg = document.getElementById("carImage");
	this.width = w;
	this.height = h;
	this.angle = t;
	this.accel = 0;
	this.speed = 4;
	this.maxSpeed = 4;
	this.minSpeed = 0.5;
    this.turn = t;
    this.end = end;
	this.xspeed = function () {
		return Math.sin(rad(this.angle)) * this.speed;
	};
	this.yspeed = function () {
		return Math.cos(rad(this.angle)) * this.speed;
	};
	this.update = function() {
        if(this.y != this.end.y && this.x != this.end.x)
        {
            if(this.turn == EAST && this.x - this.end.x >= -TURN_DIST)
            {
                this.turn = (this.end.y == 1) ? NORTH: SOUTH;
            }
            else if(this.turn == WEST && this.x - this.end.x <= TURN_DIST)
            {
                this.turn = (this.end.y == 1) ? -NORTH: SOUTH;
            }
            else if(this.turn == SOUTH && this.y - this.end.y >= -TURN_DIST) 
            {
                this.turn = (this.end.x == 1) ? WEST: EAST;
            }
            else if(this.turn == NORTH && this.y - this.end.y <= TURN_DIST)
            {
                this.turn == (this.end.x == 1)? -WEST : EAST;
            }
        }
		if(this.turn && this.angle != this.turn)
        {
            if(this.angle < this.turn)
            {
                this.angle += 2;
            }
            else if(this.angle > this.turn)
            {
                this.angle -= 2;
            }
        }
        this.speed += this.accel;
        if(this.speed > this.maxSpeed){
        	this.speed = this.maxSpeed;
        	this.accel--;
        }
        if (this.speed< this.minSpeed){
        	this.speed=this.minSpeed;
        }
        this.x += this.xspeed();
        this.y += this.yspeed();
	}
	this.draw = function (){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(rad(-this.angle));
		//ctx.fillStyle=("#FF0000");
		//ctx.fillRect(0, 0, this.width, this.height);
		//ctx.fillStyle=("#6a6a6a");
		ctx.drawImage(carImg,0,0);
		ctx.restore();
		//Strok Erect
		//TBTacoLeft TBTacoCheesePull TBTacoRight
	}

}

function Road(w, s, p, l) {
	this.width = w;
	// Which side of the screen(top, left) does this
	// road start from
	this.side = s;
	// How far from the origin does this road start from
	this.position = p;
	// speed limit
	this.limit = l;
	this.draw = function (end){
		if(this.side == 0){
			ctx.fillRect(this.position, 0, this.width, end);
		}else if (this.side == 1){
			ctx.fillRect(0, this.position, end, this.width);

		}else if (this.side == 2){
			ctx.fillRect(end, this.position, CANVAS_WIDTH - end, this.width);

		}else if (this.side == 3){
			ctx.fillRect(this.position, end, this.width, CANVAS_HEIGHT - end);

		}
	}
}

	
function Intersection(hRoad, vRoad) {
	this.horRoad = hRoad;
	this.verRoad = vRoad;
	this.x = vRoad.p;
	this.y = hRoad.p;
	this.intersections = new Array(4);
	this.setInter = new function(pos, inter){
		intersections[pos] = inter;
	}
	this.getInterDist = new function(interPos){
		if(interPos < 0 || interPos >= 4){
			return -1;
		}else if(interPos == 0 || interPos == 3) {
			return Math.abs(this.y - this.intersections[interPos].y);
		}else {
			return Math.abs(this.x - this.intersections[interPos].y);
		}
	}
}
