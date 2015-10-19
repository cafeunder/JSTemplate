"use strict";

var SAMPLE_FRACT = 50;

function Fps(){
	this.FPS = 0;
	this.first = 0;
	this.sampleNum = 0;
	this.drawing = true;
}

Fps.prototype.update = function(){
	if(this.sampleNum == 0){
		this.first = +new Date();
	}
	if(this.sampleNum == SAMPLE_FRACT){
		var end = +new Date();
		this.FPS = 1000.0 / ((end - this.first)/parseFloat(SAMPLE_FRACT));
		this.sampleNum = 0;
	} else this.sampleNum++;
}

Fps.prototype.draw = function(x, y){
	if(this.drawing){
		drawText("fps:"+this.FPS.toFixed(1),x,y,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	}
}

Fps.prototype.setDrawing = function(flag){
	this.drawing = flag;
}

Fps.prototype.isDrawing = function(){
	return this.drawing;
}