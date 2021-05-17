let canvas;
let ctx;
let ball_list = [];
let elements_limit = 5;
let game_alphabet = [];
let hit_count = 0;
let miss_count = 0;
let checker = 0;
let backgroundmusic = new Audio();


window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	document.getElementById("startBtn").addEventListener("click", init_game);
}

function play_background(){
	backgroundmusic.src = "poppin- ksi.mp3";
	//Laulust: KSI lubab kõigil oma loodud muusikat vabalt kasutada!
	backgroundmusic.volume = 0.2;
	
	if (document.getElementById("allow_music").checked) {
        backgroundmusic.play();
        backgroundmusic.onended = function() {
            backgroundmusic.play();
			
        } 
    } else {
		
        backgroundmusic.pause();
		
    }
}

function set_score(){
	document.getElementById("gameScore").innerHTML = "Skoor: "+hit_count+"";
	document.getElementById("missScore").innerHTML = "Vale klikkamisi: "+miss_count+"";
}

function end_game(){
	backgroundmusic.pause();
	hit_count = 0;
	ball_list = [];
	document.getElementById("startBtn").innerHTML = "Alusta mängu";
	document.getElementById("startBtn").addEventListener("click", init_game);
}

function reset_game(){
	hit_count = 0;
	miss_count = 0;
	ball_list = [];
	add_elements();
	canvas.addEventListener("mousedown", check_hits);
	set_score();
}

function init_game(){
	hit_count = 0;
	miss_count = 0;
	ball_list = [];
	add_elements();
	canvas.addEventListener("mousedown", check_hits);
	document.getElementById("startBtn").innerHTML = "Restardi mäng";
	document.getElementById("startBtn").addEventListener("click", reset_game);
	document.getElementById("endBtn").addEventListener("click", end_game);
	set_score();
	play_background();
}

function check_hits(e){
	let m_x = e.clientX - canvas.offsetLeft + window.scrollX;
	let m_y = e.clientY - canvas.offsetTop + window.scrollY;
	
	for(let i = 0; i < ball_list.length; i ++){
		checker = 0;
		if(ball_list[i].was_hit(m_x, m_y)){
			if(ball_list[i].symbol == game_alphabet[hit_count]){
				ball_list.splice(i, 1);
				hit_count++;
				checker++;
			    break;				
			} else {
				miss_count++;
				break;
			}
		} else if (i == ball_list.length -1 && checker == 0){
			miss_count++;
		}
	}
	set_score();
}

function pythagoras(b_x, b_y, m_x, m_y){
	return Math.sqrt(Math.pow(b_x - m_x, 2) + Math.pow(b_y - m_y,2));
}

function add_elements(){
	let base_alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "W", "Õ", "Ä", "Ö", "Ü", "X", "Y"];
	game_alphabet = base_alphabet.slice(0);
	while(game_alphabet.length > elements_limit){
		let one_to_remove = Math.round(Math.random() * (game_alphabet.length - 1));
		game_alphabet.splice(one_to_remove, 1);
	}
	x = canvas.width / 2;
	y = canvas.height / 2;
	//r = 20;
	for(let i = 0; i < elements_limit; i++){
		let r = 15 + Math.round(Math.random() * 15);
		let symbol = game_alphabet[game_alphabet.length - 1 - i];
		let ballColor = "hsl(" + Math.round(Math.random() * 299) + ", 100%, 50%)";
		ball_list.push(new Game_ball(x,y,r,symbol,ballColor));
		
	}
	//move_1();
	//ball = new Game_ball(x,y,r);
	move_elements();
}

function move_elements(){
	canvas.width = canvas.width;
	ctx.fillStyle = "#FFCC00";
	//ball.move_self();
	//ball.draw_self();
	for(let i = 0; i < ball_list.length; i++){
		ball_list[i].move_self();
		ball_list[i].draw_self();
	}
	if(ball_list.length > 0){
		requestAnimationFrame(move_elements);
	}
	
}

class Game_ball{
	constructor(x,y,r,symbol,ballColor){
		this.x = x;
		this.y = y;
		this.r = r;
		this.ballColor = ballColor;
		this.symbol = symbol;
		this.speed_x = 0;
		this.speed_y = 0;
		this.set_speed();
		this.draw_self();
	}
	
	draw_self(){
		ctx.fillStyle = this.ballColor;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "bold " + Math.round(this.r * 1.4) + "px Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.symbol, this.x, this.y);
	}
	
	set_speed(){
		while(this.speed_x == 0 && this.speed_y == 0){
			this.speed_x = 5 - Math.round(Math.random()*10);
			this.speed_y = 5 - Math.round(Math.random()*10);
		}
	}
	
	move_self(){
		if(this.x <= this.r || this.x >= canvas.width - this.r){
			this.speed_x *= -1;
		}
		if(this.y <= this.r || this.y >= canvas.height - this.r){
			this.speed_y *= -1;
		}
		this.x += this.speed_x;
		this.y += this.speed_y;
	}
	
	was_hit(m_x, m_y){
		return pythagoras(this.x, this.y, m_x, m_y) <= this.r
	}
}

function move_1(){
	//clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = canvas.width;
	ctx.fillStyle = "#FFCC00";
	x += speed_x;
	y += speed_y;
	if(x <= r || x >= canvas.width - r){
		speed_x *= -1;
	}
	if(y <= r || y >= canvas.height - r){
		speed_y *= -1;
	}
	ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill();
	ctx.closePath();
	requestAnimationFrame(move_1);
}