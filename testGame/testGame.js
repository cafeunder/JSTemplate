var WINDOW_WIDTH = 700;
var WINDOW_HEIGHT = 512;

var ctx,canvas;
var map = new Map();
var mouse = new Mouse();
var fps = new Fps();
var eneMgr = new EnemyMgr(-1, 7, map);
var twrMgr = new TowerMgr(eneMgr);
var towerPanel = new TowerPanel();
colMap, sPath, sDirGuide;

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

	ctx.msImageSmoothingEnabled = false;

	sPath = calcPath(new Point(-1,7), new Point(13,7), colMap);
	sDirGuide = pathToGuide(sPath);
};

function updateColMap(p, col){
	colMap[p.y][p.x] = col;
	sPath = calcPath(new Point(-1,7), new Point(13,7), colMap);
	sDirGuide = pathToGuide(sPath);
}

function timerFunc(){
	mouse.update();
	fps.update();

	map.update();
	twrMgr.update();
	eneMgr.update();
	if(mouse.leftCount == 1){
		var mapMX = mouse.x-TIP_SIZE/2;
		var mapMY = mouse.y-TIP_SIZE/2;
		if(mapMX < 0 || mapMX >= TIP_SIZE*XNUM || mapMY < 0 || mapMY >= TIP_SIZE*YNUM){
		} else {
			var sel = towerPanel.getSelectTower();
			if(sel != -1){
				var px = parseInt((mouse.x - TIP_SIZE/2)/TIP_SIZE);
				var py = parseInt((mouse.y - TIP_SIZE/2)/TIP_SIZE);

				twrMgr.addTower(new Tower(new Point(px,py), eneMgr));
			}
		}
	}
	towerPanel.update();

	drawRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT,"rgb(0,0,0)");
	towerPanel.draw();
	map.draw();
	eneMgr.draw();
	twrMgr.draw();
	for (x = 0; x < XNUM; x++) {
		for (y = 0; y < YNUM; y++) {
			drawText(""+colMap[y][x], x*TIP_SIZE+TIP_SIZE/2, (y+1)*TIP_SIZE+TIP_SIZE/2,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
		}
	}

	drawText("fps:"+fps.FPS.toFixed(1),2,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
}

function calcPath(start, end, colAry){
	//====初期化処理====//
	var costAry = new Array();		//出発地点からの移動コストを入れる配列
	var visitAry = new Array();		//訪問したかどうかを判定する配列
	for(var y = 0; y < YNUM; y++){
		costAry[y] = new Array();
		visitAry[y] = new Array();
		for(var x = 0; x < XNUM; x++){
			costAry[y][x] = -1;
			visitAry[y][x] = 0;
		}
	}

	//====移動コスト計算====//
	//幅優先探索で移動コストを計算する
	var queue = new Queue();
	costAry[start.y][start.x] = 0;
	queue.enqueue(start);
	while(true){
		var p = queue.dequeue();
		if(p == null) break;

		var c = costAry[p.y][p.x];
		var np;

		np = DirPoint(p, LEFT);
		if(np != null && costAry[np.y][np.x] == -1 && colAry[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, RIGHT);
		if(np != null && costAry[np.y][np.x] == -1 && colAry[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, UP);
		if(np != null && costAry[np.y][np.x] == -1 && colAry[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, DOWN);
		if(np != null && costAry[np.y][np.x] == -1 && colAry[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
	}


	//====最短経路探索====//
	//移動コストを用いて最短経路を探索する
	//ただし経路が複数ある場合は、①直進を優先する ②上右下左の優先順位で方向を選ぶ ようにする
	var stack = new Stack();
	var dirStack = new Stack();

	var dir = UP, nowCost = 0;
	stack.push(start);
	dirStack.push(dir);
	visitAry[start.y][start.x] = 1;
	while(true){
		//スタックの一番上を見る
		var p = stack.peak();
		if(p == null){
			//スタックが空なら「目的地に至る経路はない」
			return null;
		}

		var exist = false;	//暫定的な最短経路となるような移動ができるかどうか
		np = DirPoint(p,dir);
		if(np != null && visitAry[np.y][np.x] == 0 && costAry[np.y][np.x] > nowCost){
			exist = true;
		} else {
			for(var i = 0; i < 4; i++){
				np = DirPoint(p,i);
				if(np != null && visitAry[np.y][np.x] == 0 && costAry[np.y][np.x] > nowCost){
					exist = true;
					dir = i;
					break;
				}
			}
		}

		if(exist){	//暫定的な最短経路となるような移動ができたなら
			//現在の地点における直進方向と、次の地点をスタックにプッシュする
			stack.push(np);	
			dirStack.push(dir);
			if(np.x == end.x && np.y == end.y){
				//次の地点が目的地なら、現在のスタックが最短経路
				return stack.__a;
			}

			visitAry[np.y][np.x] = 1;
			nowCost++;
		} else {	//暫定的な最短経路となるような移動ができないなら
			stack.pop();			//前の地点に戻る
			dir = dirStack.pop();	//前の地点の直進方向を現在の直進方向とする
			nowCost--;
		}
	}
}

function pathToGuide(sPath){
	sDirGuide = new Array();
	for(var i = 0; i < sPath.length-1; i++){
		var xd = sPath[i].x - sPath[i+1].x;
		var yd = sPath[i].y - sPath[i+1].y;

		if(xd == -1){
			sDirGuide.push(RIGHT);
		} else if(xd == 1) {
			sDirGuide.push(LEFT);
		} else if(yd == -1){
			sDirGuide.push(DOWN);
		} else {
			sDirGuide.push(UP);
		}
	}

	return sDirGuide;
}