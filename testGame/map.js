"use strict";

var MAP_XNUM = 15;
var MAP_YNUM = 15;
var MAP_X = 10;
var MAP_Y = 68;
var TIP_SIZE = 32;

function Map(mapData){
	this.map = copyArray(mapData);
	this.onMouse = false;
	this.mp = new Point(0,0);
}

Map.prototype.update = function(){
	var mapMX = ScrToMapX(mouse.x);
	var mapMY = ScrToMapY(mouse.y);

	if(mapMX < 0 || mapMX >= TIP_SIZE*MAP_XNUM || mapMY < 0 || mapMY >= TIP_SIZE*MAP_YNUM){
		this.mouseOnMap = false;
		this.mp.x = -1;
		this.mp.y = -1;	
	} else {
		this.mouseOnMap = true;
		this.mp.x = mapMX/TIP_SIZE;
		this.mp.y = mapMY/TIP_SIZE;

		this.mp.x = parseInt(this.mp.x);
		this.mp.y = parseInt(this.mp.y);
	}
}

Map.prototype.draw = function(){
	fillRect(MapToScrX(-TIP_SIZE/2), MapToScrY(-TIP_SIZE/2), (MAP_XNUM+1)*TIP_SIZE, (MAP_YNUM+1)*TIP_SIZE, "rgb(0,25,25)");
	fillRect(MapToScrX(0), MapToScrY(0), MAP_XNUM*TIP_SIZE, MAP_YNUM*TIP_SIZE, "rgb(0,30,30)");
	for (var x = 0; x < MAP_XNUM; x++) {
		for (var y = 0; y < MAP_YNUM; y++) {
			if(this.map[y][x] == 0){
				drawGraph(ImageArray["MASU"].image, MapToScrX(x*TIP_SIZE), MapToScrY(y*TIP_SIZE), 0.2);
			}
		}
	}
}

Map.prototype.judgePutTower = function(point){
	return (this.map[point.y][point.x] == 0);
}

function ScrToMapX(x){
	return x - MAP_X - TIP_SIZE/2;
}
function ScrToMapY(y){
	return y - MAP_Y - TIP_SIZE/2;
}
function MapToScrX(x){
	return x + MAP_X + TIP_SIZE/2;
}
function MapToScrY(y){
	return y + MAP_Y + TIP_SIZE/2;
}