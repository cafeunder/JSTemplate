"use strict";

var MOVE_SCALE = 1000;

function Enemy(shortPath, shortGuide, p){
	this.x = p.x*TIP_SIZE*MOVE_SCALE;
	this.y = p.y*TIP_SIZE*MOVE_SCALE;
	this.p = p;
	this.shortPath = copyArray(shortPath);
	this.shortGuide = copyArray(shortGuide);
	this.guideIndex = 0;
	this.move = 0;
}

Enemy.prototype.update = function(){
	var DEBUG_VELOCITY = 987;

	switch(this.shortGuide[this.guideIndex]){
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

		if(this.shortGuide[this.guideIndex] != this.shortGuide[this.guideIndex+1]){	//方向転換するなら
			this.x = this.p.x*TIP_SIZE*MOVE_SCALE;
			this.y = this.p.y*TIP_SIZE*MOVE_SCALE;
			//余った分がそのままにならないように切り詰める
		}

		this.move = this.move%(TIP_SIZE*MOVE_SCALE);

		this.guideIndex += 1;
	}
}

Enemy.prototype.draw = function(){
	var dx = this.x/MOVE_SCALE;
	var dy = this.y/MOVE_SCALE;
	
	var angle = 0;
	switch(this.shortGuide[this.guideIndex]){
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
	drawRotaGraph(ImageArray["MARU"].image, MapToScrX(dx), MapToScrY(dy), angle, 1.0);
}

Enemy.prototype.updateShortPath = function(shortPath, shortGuide){
/*
	if(最短経路が後戻りしないなら){
		this.shortPath = copyArray(shortPath);
		this.shortGuide = copyArray(shortGuide);
	}
*/
}