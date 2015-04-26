"use strict";

function ImageData(path,image){
	this.path = path;
	this.image = image;
}

var ImageArray = {
	"mychar" : new ImageData("./img/temp5.png",null),
	"TEMP4" : new ImageData("./img/temp4.png",null),
	"TEMP3" : new ImageData("./img/temp3.png",null),
	"TEMP2" : new ImageData("./img/temp2.png",null),
	"TEMP" : new ImageData("./img/temp.png",null),
	"MASU" : new ImageData("./img/masu.png",null),
	"FIRE" : new ImageData("./img/fire.png",null),
	"MARU" : new ImageData("./img/maru.png",null),
};

function loadImage(){
	for(var i in ImageArray){
		ImageArray[i].image = new Image();
		ImageArray[i].image.src = ImageArray[i].path;
	} 
}