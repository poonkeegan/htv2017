

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

var vehicle = {
}

var road = {
}
