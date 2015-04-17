
function Map(){
	this.XNUM = 16;
	this.YNUM = 16;
	this.TIPSIZE = 32;
}

Map.prototype.update = function(){
}

Map.prototype.draw = function(){
    for (x = 0; x < XNUM; x++) {
        for (y = 0; y < YNUM; y++) {
            drawGraph(ImageArray["MASU"].image, x * TIPSIZE, y * TIPSIZE, 0.1);
        }
    }
}