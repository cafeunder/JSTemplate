﻿var WINDOW_WIDTH = 700;
var WINDOW_HEIGHT = 512;
var XNUM = 16;
var YNUM = 16;
var TIPSIZE = 32;

var ctx,canvas;
var mouse = new Mouse();
var fps = new Fps();
var map = new Map();

onload = function(){
	canvas = document.getElementById('id_canvas');
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
};

var TEST_ANGLE = 0;
function timerFunc(){
	mouse.update();
	fps.update();

	drawRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT,"rgb(0,0,0)");

	map.draw();
	
	for(x = 0; x < XNUM; x++){
		for(y = 0; y < YNUM; y++){ 
			drawRotaGraph(ImageArray["FIRE"].image,x*10+TIPSIZE,y*10+TIPSIZE,TEST_ANGLE);
		}
	}
	for(x = 0; x < 10; x++){
		for(y = 0; y < 10; y++){
			drawRotaGraph(ImageArray["MARU"].image,200+x*10+TIPSIZE,100+y*10+TIPSIZE,TEST_ANGLE);
		}
	}
	TEST_ANGLE+=20;
	
	drawText("count:"+mouse.leftCount + " x:"+mouse.x + " y:"+mouse.y,400,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	drawText("fps:"+fps.FPS.toFixed(1),2,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
}