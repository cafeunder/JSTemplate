//キーコード定義
var KEY_F = 70;
var KEY_R = 82;
//必要なところでしてね

var SYSTEM_KEY_CHECK = new Array();
function Keyboard(){
	this.KEY_BUF = new Array();
	for(var i = 0; i < 256; i++){
		this.KEY_BUF[i] = 0;
	}
}

Keyboard.prototype.update = function(){
	for(var i = 0; i < 256; i++){
		if(SYSTEM_KEY_CHECK[i]){
			this.KEY_BUF[i]++;
		} else {
			this.KEY_BUF[i] = 0;
		}
	}
}

Keyboard.prototype.checkKey = function(code){
	return this.KEY_BUF[code];
}


function keyUp(event){
	if(!event) event = window.event;
	SYSTEM_KEY_CHECK[event.keyCode] = false;
}

function keyDown(event){
	if(!event) event = window.event;
	SYSTEM_KEY_CHECK[event.keyCode] = true;
}