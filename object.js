

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
		ctx.rotate(angle);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		//Strok Erect
	}

}

function Road(w, s, p) {
	this.width = w;
	// Which side of the screen(top, left) does this
	// road start from
	this.side = s;
	// How far from the origin does this road start from
	this.position = p;
	this.draw = function (end){
		if(side == 0){
			ctx.strokeRect(this.position, 0, this.width, end);
		}else if (side == 1){
			ctx.strokeRect(0, this.position, end, this.width);

		}else if (side == 2){
			ctx.strokeRect(end, this.position, CANVAS_WIDTH - end, this.width);

		}else if (side == 3){
			ctx.strokeRect(this.position, end, this.width, CANVAS_HEIGHT - end);

		}
	}
}