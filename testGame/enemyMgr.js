"use strict";

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
//		shortPath Array<int>		: 最短経路(位置)
//		shortGuide Array<int>		: 最短経路(方向)
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
	this.shortPath = null;
	this.shortGuide = null;

	//===DEBUG===
	this.order = new Stack();
	this.eneAry = new Array();
	//===DEBUG===

}

//=======================================================//
//　関数名 : next
//　概要 : 次の侵攻フェイズに移行します。
//	引数 :
//		shortPath Array<int>	: 最短経路(位置)
//		shortGuide Array<int>	: 最短経路(方向)
//=======================================================//
EnemyMgr.prototype.next = function(shortPath, shortGuide){
	this.shortPath = shortPath;
	this.shortGuide = shortGuide;

	//===DEBUG===
	for(var i = 0; i < 10; i++){
		this.order.push(new Enemy(this.shortPath, this.shortGuide, this.spawnPoint[0].clone(), null));
	}
	this.attack = true;
	//===DEBUG===
}

//=======================================================//
//　関数名 : updateShortPath
//　概要 : 
//		最短経路を更新します。
//	引数 :
//		shortPath Array<int>	: 最短経路(位置)
//		shortGuide Array<int>	: 最短経路(方向)
//=======================================================//
EnemyMgr.prototype.updateShortPath = function(shortPath, shortGuide){
	this.shortPath = shortPath;
	this.shortGuide = shortGuide;

	for(var i in this.eneAry){
		this.eneAry[i].updateShortPath(shortPath, shortGuide);
	}	
}

//=======================================================//
//　関数名 : update
//　概要 : 更新メソッド
//=======================================================//
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

//=======================================================//
//　関数名 : draw
//　概要 : 描画メソッド
//=======================================================//
EnemyMgr.prototype.draw = function(){
	for(var i in this.eneAry){
		this.eneAry[i].draw();
	}
}
