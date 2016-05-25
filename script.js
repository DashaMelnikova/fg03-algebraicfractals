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
	this.getComplexCoordinats = function (x, y) {
        var i = x * (this.right - this.left) / (this.width - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.height - 1) + this.top;
        return {x: i, y: j};
    };
}
var param = new setOfVariables();

function draw() {
	param.n = Number(document.getElementById("iter").value);
    param.color = Number(document.getElementById("color").value);
    param.method = Number(document.getElementById("method").value);
    param.a = Number(document.getElementById("x").value);
    param.b = Number(document.getElementById("y").value);
	var canvas = document.getElementById("canvas");
	canvas.width = 600;
	canvas.height = 600;
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(canvas.width, canvas.height);
    for (var i = 0; i < canvas.width; ++i)
        for (var j = 0; j < canvas.height; ++j) 
		{
            var p = param.getComplexCoordinats(i, j);
            var attractor;
			var marker;
            switch (param.method) 
			{
                case 0: attractor = getNewtonIteration(p.x, p.y, 0, param.n);
                    break;
                case 1: attractor = getMandelbrotIteration(p.x, p.y, param.n);
                    break;
                case 2: attractor = getJuliaIteration(p.x, p.y, param.a, param.b, param.n); 
                    break;
            }
			
			if (param.method == 0)
			{
				var attract = attractor.at;
				var attractor = attractor.it;
			}
			
            switch (param.color) 
			{
                case 0: 
                    if (param.method == 0)
                        marker = classical(attract);
                    else
                        marker = classic(attractor);
                    break;
                case 1: marker = level(attractor);
					break;
                case 2: marker = zebra(attractor); 
					break;
                case 3: marker = gibrid(attract, attractor);
					break;
            }
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