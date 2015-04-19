
function Tower(p, eneMgr){
	this.p = p;
	this.eneMgr = eneMgr;
}

Tower.prototype.update = function(){

}

Tower.prototype.draw = function(){
	drawGraph(ImageArray["TEMP3"].image, this.p.x*TIP_SIZE+TIP_SIZE/2, this.p.y*TIP_SIZE+TIP_SIZE/2);
}


function TowerMgr(eneMgr){
	this.eneMgr = eneMgr;
	this.towerAry = new Array();
}

TowerMgr.prototype.update = function(){
	for(var i in this.towerAry){
		this.towerAry[i].update();
	}
}

TowerMgr.prototype.draw = function(){
	for(var i in this.towerAry){
		this.towerAry[i].draw();
	}
}

TowerMgr.prototype.addTower = function(t){
	this.towerAry.push(t);
	updateColMap(t.p, 1);
}