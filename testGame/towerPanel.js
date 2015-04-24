function PanelElement(x,y,imgName){
	this.x = x;
	this.y = y;
	this.imgName = imgName;
	this.onMouse = false;
	this.select = false;
}

PanelElement.prototype.update = function(){
	var mx = mouse.x;
	var my = mouse.y;
	if(mx >= this.x && mx < this.x+TIP_SIZE && my >= this.y && my < this.y+TIP_SIZE){
		this.onMouse = true;
	} else this.onMouse = false;
}

PanelElement.prototype.draw = function(){
	drawGraph(ImageArray[this.imgName].image, this.x, this.y);
	if(this.onMouse){
		fillRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgba(150,150,150,0.5)");
	}
	if(this.select){
		drawRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgb(255,126,0)");
	} else {
		drawRect(this.x, this.y, TIP_SIZE, TIP_SIZE, "rgb(225,225,225)");
	}
}



function TowerPanel(){
	this.x = 512;
	this.y = 0;
	this.width = 188;
	this.height = 200;

    this.panelNum = 3;
	this.imgNameAry = ["TEMP3", "TEMP4", "TEMP5"];
	this.elmAry = new Array();
	for(var e in this.imgNameAry){
		this.elmAry[e] = new PanelElement(this.x+(e%4)*40+15, this.y+parseInt(e/4)*40+15, this.imgNameAry[e]);
	}
}

TowerPanel.prototype.update = function(){
	for(var e in this.elmAry){
		this.elmAry[e].update();
	}
	if(mouse.leftCount == 1){
		for(var e in this.elmAry){
			if(this.elmAry[e].onMouse){
				this.elmAry[e].select = !this.elmAry[e].select;
			} else this.elmAry[e].select = false;
		}
	}
}

TowerPanel.prototype.draw = function(){
	fillRect(this.x, this.y, this.width, this.height, "rgb(50,50,50)");
	for(var e in this.elmAry){
		this.elmAry[e].draw();
	}
}

TowerPanel.prototype.getSelectTower = function(){
	for(var e in this.elmAry){
		if(this.elmAry[e].select){
			return e;
		}
	}
	return -1;
}