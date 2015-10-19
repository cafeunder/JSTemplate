"use strict";

function drawGraph(image,x,y,alpha){
	ctx.globalAlpha = alpha;
	ctx.drawImage(image,x,y);
	ctx.globalAlpha = 1.0;
}

function drawRotaGraph(image,x,y,angle,alpha){
	var mx = x+image.width/2;
	var my = y+image.height/2;

	ctx.globalAlpha = alpha;
	
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(angle);
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
	ctx.strokeStyle = rgba;
	ctx.strokeRect(x,y,width,height);
	ctx.stroke();
}

function fillRect(x,y,width,height,rgba){
	ctx.fillStyle = rgba;
	ctx.fillRect(x,y,width,height);
	ctx.fill();
}

function drawCircle(x,y,r,l,rgba){
	ctx.lineWidth = l; 
	ctx.beginPath();
	ctx.strokeStyle = rgba;
	ctx.arc(x, y, r, 0, Math.PI*2, false)
	ctx.stroke();
}

function fillCircle(x,y,r,l,rgba){
	ctx.lineWidth = l; 
	ctx.beginPath();
	ctx.fillStyle = rgba;
	ctx.arc(x, y, r, 0, Math.PI*2, false)
	ctx.fill();
}