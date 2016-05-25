function zebra(n) 
{
    if (n % 2 == 0) {return {r:0, g:0, b:0, op:255};} 
	else {return {r:255, g:255, b:255, op:255};}
}

function level(n) 
{
    var k = n;
    n = param.n;
    var brightness = 0;
	if (n > 1) {brightness = 255 * k * 4 / (n - 1);}
	else {brightness =	255;}
	
    return {r:brightness, g:brightness/3, b:255 , op:255};
}

function classic(d) 
{
    if (d == 0) {return {r:0, g:0, b:0, op:255};}
	else {return {r:255, g:255, b:255, op:255};}
}

function classical(attractor) 
{
    var opacity = 255;
    var red = 0;
    var green = 0;
    var blue = 0;
	
    switch (attractor) 
	{
        case 1: red = 255;
            break;
        case 2: green = 255;
            break;
        case 3: blue = 255;
            break;
    }
    return {r:red, g:green, b:blue, op:opacity};
}

function gibrid(attractor, n)
{
    var opacity = 255;
    var red = 0;
    var green = 0;
    var blue = 0;
    var k = n;
    n = param.n;
	var color = 255 * k / (n - 1);
    switch (attractor) 
	{
        case 1:
            red = n != 0 ? color : 255;
            break;
        case 2:
            green = n != 0 ? color : 255;
            break;
        case 3:
            blue = n != 0 ? color : 255;
            break;
    }
    return {r:red, g:green, b:blue, op:opacity};

}