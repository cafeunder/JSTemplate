"use strict";

//var infoPanel = new InfoPanel( );

function GamePlay(){
	//this.twrMgr = new TowerMgr( );
	//this.eftMgr = new EffectMgr( );
	//this.twrPanel = new TowerPanel( );
	//this.psyPanel = new PsyPanel( );
	//this.wavePanel = new WavePanel( );
	//this.sysPanel = new SystemPanel( );  

	//マップファイルの読み込み
		//マップファイルの形式 :
		//マイキャラx y
		//マップ情報
		//エネミー侵攻位置 x1 y1 x2 y2 ...
		//エネミーオーダー
			//エネミーオーダーの形式 :
			//進行waveカウント 侵攻位置番号 侵攻エネミー名 エネミーの数
	var DEBUG_mx = 13;
	var DEBUG_my = 7;
	var DEBUG_ex = 0;
	var DEBUG_ey = 7;
	var DEBUG_MAP = 
	[
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,0,0,0,0, 0,0,1,1,1],
		[0,0,0,0,0, 0,0,0,0,0, 0,0,1,1,1],

		[0,0,0,0,0, 0,0,0,0,0, 0,1,1,1,1],
		[0,0,0,1,1, 1,0,0,0,0, 0,1,0,0,0],
		[0,0,0,1,1, 1,0,0,0,0, 0,0,0,0,0],
		[0,0,0,1,1, 1,0,0,0,0, 0,1,0,0,0],
		[0,0,0,0,0, 0,0,0,0,0, 0,1,1,1,1],

		[0,0,0,0,0, 0,0,0,0,0, 0,0,1,1,1],
		[1,1,1,1,1, 1,0,0,0,0, 0,0,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
	];

	this.colMap = copyArray(DEBUG_MAP);
	
	//this.map = new Map(マップ情報);
	this.map = new Map(DEBUG_MAP);
	//this.mychar = new MyChar(マイキャラx, y);
	this.mychar = new MyChar(DEBUG_mx, DEBUG_my);
	//this.eneMgr = new EnemyMgr(エネミー情報, this.mychar);
	//this.twrMgr = new TowerMgr(this.eneMgr);

	//this.twrPanel = new TowerPanel();

	this.shortPath = calcShortPath(new Point(DEBUG_ex, DEBUG_ey), new Point(DEBUG_mx, DEBUG_my), this.colMap);
	if(this.shortPath == null){
		alert("初期マップに移動できる経路が無い");
	}
	this.shortGuide = pathToGuide(this.shortPath);
}

GamePlay.prototype.update = function(){
	this.map.update();
	this.mychar.update();
	//this.eneMgr.update();
	//this.twrMgr.update();

	//this.twrPanel.update();
	/*
	var twr = this.twrPanel.getPutTower();
	if(twr != null){
		if(this.map.judgePutTower(map.mPoint)){
			this.twrMgr.putTower(createTower(map.mPoint.clone(), twr));
		}
	}
	*/
}

GamePlay.prototype.draw = function(){
	this.map.draw();
	this.mychar.draw();
	//this.eneMgr.draw();
	//this.twrMgr.draw();

	//========================DEBUG========================//
	for(var e in this.shortPath){
		drawRect(MapToScrX(this.shortPath[e].x*TIP_SIZE), MapToScrY(this.shortPath[e].y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(200,120,0,1.0)");
	}
	if(this.map.mouseOnMap){
		if(this.judgePutTower(this.map.mp)){
			drawRect(MapToScrX(this.map.mp.x*TIP_SIZE), MapToScrY(this.map.mp.y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(0,120,200,1.0)");
		} else {
			drawRect(MapToScrX(this.map.mp.x*TIP_SIZE), MapToScrY(this.map.mp.y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(255,0,0,1.0)");
		}
	}
	drawText("mx:"+ this.map.mp.x + " my:" + this.map.mp.y, 100, 585,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	//========================DEBUG========================//
}

GamePlay.prototype.judgePutTower = function(point){
	return (this.map.judgePutTower(point) 
		 && this.mychar.judgePutTower(point)
		 //&& this.twrMgr.judgePutTower(point)
		 && judgeOpen(new Point(0,7), this.mychar.point, this.colMap, point));
}


function calcShortPath(start, end, colAry){
	//====初期化処理====//
	var costAry = new Array();		//出発地点からの移動コストを入れる配列
	var visitAry = new Array();		//訪問したかどうかを判定する配列
	for(var y = 0; y < MAP_YNUM; y++){
		costAry[y] = new Array();
		visitAry[y] = new Array();
		for(var x = 0; x < MAP_XNUM; x++){
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
	var sDirGuide = new Array();
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

function judgeOpen(start, end, srcColAry, addPoint){
	var colAry = copyArray(srcColAry);
	colAry[addPoint.y][addPoint.x] = 1;

	//====初期化処理====//
	var costAry = new Array();		//出発地点からの移動コストを入れる配列
	var visitAry = new Array();		//訪問したかどうかを判定する配列
	for(var y = 0; y < MAP_YNUM; y++){
		costAry[y] = new Array();
		visitAry[y] = new Array();
		for(var x = 0; x < MAP_XNUM; x++){
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
		if(p.x == end.x && p.y == end.y) return true;

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

	return false;
}
