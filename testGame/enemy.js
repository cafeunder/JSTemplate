"use strict";

//=======================================================//
//	グローバル変数宣言
//=======================================================//
var MOVE_SCALE = 1000;



//=======================================================//
//　クラス名 : Enemy
//　概要 :
//		エネミーを表します。
//　メンバ :
//		x 整数					: 現在位置x
//		y 整数					: 現在位置y
//		p Point					: マップ位置
//		shortPath Array<int>	: 最短経路
//		shortGuide Array<int>	: 最短経路
//		guideIndex 整数			: 最短経路配列を参照する位置
//		move 整数				: 移動量
//		data EnemyData			: データ
//	コンストラクタ :
//		shortPath Array<int>	: GamePlayから受け取った
//		shortGuide Array<int>	: 最短経路配列
//		p Point					: スポーン位置
//		data EnemyData			: データ
//=======================================================//
function Enemy(shortPath, shortGuide, p, data){
	this.x = p.x*TIP_SIZE*MOVE_SCALE;
	this.y = p.y*TIP_SIZE*MOVE_SCALE;
	this.p = p;
	this.shortPath = copyArray(shortPath);
	this.shortGuide = copyArray(shortGuide);
	this.guideIndex = 0;
	this.move = 0;
	this.data = data;
}

//=======================================================//
//　関数名 : update
//　概要 : 更新メソッド
//=======================================================//
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

//=======================================================//
//　関数名 : draw
//　概要 : 描画メソッド
//=======================================================//
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

//=======================================================//
//　関数名 : updateShortPath
//　概要 : 最短経路の更新メソッド
//	引数 :
//		shortPath Array<int>	: 最短経路
//		shortGuide Array<int>	: 最短経路
//=======================================================//
Enemy.prototype.updateShortPath = function(shortPath, shortGuide){
/*
	if(最短経路が後戻りしないなら){
		this.shortPath = copyArray(shortPath);
		this.shortGuide = copyArray(shortGuide);
	}
*/
}