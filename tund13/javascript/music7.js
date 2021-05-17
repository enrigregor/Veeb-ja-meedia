let music_url ="../../../../../~rinde/media/sounds/Funkytown.mp3";
let music_player = new Audio();

function prepare_audio(){
	music_player.addEventListener("canplay", show_info);
	music_player.addEventListener("canplaythrough", can_start);
	music_player.addEventListener("durationchange", show_info)
	music_player.src = music_url;
	document.getElementById("music_vol_btn").addEventListener("input", set_music_volume);
	document.getElementById("music_speed_btn").addEventListener("input", set_music_speed);
	//music_player.play();
	
}

function show_info(evt){
	//console.log("saab!");
	if(evt.type = "durationchange"){
		document.getElementById("music_pos_slider").max = evt.target.duration;
		music_player.addEventListener("timeupdate", show_info);
		document.getElementById("music_pos_slider").addEventListener("change", music_seek);
	}
	if(evt.type = "timeupdate"){
		document.getElementById("music_pos").innerHTML = evt.target.currentTime.toFixed(1);
		document.getElementById("music_pos_slider").value = evt.target.currentTime.toFixed(1);
	}
	
}

function music_seek(evt){
	music_player.currentTime = evt.target.value;
}

function set_music_volume(evt){
	music_player.volume = evt.target.value;
}
function set_music_speed(evt){
	music_player.playbackRate = evt.target.value;
}

function can_start(){
	//console.log("saab lõpuni!");
	music_player.removeEventListener("canplaythrough", can_start);
	document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	document.getElementById("music_btn").addEventListener("click", toggle_music_play);
	
}

function toggle_music_play(){
	if(music_player.paused){
		music_player.play();
		document.getElementById("music_btn").innerHTML = "Peata muusika!";
	} else {
		music_player.pause();
		document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	}
}