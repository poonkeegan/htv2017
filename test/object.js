function Vehicle(x, y, w, h, a, pos) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.angle = a;
	this.accel = 0;
	this.speed =3;
    this.dest = pos;
	this.xspeed = function() {
        return Math.sin(rad(this.angle)) * this.speed;
	};
	this.yspeed = function () {
		return Math.cos(rad(this.angle)) * this.speed;
	};
	this.update = function() {
		var angle = degree(Math.atan2((this.dest.x-this.x), (this.dest.y-this.y)));
        var result = mod((this.angle - angle), 360);
        var angularVelocity = ((result%180)/180 + 1);
        
        if(result >= 180)
        {
            this.angle += angularVelocity;
        }
        else if(result < 180)
        {
            this.angle -= angularVelocity;
        }
        if(result%180 < 1){
            this.angle = angle;
        }
        print(this.angle + " "+ angle + " "+this.xspeed() + " "+this.yspeed()+"<br>"+this.dest.x+" "+this.dest.y);
        var d = dist(new Point(this.x, this.y), new Point(this.dest.x, this.dest.y));
        if(d > 5)
        {
            this.x += this.xspeed();
            this.y += this.yspeed();
        }
	}
	this.draw = function (){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.dest.x, this.dest.y);
        ctx.stroke();
        ctx.closePath();
        ctx.save();
        ctx.translate(this.x-(this.width/2), this.y);
		ctx.rotate(rad(-this.angle));
		ctx.strokeRect(-this.width/2, 0, this.width, this.height);
        ctx.restore();
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