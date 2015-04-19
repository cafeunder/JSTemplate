var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

XNUM = 15;
YNUM = 15;
TIP_SIZE = 32;

function Map() {
	this.DEBUG_MAP = new Array();

	this.DEBUG_MAP = 
	[
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

		[0,0,0,0,0, 0,0,0,0,0, 0,0,2,2,2],
		[0,0,0,0,0, 0,0,0,0,0, 0,2,0,0,0],
		[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		[0,0,0,0,0, 0,0,0,0,0, 0,2,0,0,0],
		[0,0,0,0,0, 0,0,0,0,0, 0,0,2,2,2],

		[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
		[2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2],
	];

	colMap = this.DEBUG_MAP.concat();
	sPath = calcPath(new Point(-1,7), new Point(13,7), colMap);
	sDirGuide = pathToGuide(sPath);

	this.mouseOnMap = false;
	this.mp = new Point();

	this.sPath = calcPath(new Point(-1,7), new Point(13,7), this.DEBUG_MAP);
	this.sDirGuide = pathToGuide(this.sPath);
}

function DirPoint(p,d){
	switch(d){
	case UP:
		if(p.y-1 >= 0 && p.y-1 < YNUM){
			return new Point(p.x, p.y-1);
		}
		break;
	case DOWN:
		if(p.y+1 >= 0 && p.y+1 < YNUM){
			return new Point(p.x, p.y+1);
		}
		break;
	case LEFT:
		if(p.x-1 >= 0 && p.x-1 < XNUM){
			return new Point(p.x-1, p.y);
		}
		break;
	case RIGHT:
		if(p.x+1 >= 0 && p.x+1 < XNUM){
			return new Point(p.x+1, p.y);
		}
		break;
	}
	return null;
}

Map.prototype.setEneMgr = function(eneMgr){
	this.eneMgr = eneMgr;
	this.eneMgr.setShortestPathGuide(this.sDirGuide);
}

Map.prototype.update = function() {
	var mapMX = mouse.x-TIP_SIZE/2;
	var mapMY = mouse.y-TIP_SIZE/2;

	if(mapMX < 0 || mapMX >= TIP_SIZE*XNUM || mapMY < 0 || mapMY >= TIP_SIZE*YNUM){
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

	this.sPath = calcPath(new Point(-1,7), new Point(13,7), this.DEBUG_MAP);
	this.sDirGuide = pathToGuide(this.sPath);
	this.eneMgr.setShortestPathGuide(this.sDirGuide);
}

Map.prototype.draw = function(){
	fillRect(0, 0, (XNUM+1)*TIP_SIZE, (YNUM+1)*TIP_SIZE, "rgb(50,50,50)");
	for (x = 0; x < XNUM; x++) {
		for (y = 0; y < YNUM; y++) {
			var img;
			if(this.DEBUG_MAP[y][x] == 0){
				img = ImageArray["MASU"].image;
				drawGraph(img, x*TIP_SIZE+TIP_SIZE/2, y*TIP_SIZE+TIP_SIZE/2);
			} else if(this.DEBUG_MAP[y][x] == 1) {
				img = ImageArray["TEMP"].image;
				drawGraph(img, x*TIP_SIZE+TIP_SIZE/2, y*TIP_SIZE+TIP_SIZE/2);
			} else if(this.DEBUG_MAP[y][x] == 2) {
				img = ImageArray["TEMP2"].image;
				drawGraph(img, x*TIP_SIZE+TIP_SIZE/2, y*TIP_SIZE+TIP_SIZE/2);
			}
		}
	}

	drawText("mx:"+this.mp.x + " my:"+this.mp.y,400,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	if(this.mouseOnMap){
		fillRect(this.mp.x*TIP_SIZE+TIP_SIZE/2, this.mp.y*TIP_SIZE+TIP_SIZE/2, TIP_SIZE, TIP_SIZE, "rgba(0,255,255,0.5)");
	}

	if(this.sPath != null){
		for(var i in this.sPath){
			fillRect(this.sPath[i].x*TIP_SIZE+TIP_SIZE/2, this.sPath[i].y*TIP_SIZE+TIP_SIZE/2, TIP_SIZE, TIP_SIZE, "rgba(0,255,0,0.5)");
		}
	}
}
