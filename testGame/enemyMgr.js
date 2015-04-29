﻿"use strict";

var DEBUG_PUSH_INTERVAL = 60;

//=======================================================//
//　クラス名 : EnemyMgr
//　概要 :
//		ステージ上に存在するエネミーを一括管理します。
//　メンバ :
//		eneAry Array<Enemy>			: エネミー配列
//		spawnPoint Array<Point>		: スポーン位置の配列
//		eneOrder Array<EnemyOrder>	: エネミーオーダー
//		mychar MyChar				: マイキャラ
//		pushCount 整数				: スポーンのカウント
//　コンストラクタ :
//		spawnPoint Array<Point>		: スポーン位置の配列
//		eneOrder Array<EnemyOrder>	: エネミーオーダー
//		mychar MyChar				: マイキャラ
//=======================================================//
function EnemyMgr(spawnPoint, eneOrder, mychar){
	this.spawnPoint = spawnPoint;
	//this.eneOrder = copyArray(eneOrder);
	this.mychar = mychar;
	this.pushCount = 0;

	//===DEBUG===
	this.order = new Stack();
	this.eneAry = new Array();
	//===DEBUG===

}

EnemyMgr.prototype.next = function(shortPath, shortGuide){
	//===DEBUG===
	for(var i = 0; i < 10; i++){
		this.order.push(new Enemy(shortPath, shortGuide, this.spawnPoint[0].clone(), null));
	}	
	this.attack = true;
	//===DEBUG===
}

EnemyMgr.prototype.updateShortPath = function(shortPath, shortGuide){
	
}

EnemyMgr.prototype.update = function(){
	if(this.attack){
		if(this.pushCount == DEBUG_PUSH_INTERVAL){
			this.pushCount = 0;

			var e = this.order.pop();
			if(e == null){
				this.attack = false;
			} else {
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
}