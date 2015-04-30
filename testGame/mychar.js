"use strict";

//=======================================================//
//　クラス名 : MyChar
//　概要 :
//		マイキャラを表します。
//　メンバ :
//		p Point			: 位置
//	引数 :
//		p Point			: 位置
//=======================================================//
function MyChar(p){
	this.point = p;
	//this.resource
	//this.life
}

//=======================================================//
//　関数名 : update
//　概要 : 更新メソッド
//=======================================================//
MyChar.prototype.update = function(){

}

//=======================================================//
//　関数名 : draw
//　概要 : 描画メソッド
//=======================================================//
MyChar.prototype.draw = function(){
	for(var y = -1; y < 2; y++){
		for(var x = -1; x < 2; x++){
			if((x == -1 || x == 0) && y == 0) continue; 
			drawGraph(ImageArray["TEMP3"].image, MapToScrX((this.point.x+x)*TIP_SIZE), MapToScrY((this.point.y+y)*TIP_SIZE), 0.5);
		}
	}
	drawGraph(ImageArray["mychar"].image, MapToScrX((this.point.x)*TIP_SIZE), MapToScrY((this.point.y)*TIP_SIZE));
}

//=======================================================//
//　関数名 : judgePutTower
//　概要 :
//		タワーが配置できるかどうかを判定します。
//		自身の周囲１マス以内には配置できません。
//　引数 :
//		point Point	: 配置する位置
//=======================================================//
MyChar.prototype.judgePutTower = function(point){
	return (Math.abs(this.point.x - point.x) > 1 || Math.abs(this.point.y - point.y) > 1); 
}