function print(text)
{
	document.getElementById('test').innerHTML = text;
}
function rad(degree)
{
    return degree * (Math.PI / 180);
}
function degree(rad)
{
    return rad * (180 / Math.PI);
}
function mod(n,m)
{
    return((n % m) + m) % m;
}
function dist(p1, p2) 
{
    return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y)
}
function Point(x,y){
	this.x = x;
	this.y = y;
}
function Line(p1, p2){
	this.p1 = p1;
	this.p2 = p2;
}
function crossProduct(a, b)
{
	return (a.x * b.y - b.x * a.y);
}
function isPointOnLine(line, point)
{
	var tmpP1 = new Point(line.p2.x - line.p1.x, line.p2.y - line.p1.y);
	var tmpP2 = new Point(point.x - line.p1.x, point.y - line.p1.y);
	var t = crossProduct(tmpP1, tmpP2);
	if(t == 0)
	return (Math.abs(t) == 0);
}

function isPointRightOfLine(line, point)
{
	var tmpP1 = new Point(line.p2.x - line.p1.x, line.p2.y - line.p1.y); //create 2 vectors starting at (0,0) => meaning we only need a x and y for the vector (so a point).
	var tmpP2 = new Point(point.x - line.p1.x, point.y - line.p1.y);
	return (crossProduct(tmpP1, tmpP2) < 0);
}
function lineTouchesOrCrosses(line1, line2)
{
	return (isPointOnLine(line1, line2.p1) || 
	isPointOnLine(line1, line2.p2) || 
	(isPointRightOfLine(line1, line2.p1) ^ isPointRightOfLine(line1, line2.p2)));
}
function lineIntersect(line1, line2)
{
	return lineTouchesOrCrosses(line1, line2) && lineTouchesOrCrosses(line2, line1);
}
function getMousePos(canvas, evt)
{
	var box = canvas.getBoundingClientRect();
	return new Point(evt.clientX - box.left, evt.clientY - box.top);
}