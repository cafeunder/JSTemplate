"use strict";

function MyChar(x,y){
	this.point = new Point(x,y);
}

MyChar.prototype.update = function(){

}

MyChar.prototype.draw = function(){
	for(var y = -1; y < 2; y++){
		for(var x = -1; x < 2; x++){
			if((x == -1 || x == 0) && y == 0) continue; 
			drawGraph(ImageArray["TEMP3"].image, MapToScrX((this.point.x+x)*TIP_SIZE), MapToScrY((this.point.y+y)*TIP_SIZE), 0.5);
		}
	}
	drawGraph(ImageArray["mychar"].image, MapToScrX((this.point.x)*TIP_SIZE), MapToScrY((this.point.y)*TIP_SIZE));
}

MyChar.prototype.judgePutTower = function(point){
	return (Math.abs(this.point.x - point.x) > 1 || Math.abs(this.point.y - point.y) > 1); 
}