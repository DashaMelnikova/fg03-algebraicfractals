COS60 = Math.cos(Math.PI / 3);
SIN60 = Math.sin(Math.PI / 3);

function getNewtonIteration(x,y,iter,n) {
	if (n == 0) return {at : 0, it : iter};
	if (neighboringPoint(x, y, 1, 0))return {at : 1, it : iter};
	if (neighboringPoint(x, y, -COS60, SIN60))return {at : 2, it : iter};
	if (neighboringPoint(x, y, -COS60, -SIN60))return {at : 3, it : iter};
	var a = x * x;
	var b = y * y;
	var newX = 2 * x / 3 + (a - b) / (3 * Math.pow((a + b), 2));
	var newY = 2 * y * (1 - x / Math.pow((a + b), 2)) / 3;
	return getNewtonIteration(newX, newY, iter + 1, n - 1);
}

function neighboringPoint(x1,y1,x2,y2) {
	var epsilon = 0.0001;
	return Math.abs(x1 - x2) <= epsilon && Math.abs(y1 - y2) <= epsilon;
}