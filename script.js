function setOfVariables(){
	this.left = -2.5;
	this.top = 2.5;
	this.right = 2.5;
	this.bottom = -2.5;
	this.width = 600;
	this.height = 600;
	this.n;
    this.color;
    this.method;
    this.a;
    this.b;
	this.getComplexCoordinats = function (x, y) 
	{
        var i = x * (this.right - this.left) / (this.width - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.height - 1) + this.top;
        return {x: i, y: j};
    };
	this.read = function ()
	{
        this.n = Number(document.getElementById("iter").value);
        this.color = Number(document.getElementById("color").value);
        this.method = Number(document.getElementById("method").value);
        this.a = Number(document.getElementById("x").value);
        this.b = Number(document.getElementById("y").value);
		return this;
	}
	this.whatMethod = function(x, y)
	{
		switch (this.method) 
			{
                case 0: return getNewtonIteration(x, y, 0, this.n);
                    break;
                case 1: return getMandelbrotIteration(x, y, this.n);
                    break;
                case 2: return getJuliaIteration(x, y, this.a, this.b, this.n); 
                    break;
            }
	}
	this.whatColouring = function(at, ar)
	{
		switch (this.color) 
			{
                case 0: 
                    if (this.method == 0)
                        return classical(at);
                    else
                        return classic(ar);
                    break;
                case 1: return level(ar);
					break;
                case 2: return zebra(ar); 
					break;
                case 3: return gibrid(at, ar);
					break;
            }
	}
}
var param = new setOfVariables();

function draw() 
{
	param.read();
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(param.width, param.height);
    for (var i = 0; i < param.width; ++i)
        for (var j = 0; j < param.height; ++j) 
		{
            var p = param.getComplexCoordinats(i, j);
            var attractor;
			var marker;
			
            attractor = param.whatMethod(p.x, p.y);
			
			if (param.method == 0)
			{
				var attract = attractor.at;
				var attractor = attractor.it;
			}
			
			marker = param.whatColouring(attract, attractor);
            
			imageData.data[4 * (i + canvas.width * j) + 0] = marker.r;
            imageData.data[4 * (i + canvas.width * j) + 1] = marker.g;
            imageData.data[4 * (i + canvas.width * j) + 2] = marker.b;
            imageData.data[4 * (i + canvas.width * j) + 3] = marker.op;
        }
    context.putImageData(imageData, 0, 0);
}
  
 var cl = document.getElementById('canvas');
    cl.addEventListener('click', getClickXY, false);
    
 function getClickXY(event)
    {
        var clickX = (event.layerX == undefined ? event.offsetX : event.layerX) + 1;
        var clickY = (event.layerY == undefined ? event.offsetY : event.layerY) + 1;      
        var ox,oy;
		var click = document.getElementById("zoom");
        if (click.value === "0")
		{
            ox = param.width / 4;
            oy = param.height / 4;
        }
        else if(click.value === "1")
		{
            ox = param.width * 2;
            oy = param.height * 2;
        }
        var left = clickX - ox;
        var top = clickY - oy;
        var right = clickX + ox;
        var bottom = clickY + oy;
        var point1 = param.getComplexCoordinats(left, top);
        var point2 = param.getComplexCoordinats(right, bottom);
        param.left = point1.x;
        param.top = point1.y;
        param.right = point2.x;
        param.bottom = point2.y;
        draw();
    }