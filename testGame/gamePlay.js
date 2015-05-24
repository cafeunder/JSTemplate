"use strict";

//=======================================================//
//	グローバル変数宣言
//=======================================================//
//var infoPanel = new InfoPanel();	//情報パネル
//var eftMgr = new EffectMgr();		//エフェクトマネージャ



//=======================================================//
//　クラス名 : GamePlay
//　概要 :
//		ゲームプレイを実装するクラスです。
//		ゲーム画面に存在する要素の親となり、
//		各モジュール間のやりとりを仲介します。
//		また、エネミーが侵攻する最短経路を計算し、保持します。
//　メンバ :
//		map Map					: マップ
//		mychar MyChar			: マイキャラ
//		eneMgr eneMgr			: エネミーマネージャ
//		twrMgr twrMgr			: タワーマネージャ
//		twrPanel TowerPanel		: タワーパネル
//		psyPanel PsyPanel		: サイキックパネル
//		wavePanel WavePanel		: 侵攻パネル
//		sysPanel SystemPanel	: システムパネル
//		colMap Array<整数>		: エネミーが侵入できるかどうかの配列（0:侵入できる 1:侵入できない）
//		shortPath Array<Point>	: 最短経路（位置）
//		shortGuide Array<整数>	: 最短経路（移動方向）
//=======================================================//
function GamePlay(){
	this.twrPanel = new TowerPanel(this);
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
	var DEBUG_MAP = 
	[
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,0,0,0,0, 0,0,1,1,1],
		[0,0,0,0,0, 0,0,0,0,0, 0,0,1,1,1],

		[0,0,0,0,0, 0,0,0,1,0, 0,1,1,1,1],
		[0,0,0,1,1, 1,0,0,0,0, 0,1,0,0,0],
		[0,0,0,1,1, 1,0,0,0,0, 0,0,0,0,0],
		[0,0,0,1,1, 1,0,0,0,0, 0,1,0,0,0],
		[0,0,0,0,0, 0,0,0,1,0, 0,1,1,1,1],

		[0,0,0,0,0, 0,0,0,0,0, 0,0,1,1,1],
		[1,1,1,1,1, 1,0,0,0,0, 0,0,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
		[1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1],
	];

	this.colMap = copyArray(DEBUG_MAP);
	
	//===DEBUG===
	var DEBUG_mx = 13;
	var DEBUG_my = 7;

	var DEBUG_ex = -1;
	var DEBUG_ey = 7;
	var spawnAry = new Array();
	spawnAry[0] = new Point(DEBUG_ex, DEBUG_ey);
	//===DEBUG===

	//this.map = new Map(マップ情報);
	this.map = new Map(DEBUG_MAP);
	//this.mychar = new MyChar(マイキャラx, y);
	this.mychar = new MyChar(new Point(DEBUG_mx, DEBUG_my));
	//this.eneMgr = new MyChar(侵攻位置配列, オーダー, this.mychar);
	this.eneMgr = new EnemyMgr(spawnAry, null, this.mychar);
	//this.twrMgr = new TowerMgr(this.eneMgr);
	this.twrMgr = new TowerMgr();

	this.shortPath = calcShortPath(new Point(DEBUG_ex, DEBUG_ey), new Point(DEBUG_mx, DEBUG_my), this.colMap);
	if(this.shortPath == null){
		alert("初期マップに移動できる経路が無い");
	}
	this.shortGuide = pathToGuide(this.shortPath);

	this.pathForecast = null;
	this.pfPoint = this.map.mp.clone();
}

//=======================================================//
//　関数名 : update
//　概要 : 
//		各モジュールの更新メソッドを呼び出します。
//		また、タワーの配置・侵攻／準備フェイズの切り替えも行います。
//=======================================================//
GamePlay.prototype.update = function(){
	
	//===DEBUG===//
	if(mouse.leftCount == 1){
		if(this.twrPanel.isSelected()){
			if(this.judgePutTower(this.map.mp)){
				this.putTower(this.twrPanel.getSelectTower(), this.map.mp.clone());
			}			
		}

		if(mouse.onRect(550,400,100,50)){
			this.eneMgr.next(this.shortPath, this.shortGuide);
		}
	}

	//以下の動作は設置時のみ
	if(this.pfPoint.x != this.map.mp.x || this.pfPoint.y != this.map.map.y){
		this.pfPoint = this.map.mp.clone();
		this.pathForecast = this.calcForeCast(this.colMap, this.pfPoint);
	}
	//===DEBUG===//


	//モジュールの更新メソッド
	this.map.update();
	this.mychar.update();
	this.eneMgr.update();
	this.twrMgr.update();

	this.twrPanel.update();

	//↓過去ドキュメント↓
	//TowerPanel実装後に削除
	/*
	var twr = this.twrPanel.getPutTower();
	if(twr != null){
		if(this.map.judgePutTower(map.mPoint)){
			this.twrMgr.putTower(createTower(map.mPoint.clone(), twr));
			//最短経路更新
			//準備フェイズ→侵攻フェイズ は、侵攻フェイズに移った時点で最短経路をeneMgrに渡す
		}
	}
	*/
}

