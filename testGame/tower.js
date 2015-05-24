"use strict";

//=======================================================//
//	グローバル変数宣言
//=======================================================//
var TowerName = [
	"TEST1",
	"TEST2",
	"TEST3",
	"TEST4",
];

var TowerDataTable = {	//タワーの情報テーブル
	"TEST1" : new TowerData("TEMP2"),
	"TEST2" : new TowerData("TEMP3"),
	"TEST3" : new TowerData("TEMP4"),
	"TEST4" : new TowerData("TEMP"),
};



//=======================================================//
//　クラス名 : TowerData
//　概要 :
//		タワーのデータを表します。
//		能力値や画像名などを保持します。
//　メンバ :
//		imgName 文字列	: 画像の名前
//	コンストラクタ :
//		各要素をコンストラクタで受け取り、初期化します。
//=======================================================//
function TowerData(imgName){
	this.imgName = imgName;
}
	
function createTower(twrName, p, eneMgr){
	return new Tower(TowerDataTable[twrName], p, eneMgr);
}



//=======================================================//
//　クラス名 : Tower
//　概要 :
//		タワーを表します。
//　メンバ :
//		data TowerData	: タワーのデータ
//		p Point			: 位置
//		eneMgr EnemyMgr	: エネミーマネージャ
//	引数 :
//		各要素をコンストラクタで受け取り、初期化します。
//=======================================================//
function Tower(data, p, eneMgr){
	this.data = data;
	this.p = p;
	this.eneMgr = eneMgr;
}

//=======================================================//
//　関数名 : update
//　概要 : 更新メソッド
//=======================================================//
Tower.prototype.update = function(){
	
}

//=======================================================//
//　関数名 : draw
//　概要 : 描画メソッド
//=======================================================//
Tower.prototype.draw = function(){
	drawGraph(ImageArray[this.data.imgName].image, MapToScrX(this.p.x*TIP_SIZE), MapToScrY(this.p.y*TIP_SIZE));
}