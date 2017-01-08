function Vehicle(x, y, w, h, a) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.angle = a;
	this.accel = 0;
	this.speed = 0;
	this.xspeed = function () {
		return Math.cos(this.angle) * this.speed;
	};
	this.yspeed = function () {
		return Math.cos(this.angle) * this.speed;
	};
	this.update = function() {
		this.speed += this.accel;
		this.x += this.xspeed();
		this.y += this.yspeed();
	}
	this.draw = function (){
		ctx.save();
		ctx.translate(this.x + this.width/2, this.y + this.height/2);
		ctx.rotate(this.angle);
		ctx.fillStyle=("#FF0000");
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.fillStyle=("#000000");
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
