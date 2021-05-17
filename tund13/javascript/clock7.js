let sound_url = "../../../../../~rinde/media/sounds/kellaheli/";
let clock_speaker = new Audio();
let time_words = [];
let bell = new Audio();

function init_clock(){
	clockTick();
	document.getElementById("clock_speak_btn").addEventListener("click", tell_time);
	bell.src = sound_url + "kell.mp3";


	//prev_hour = new Date().getHours;
}

function clockTick(){
	let currenttime = new Date();
    let currenthour = currenttime.getHours();
    let currentminute = currenttime.getMinutes();
    let currentsecond = currenttime.getSeconds();
    let secangle = currentsecond * 6;
    let minangle = currentminute * 6 + (secangle / 60);
    let hourangle = currenthour * 30 + ((currentminute * 6) / 12);
    document.getElementById("secondhand").style.transform = "rotate(" + secangle + "deg)";
    document.getElementById("minutehand").style.transform = "rotate(" + minangle + "deg)";
    document.getElementById("hourhand").style.transform = "rotate(" + hourangle + "deg)";
	//kas lüüa kella
	//kavalam on kontrollida kas document.getElementById("allow_bell_btn").checked ja tundide arv erineb eelmise tsükli tundidest
	//ehk currenthour != prev_hour
	//if(currenttime == 0 && currentsecond == 0 && currenttime.getMilliseconds() < 1000 && document.getElementById("allow_bell_btn").checked){
	// loendur, mitu korda vaja lüüa
	//}
	let counter = currenthour;
	
	if(currentminute == 0 && currentsecond < 1 && document.getElementById("allow_bell_btn").checked){
		if(currenthour > 12){
			counter = currenthour - 12;
			for(i = 0; i <= counter; ){
				hourBang();
				i++;

			}
		} else{
			for(i = 0; i <= counter; i++){
				hourBang();	
				i++;
			}
		}
	}
	 
	
    requestAnimationFrame(clockTick);
}

function hourBang(){
	bell.play();
	
	
	
	/* console.log("kikimiki");
	bell.src = sound_url + "kell.mp3";
	let currenttime = new Date();
    let currenthour = currenttime.getHours();
    let currentminute = currenttime.getMinutes();
    var currentsecond = currenttime.getSeconds();
	let counter = currenthour;
	console.log("kikimiki1.5");
	console.log(currentsecond);
	var i = 0;
	console.log("kikimiki2");
	
	/*if(currentminute == 0 && currentsecond < 1 && document.getElementById("allow_bell_btn").checked){
		if(currenthour > 12){
			counter = counter - 12;
			for(i = 0; i <= counter; ){
				bell.play();
				if(bell.addEventListener("ended")){
					i++;
				}
				
			}
		} else{
			for(i = 0; i <= counter; i++){
				bell.play();
			}
		} 
	} */
	
}

function tell_time(){
	time_words.push("kellon");
	let currenttime = new Date();
	num_to_words(currenttime.getHours())
	time_words.push("ja");
	num_to_words(currenttime.getMinutes());
	if(currenttime.getMinutes() == 1){
		time_words.push("minut");
	} else {
		time_words.push("minutit");
	}
	document.getElementById("clock_speak_btn").removeEventListener("click", tell_time);
	document.getElementById("clock_speak_btn").disabled = true;
	clock_speaker.addEventListener("ended", speak_time);
	speak_time();
		
}

function speak_time(){
	if(time_words.length > 0){
		clock_speaker.src = sound_url + time_words[0] + ".mp3";
		clock_speaker.play();
		time_words.shift();
	} else {
		clock_speaker.removeEventListener("ended", speak_time);
		document.getElementById("clock_speak_btn").disabled = false;
		document.getElementById("clock_speak_btn").addEventListener("click", tell_time);
	}
}

function num_to_words(num_value){
	if(num_value <= 10){
		time_words.push(num_value)
	} else {
		let tens = Math.floor(num_value / 10);
		let ones = num_value % 10;
		if(tens == 1){
			time_words.push(ones);
			time_words.push("teist")
		} else {
			time_words.push(tens);
			time_words.push("kymmend");
			if(ones > 0){
				time_words.push(ones);
			}
		}
	}
}

