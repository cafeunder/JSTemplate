var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

XNUM = 15;
YNUM = 15;
TIP_SIZE = 32;

function Map() {
	this.DEBUG_MAP = new Array();


	for(var y = 0; y < YNUM; y++){
		this.DEBUG_MAP[y] = new Array();
		for(var x = 0; x < XNUM; x++){
			this.DEBUG_MAP[y][x] = 0;
		}
	}

	this.mouseOnMap = false;
	this.mp = new Point();
	this.sPath = new Array();
}

function DirPoint(p,d){
	switch(d){
	case UP:
		if(p.y-1 >= 0 && p.y-1 < YNUM){
			return new Point(p.x, p.y-1);
		}
		break;
	case DOWN:
		if(p.y+1 >= 0 && p.y+1 < YNUM){
			return new Point(p.x, p.y+1);
		}
		break;
	case LEFT:
		if(p.x-1 >= 0 && p.x-1 < XNUM){
			return new Point(p.x-1, p.y);
		}
		break;
	case RIGHT:
		if(p.x+1 >= 0 && p.x+1 < XNUM){
			return new Point(p.x+1, p.y);
		}
		break;
	}
	return null;
}

Map.prototype.calcPath = function() {
	var iPoint = new Point(0,7);	//出発地点
	var ePoint = new Point(13,7);	//目的地点

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
	costAry[iPoint.y][iPoint.x] = 0;
	queue.enqueue(iPoint);
	while(true){
		var p = queue.dequeue();
		if(p == null) break;

		var c = costAry[p.y][p.x];
		var np;

		np = DirPoint(p, LEFT);
		if(np != null && costAry[np.y][np.x] == -1 && this.DEBUG_MAP[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, RIGHT);
		if(np != null && costAry[np.y][np.x] == -1 && this.DEBUG_MAP[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, UP);
		if(np != null && costAry[np.y][np.x] == -1 && this.DEBUG_MAP[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
		np = DirPoint(p, DOWN);
		if(np != null && costAry[np.y][np.x] == -1 && this.DEBUG_MAP[np.y][np.x] == 0){
			queue.enqueue(np);
			costAry[np.y][np.x] = c+1;
		}
	}
	this.costAry = costAry;


	//====最短経路探索====//
	//移動コストを用いて最短経路を探索する
	//ただし経路が複数ある場合は、①直進を優先する ②上右下左の優先順位で方向を選ぶ ようにする
	var stack = new Stack();
	var dirStack = new Stack();

	var dir = UP, nowCost = 0;
	stack.push(iPoint);
	dirStack.push(dir);
	visitAry[iPoint.y][iPoint.x] = 1;
	while(true){
		//スタックの一番上を見る
		var p = stack.peak();
		if(p == null){
			//スタックが空なら「目的地に至る経路はない」
			this.sPath = null;
			return;
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
			if(np.x == ePoint.x && np.y == ePoint.y){
				//次の地点が目的地なら、現在のスタックが最短経路
				this.sPath = stack.__a;
				return;
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

Map.prototype.update = function() {
	var mapMX = mouse.x-TIP_SIZE/2;
	var mapMY = mouse.y-TIP_SIZE/2;

	if(mapMX < 0 || mapMX >= TIP_SIZE*XNUM || mapMY < 0 || mapMY >= TIP_SIZE*YNUM){
		this.mouseOnMap = false;
		this.mp.x = -1;
		this.mp.y = -1;	
	} else {
		this.mouseOnMap = true;
		this.mp.x = mapMX/TIP_SIZE;
		this.mp.y = mapMY/TIP_SIZE;

		this.mp.x = parseInt(this.mp.x);
		this.mp.y = parseInt(this.mp.y);

		if(mouse.leftCount == 1){	
			this.DEBUG_MAP[this.mp.y][this.mp.x] = (this.DEBUG_MAP[this.mp.y][this.mp.x]+1)%2;
		}
	}

	this.calcPath();
}

Map.prototype.draw = function(){
	fillRect(0, 0, (XNUM+1)*TIP_SIZE, (YNUM+1)*TIP_SIZE, "rgb(50,50,50)");
	for (x = 0; x < XNUM; x++) {
		for (y = 0; y < YNUM; y++) {
			var img;
			if(this.DEBUG_MAP[y][x] == 0){
				img = ImageArray["MASU"].image;
			} else {
				img = ImageArray["TEMP"].image;
			}
			drawGraph(img, x*TIP_SIZE+TIP_SIZE/2, y*TIP_SIZE+TIP_SIZE/2);
			if(mouse.leftCount == 0){
				drawText(""+this.costAry[y][x], x*TIP_SIZE+TIP_SIZE/2, (y+1)*TIP_SIZE+TIP_SIZE/2,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
			} else {
				drawText(""+this.DEBUG_MAP[y][x], x*TIP_SIZE+TIP_SIZE/2, (y+1)*TIP_SIZE+TIP_SIZE/2,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
			}
		}
	}

	drawText("mx:"+this.mp.x + " my:"+this.mp.y,400,20,"rgba(255,255,255,1.0)","20px 'MS Gothic'");
	if(this.mouseOnMap){
		fillRect(this.mp.x*TIP_SIZE+TIP_SIZE/2, this.mp.y*TIP_SIZE+TIP_SIZE/2, TIP_SIZE, TIP_SIZE, "rgba(0,255,255,0.5)");
	}

	if(this.sPath != null){
		for(var i in this.sPath){
			fillRect(this.sPath[i].x*TIP_SIZE+TIP_SIZE/2, this.sPath[i].y*TIP_SIZE+TIP_SIZE/2, TIP_SIZE, TIP_SIZE, "rgba(0,255,0,0.5)");
		}
	}
}