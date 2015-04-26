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

