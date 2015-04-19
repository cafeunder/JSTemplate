var WINDOW_WIDTH = 700;
var WINDOW_HEIGHT = 512;

var ctx,canvas;
var map = new Map();
var mouse = new Mouse();
var fps = new Fps();
//var enemy = new Enemy(new Point(-1,7),map);
var eneMgr = new EnemyMgr(-1, 7, map);

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
	if(mouse.leftCount == 1){
		enemy = new Enemy(new Point(-1,7),map);
	}

	mouse.update();
	fps.update();
	map.update();
	eneMgr.update();

	drawRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT,"rgb(0,0,0)");
	map.draw();
	eneMgr.draw();
	TEST_ANGLE+=20;
	
//	drawText("count:"+mouse.leftCount + " x:"+mouse.x + " y:"+mouse.y,400,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	drawText("fps:"+fps.FPS.toFixed(1),2,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
}