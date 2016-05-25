function getMandelbrotIteration(a,b,n) {
	var x = 0;
	var y = 0;
	var newX = 0;
	var newY = 0;
	var count = 0;
	while (count < n) {
		newX = x * x - y * y + a;
		newY = 2 * x * y + b;
		if (newX * newX + newY * newY > 4)
			return count;
		x = newX;
		y = newY;
		count++;
	}
	return 0;
}