"use strict";

var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var fps = new Fps();
var mouse = new Mouse();
var keyboard = new Keyboard();

var ctx;

onload = function(){
	var canvas = document.getElementById('id_canvas');
	if (!canvas || !canvas.getContext) {
		alert("エラー:HTML5非対応");
		return false;
	}
	ctx = canvas.getContext('2d');

	loadImage();

	var timerID = setInterval('timerFunc()', 32);
	canvas.addEventListener('mousemove',mouseMove,true);
	canvas.addEventListener('mousedown',mouseDown,true);
	canvas.addEventListener('mouseup',mouseUp,true);
	document.addEventListener('keydown',keyDown,true);
	document.addEventListener('keyup',keyUp,true);

	ctx.msImageSmoothingEnabled = false;

	WINDOW_WIDTH = canvas.width;
	WINDOW_HEIGHT = canvas.height;
};

function timerFunc(){
	fps.update();
	mouse.update();
	keyboard.update();

	fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT,"rgb(0,0,0)");
	if(keyboard.checkKey(KEY_F) == 1){
		fps.setDrawing(!fps.isDrawing());
	}
	fps.draw(2,WINDOW_HEIGHT-15);
}

function copyArray(arr){
	var newarr = [];
	for(var i = 0; i < arr.length; i++){
		if(Array.isArray(arr[i])){
			newarr[i] = copyArray(arr[i]);
		} else {
			newarr[i] = arr[i];
		}
	}
	return newarr;
}