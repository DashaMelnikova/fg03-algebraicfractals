function getJuliaIteration(x0, y0, a, b, n) {
	var x = x0;
	var y = y0;
	var newX = 0;
	var newY = 0;
	var count = 0;
	while (count < n) {
		if (x * x + y * y > 4)
			return count;
		newX = x * x - y * y + a;
		newY = 2 * x * y + b;
		x = newX;
		y = newY;
		count++;
	}
	return 0;
}