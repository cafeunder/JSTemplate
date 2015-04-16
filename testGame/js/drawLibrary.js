function drawGraph(image,x,y,alpha){
	ctx.globalAlpha = alpha;
	ctx.drawImage(image,x,y);
	ctx.globalAlpha = 1.0;
}

function drawRotaGraph(image,x,y,angle,alpha){
	var rad = angle * Math.PI / 180;
	var mx = x+image.width/2;
	var my = y+image.height/2;

	ctx.globalAlpha = alpha;
	
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(rad);
    ctx.translate(-mx, -my);    
    ctx.drawImage(image, x, y);
    ctx.restore();
	
	ctx.globalAlpha = 1.0;
}

function drawText(str,x,y,rgba,font){
	ctx.fillStyle = rgba;
	ctx.font = font;
	ctx.fillText(str,x,y);
}

function drawRect(x,y,width,height,rgba){
	ctx.fillStyle = rgba;
	ctx.fillRect(x,y,width,height);
}