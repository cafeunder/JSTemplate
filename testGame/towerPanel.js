
function TowerPanelElement(x, y, name){
	this.x = x;
	this.y = y;
	this.name = name;
	this.data = TowerDataTable[name];
	this.selected = false;
}

TowerPanelElement.prototype.draw = function(){
	drawGraph(ImageArray[this.data.imgName].image, this.x, this.y);

	if(mouse.onRect(this.x, this.y, TIP_SIZE, TIP_SIZE)){
		drawRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgba(255,255,255,1.0)");
	}
	if(this.selected){
		fillRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgba(0,255,255,0.3)");
		drawRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgba(255,255,255,1.0)");
	}
}



function TowerPanel(gamePlay){
	this.gamePlay = gamePlay;

	this.elms = new Array();
	for(var i = 0; i < 4; i++){
		this.elms.push(new TowerPanelElement(536+(i%4*40), 80+(parseInt(i/4)*40), TowerName[i]));
	}
}

TowerPanel.prototype.update = function(){
	for(var i in this.elms){
		if(mouse.leftCount == 1){
			if(mouse.onRect(this.elms[i].x, this.elms[i].y, TIP_SIZE, TIP_SIZE)){
				this.elms[i].selected = !this.elms[i].selected;
			} else {
				this.elms[i].selected = false;
			}
		}
	}
}

TowerPanel.prototype.draw = function(){
	for(var i in this.elms){
		this.elms[i].draw();
	}
}

TowerPanel.prototype.getSelectTower = function(){
	for(var i in this.elms){
		if(this.elms[i].selected){
			return this.elms[i].name;
		}
	}
	return null;
}

TowerPanel.prototype.isSelected = function(){
	for(var i in this.elms){
		if(this.elms[i].selected){
			return true;
		}
	}
	return false;
}