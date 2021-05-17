let canvas;
let ctx;


function init_draw(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	draw_rect();
	draw_circle();
	draw_line();
	draw_pacman();
}

function draw_pacman(){
	/*ctx.beginPath();
		ctx.arc(800, 110, 100, .1 * Math.PI, 1.9* Math.PI);
		ctx.lineTo(800, 110);
		ctx.fill();
	ctx.closePath();*/
}

function draw_line(){
	ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.moveTo(200, 150);
		ctx.lineTo(450, 150);
		ctx.stroke();
		ctx.lineTo(325, 88);
		ctx.stroke();
		ctx.lineTo(200, 150);
		ctx.stroke();
		ctx.fill();
		//ctx.quadraticCurveTo(480, 270, 200, 360);
		//ctx.bezierCurveTo(400, 360, 0, 450, 200, 540);
		//ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth = 6;
		ctx.strokeStyle = "black";
		ctx.moveTo(550, 80);
		ctx.bezierCurveTo(575, 55, 600, 80, 625, 55);
		ctx.stroke();
		ctx.moveTo(660, 120);
		ctx.quadraticCurveTo(700, 100, 760, 120);
		ctx.stroke();
	ctx.closePath();
	ctx.strokeStyle = "green";
	ctx.beginPath();
		var min = Math.ceil(480);
		var max = Math.floor(490)
		var i;
		var gw = 0;
		var gl = 485;
		ctx.lineWidth = 3;
		for(i=0; i < canvas.width; i++){
			ctx.moveTo(gw, 500);
			ctx.lineTo(gw, gl);
			gw = gw + 10;
			gl = Math.floor(Math.random() * (max - min) + min);
			ctx.stroke();
		}
	ctx.closePath();
		ctx.lineWidth = 6;
}

function draw_circle(){
	ctx.beginPath();
		ctx.fillStyle = "yellow";
		//kaar arc x y r algusnurk lõpunurk
		ctx.arc(860, 100, 80, 0, 2 * Math.PI);
		ctx.fill();
	ctx.closePath();
	ctx.beginPath();
		//ctx.moveTo(200, 150);
		ctx.fillStyle = "white";
		ctx.arc(445, 88, 65, 0, 2 * Math.PI);
		ctx.fill();
		ctx.arc(212, 88, 65, 0, 2 * Math.PI);
		ctx.fill()
		ctx.arc(327.5, 65, 80, 0, 2 * Math.PI);
		ctx.fill()
	ctx.closePath();
}

function draw_rect(){
	ctx.strokeStyle = "lightblue";
	ctx.lineWidth = 6;
	ctx.fillStyle = "lightblue";
	console.log("Joonistan");
	//x y w h
	ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	/*ctx.strokeStyle = "yellow";
	ctx.fillStyle = "AAFFAA";
	ctx.rect((canvas.width - 200) / 2 + 200, (canvas.height - 100) / 2, 200, 100);
	ctx.fill();
	ctx.stroke();*/
	ctx.beginPath();
		ctx.fillStyle = "green";
		ctx.rect(0, 500, canvas.width, 490);
		ctx.stroke();
		ctx.fill();
	ctx.closePath();
	
}