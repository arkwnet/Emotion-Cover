/*
Emotion Cover Ver.1.0_beta3
(c)2015-2017 Sora Arakawa all rights reserved.

This software is MIT License.
*/

var canvas=document.getElementById("mainCanvas");
var ctx=canvas.getContext("2d");
var mode=0;
var mode2=0;
var count=0;
var alpha=0;
var sid=0;
var sid_next=1;

window.onload=function(){
	setInterval(EmotionCoverMain,10);
}

function EmotionCoverMain(){
	canvas.addEventListener('click',EmotionCoverOnClick, false);
	ctx.globalAlpha=1;
	ctx.fillStyle="rgb(250,250,250)";
	ctx.fillRect(0,0,960,328);
	ctx.drawImage(verinfo,6,288);
	if(mode==0){
		ctx.globalAlpha=alpha;
		ctx.drawImage(logo,(canvas.width - 300)/2,(canvas.height - 143)/2,300,143);
		if(alpha<1){ alpha+=0.01; }
		if(alpha>0.99){ mode2++; }
		if(mode2>200){ mode2=0;mode=1; }
	}
	if(mode==1){
		ctx.globalAlpha=alpha;
		ctx.drawImage(logo,(canvas.width - 300)/2,(canvas.height - 143)/2,300,143);
		if(alpha>0.01){ alpha-=0.01; }
		if(alpha<0.02){ alpha=0;mode=2; }
	}
	if(mode==2){
		for(var i=0; i<images.length; i++) {
			if(mode2==1){
				if(sid==i){ ctx.globalAlpha=1; }else{ ctx.globalAlpha=0.2; }
			}else if(mode2==2){
				if(sid==i){
					if(alpha>0.2){ ctx.globalAlpha=alpha; }else{ ctx.globalAlpha=0.2; }
				}else{
					ctx.globalAlpha=1-alpha; 
				}
			}else{
				ctx.globalAlpha=alpha;
				if(sid!=i && alpha>0.2){ ctx.globalAlpha=0.2 }
			}
			if(i==sid){
				ctx.globalAlpha=1;
			}else{
				ctx.globalAlpha=0.5;
			}
			ctx.drawImage(images[i][0],0,i*76,180,76);
		}
		ctx.globalAlpha=alpha;
		ctx.drawImage(images[sid][0],180,0,780,328);
		if(mode2==1 || mode2==2){
			ctx.globalAlpha=1-alpha;
			ctx.drawImage(images[sid_next][0],180,0,780,328);
		}
		if(mode2==0){
			if(alpha<0.99){ alpha+=0.01; }
			if(alpha>0.98){ alpha=1;mode2=1; }
		}
		if(mode2==1){
			count++;
			if(count>800){ mode2=2; }
		}
		if(mode2==2){
			alpha-=0.01;
			if(alpha<0.02){
				alpha=1;
				sid=sid_next;
				sid_next=sid+1;
				count=0;
				mode2=1
			}
		}
		if(sid_next>images.length){ sid_next=0; }
		if(sid+1>images.length){ sid=0; }
	}
	if(sid_next>images.length-1){
		sid_next=0;
	}
}

function EmotionCoverOnClick(ec){
	var rect = ec.target.getBoundingClientRect();
    ecx = ec.clientX - rect.left;
    ecy = ec.clientY - rect.top;
	if(mode!=0 && ecx>180 && ecy>0 && ecx<960 && ecy<320 && images[sid][1]!=""){ location.href=images[sid][1]; }
	if(mode!=0 && mode2==1 && ecx>0 && ecy>0 && ecx<180 && ecy<228){
		if(parseInt(ecy/75)<images.length){
			sid_next=parseInt(ecy/75);
			alpha=1;
			mode2=2;
		}
	}
	if(mode!=0 && ecx>10 && ecy>282 && ecx<190 && ecy<320){ window.open("http://arkw.net/data/emotion_cover/","_blank"); }
}