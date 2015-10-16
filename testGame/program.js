"use strict";

var WINDOW_WIDTH = 700;
var WINDOW_HEIGHT = 590;
var fps = new Fps();
var mouse = new Mouse();

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

	ctx.msImageSmoothingEnabled = false;
};

function timerFunc(){
	fps.update();
	mouse.update();


	fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT,"rgb(0,0,0)");
	gamePlay.draw();
	drawText("fps:"+fps.FPS.toFixed(1),2,585,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
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