"use strict";

var tempX = 0,tempY = 0;
var leftPress = false;

function Mouse(){
	this.x = 0;
	this.y = 0;
	this.leftCount = 0;
}

Mouse.prototype.update = function(){
	if(leftPress) this.leftCount++;
	else this.leftCount = 0;
	
	this.x = tempX;
	this.y = tempY;
}

Mouse.prototype.onRect = function(x, y, width, height){
	if(this.x >= x && this.x < x+width && this.y >= y && this.y < y+height){
		return true;
	}
	return false;
}

function mouseMove(event){
	var rect = event.target.getBoundingClientRect();
	tempX = event.clientX - rect.left;
	tempY = event.clientY - rect.top;
}

function mouseDown(event){
	leftPress = true;
}

function mouseUp(event){
	leftPress = false;
}

