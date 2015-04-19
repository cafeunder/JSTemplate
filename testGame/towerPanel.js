
function TowerPanel(){
	this.panelNum = 10;
}

TowerPanel.prototype.update = function(){

}

TowerPanel.prototype.draw = function(){
	for(var i = 0; i < this.panelNum; i++){
		drawGraph(ImageArray["TEMP3"].image, 530+(i%4)*40, 200+parseInt(i/4)*40);
	}
}