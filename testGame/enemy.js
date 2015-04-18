MOVE_SCALE = 1000

function Enemy(p, map){
	this.map = map;
	this.x = p.x*TIP_SIZE*MOVE_SCALE;
	this.y = p.y*TIP_SIZE*MOVE_SCALE;
	this.p = p;

	this.sDirGuide = map.sDirGuide;
	this.dirIndex = 0;
	this.dir = this.sDirGuide[0];
	this.move = 0;
}

Enemy.prototype.update = function(){
	var DEBUG_VELOCITY = 3000;
	switch(this.dir){
	case UP:
		this.y -= DEBUG_VELOCITY;
		this.move += DEBUG_VELOCITY;
		break;
	case DOWN:
		this.y += DEBUG_VELOCITY;
		this.move += DEBUG_VELOCITY;
		break;
	case LEFT:
		this.x -= DEBUG_VELOCITY;
		this.move += DEBUG_VELOCITY;
		break;
	case RIGHT:
		this.x += DEBUG_VELOCITY;
		this.move += DEBUG_VELOCITY;
		break;
	}

	if(this.move >= TIP_SIZE*MOVE_SCALE){
		this.p.x = (this.x/TIP_SIZE)/MOVE_SCALE;
		this.p.y = (this.y/TIP_SIZE)/MOVE_SCALE;

		if(this.dir != this.sDirGuide[this.dirIndex+1]){	//方向転換するなら
			this.x = this.p.x*TIP_SIZE*MOVE_SCALE;
			this.y = this.p.y*TIP_SIZE*MOVE_SCALE;
			//余った分がそのままにならないように切り詰める
		}

		this.move = this.move%(TIP_SIZE*MOVE_SCALE);

		this.dirIndex += 1;
		this.dir = this.sDirGuide[this.dirIndex];
	}
}

Enemy.prototype.draw = function(){
	var dx = this.x/MOVE_SCALE+TIP_SIZE/2;
	var dy = this.y/MOVE_SCALE+TIP_SIZE/2;
	
	var angle = 0;
	switch(this.dir){
	case UP:
		angle = Math.PI;
		break;
	case DOWN:
		angle = 0;
		break;
	case LEFT:
		angle = Math.PI/2;
		break;
	case RIGHT:
		angle = Math.PI/2*3;
		break;
	}
	drawRotaGraph(ImageArray["MARU"].image, dx, dy, angle, 1.0);
}