"use strict";

//=======================================================//
//　クラス名 : TowerMgr
//　概要 :
//		ステージ上に配置されたタワーを一括管理します。
//　メンバ :
//		towerAry Array<Tower>	: タワー配列
//=======================================================//
function TowerMgr(){
	this.towerAry = new Array();
}

//=======================================================//
//　関数名 : update
//　概要 : 更新メソッド
//=======================================================//
TowerMgr.prototype.update = function(){
	for(var i in this.towerAry){
		this.towerAry[i].update();
	}
}

//=======================================================//
//　関数名 : draw
//　概要 : 描画メソッド
//=======================================================//
TowerMgr.prototype.draw = function(){
	for(var i in this.towerAry){
		this.towerAry[i].draw();
	}
}

//=======================================================//
//　関数名 : judgePutTower
//　概要 :
//		タワーが配置できるかどうかを判定します。
//		既にタワーが存在する場合は配置できません。
//　引数 :
//		point Point	: 配置する位置
//=======================================================//
TowerMgr.prototype.judgePutTower = function(point){
	for(var i in this.towerAry){
		if(this.towerAry[i].p.x == point.x && this.towerAry[i].p.y == point.y) return false;
	}
	return true;
}

//=======================================================//
//　関数名 : putTower
//　概要 :
//		タワーを配置します。
//　引数 :
//		twr Tower	: タワーのインスタンス
//=======================================================//
TowerMgr.prototype.putTower = function(twr){
	this.towerAry.push(twr);
}
