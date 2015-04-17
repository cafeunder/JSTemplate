function ImageData(path,image){
	this.path = path;
	this.image = image;
}

var ImageArray = {
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