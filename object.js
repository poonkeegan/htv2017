

function Vehicle(x, y, w, h, a, accel) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.angle = a;
	this.speed = 0;
	this.xspeed = function () {
		return Math.cos(this.angle) * this.speed;
	};
	this.yspeed = function () {
		return Math.cos(this.angle) * this.speed;
	};

}

function Road(w, s, p) {
	this.width = w;
	// Which side of the screen(top, left) does this
	// road start from
	this.side = s;
	// How far from the origin does this road start from
	this.position = p;
}

var vehicle = {
}

var road = {
}