//=======================================================//
//　関数名 : draw
//　概要 : 
//		各モジュールの描画メソッドを呼び出します。
//		また、ゲームの背景の描画も行います。
//=======================================================//
GamePlay.prototype.draw = function(){
	this.map.draw();
	this.mychar.draw();
	this.eneMgr.draw();
	this.twrMgr.draw();

	this.twrPanel.draw();

	//========================DEBUG========================//
	//
	// 設置時はthis.pathForecastを、非設置時はthis.shortPathを表示する。
	//
	var foreFlag = false;
	if(this.twrPanel.isSelected()){
		if(this.pathForecast != null){
			foreFlag = true;
		}
	}

	if(foreFlag){
		for(var e in this.shortPath){
			drawRect(MapToScrX(this.shortPath[e].x*TIP_SIZE), MapToScrY(this.shortPath[e].y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(100,255,0,1.0)");
		}
		for(var e in this.pathForecast){
			fillRect(MapToScrX(this.pathForecast[e].x*TIP_SIZE), MapToScrY(this.pathForecast[e].y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(255,100,0,0.5)");
		}
	} else {
		for(var e in this.shortPath){
			drawRect(MapToScrX(this.shortPath[e].x*TIP_SIZE), MapToScrY(this.shortPath[e].y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(100,255,0,1.0)");
		}
	}
	//


	if(this.map.mouseOnMap){
		if(this.judgePutTower(this.map.mp)){
			drawRect(MapToScrX(this.map.mp.x*TIP_SIZE), MapToScrY(this.map.mp.y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(0,120,200,1.0)");
		} else {
			drawRect(MapToScrX(this.map.mp.x*TIP_SIZE), MapToScrY(this.map.mp.y*TIP_SIZE), TIP_SIZE, TIP_SIZE, "rgba(255,0,0,1.0)");
		}
	}
	drawText("mx:"+ this.map.mp.x + " my:" + this.map.mp.y, 100, 585,"rgba(255,255,255,1.0)","20px 'MS Gothic'");

	drawRect(550,400,100,50,"rgba(255,255,255,1.0)");
	if(mouse.onRect(550,400,100,50)){
		fillRect(550,400,100,50,"rgba(0,255,255,0.5)");
	}
	//========================DEBUG========================//
}

//=======================================================//
//　関数名 : judgePutTower
//　概要 : タワーが置けるかどうかを判定します。
//	引数 :
//		point Point : 判定する位置
//=======================================================//
GamePlay.prototype.judgePutTower = function(point){
	if(point.x < 0 || point.x >= MAP_XNUM || point.y < 0 || point.y >= MAP_YNUM){
		return false;
	}

	return (this.map.judgePutTower(point)
		 && this.mychar.judgePutTower(point)
		 && this.twrMgr.judgePutTower(point)
		 && judgeOpen(this.eneMgr.spawnPoint[0], this.mychar.point, this.colMap, point));	//DEBUG
}

//=======================================================//
//　関数名 : updateCollisionMap
//　概要 : 
//		colMapの値を更新します。
//		それと同時に最短経路を更新します。
//　引数 :
//		point Point	: 更新する位置
//		value 整数	: 更新する値
//=======================================================//
GamePlay.prototype.updateCollisionMap = function(point, value){
	this.colMap[point.y][point.x] = value;
	this.shortPath = calcShortPath(this.eneMgr.spawnPoint[0], this.mychar.point, this.colMap);
	if(this.shortPath == null){
		alert("最短経路が存在しない");
	}
	this.shortGuide = pathToGuide(this.shortPath);
}

//=======================================================//
//　関数名 : putTower
//　概要 : 
//		タワーを配置します。
//		タワーマネージャにインスタンスを渡し、
//		colMapの値を更新します。
//　引数 :
//		name 文字列	: 配置するタワーの名前
//		point Point	: 配置する位置
//=======================================================//
GamePlay.prototype.putTower = function(name, point){
	this.twrMgr.putTower(createTower(name, point, this.eneMgr));
	this.updateCollisionMap(point,1);
}

//=======================================================//
//　関数名 : calcForeCast
//　概要 : pointの位置にタワーを置いた場合の、
//　　　　 最短経路を計算します。
//=======================================================//
GamePlay.prototype.calcForeCast = function(colMap, point){
	if(point.x < 0 || point.x >= MAP_XNUM || point.y < 0 || point.y >= MAP_YNUM){
		return null;
	}

	var tempMap = copyArray(colMap);
	tempMap[point.y][point.x] = 1;

	return calcShortPath(this.eneMgr.spawnPoint[0], this.mychar.point, tempMap);
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
