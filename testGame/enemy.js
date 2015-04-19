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

Enemy.prototype.setShortestPathGuide = function(sDirGuide){
	this.sDirGuide = sDirGuide;
}

Enemy.prototype.update = function(){
	var DEBUG_VELOCITY = 987;
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



var PUSH_INTERVAL = 60;

function EnemyMgr(x,y,map){
	this.attack = false;
	this.order = new Stack();
	for(var i = 0; i < 10; i++){
		this.order.push(new Enemy(new Point(x,y),map));
	}

	this.eneAry = new Array();
	this.pushCount = PUSH_INTERVAL;
	this.map = map;

	this.map.setEneMgr(this);
}

EnemyMgr.prototype.setShortestPathGuide = function(sDirGuide){
	this.sDirGuide = sDirGuide;
}

EnemyMgr.prototype.update = function(){
	if(mouse.x >= 550 && mouse.x <= 610 && mouse.y >= 100 && mouse.y < 132){
		if(mouse.leftCount == 1){
			this.attack = true;
		}
	}

	if(this.attack){
		if(this.pushCount == PUSH_INTERVAL){
			this.pushCount = 0;

			var e = this.order.pop();
			if(e == null){
				this.attack = false;
			} else {
				e.setShortestPathGuide(this.sDirGuide);
				this.eneAry.push(e);
			}
		}
		this.pushCount++;
	}

	for(var i in this.eneAry){
		this.eneAry[i].update();
	}
}

EnemyMgr.prototype.draw = function(){
	for(var i in this.eneAry){
		this.eneAry[i].draw();
	}

	fillRect(550, 100, 60, TIP_SIZE, "rgb(50,50,50)");
}