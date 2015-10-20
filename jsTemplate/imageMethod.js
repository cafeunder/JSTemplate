"use strict";

function ImageData(path,image){
	this.path = path;
	this.image = image;
}

var ImageArray = {
	"TEMP" : new ImageData("./img/temp.png",null),
};

function loadImage(){
	for(var i in ImageArray){
		ImageArray[i].image = new Image();
		ImageArray[i].image.src = ImageArray[i].path;
	} 
}