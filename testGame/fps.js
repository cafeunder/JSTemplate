var SAMPLE_FRACT = 50;

function Fps(){
	this.FPS = 0;
	this.first = 0;
	this.sampleNum = 0;
}

Fps.prototype.update = function(){
	if(this.sampleNum == 0){
		this.first = +new Date();
	}
	if(this.sampleNum == SAMPLE_FRACT){
		var end = +new Date();
		this.FPS = 1000.0 / ((end - this.first)/parseFloat(SAMPLE_FRACT));
		this.sampleNum = 0;
	} else this.sampleNum++;
}