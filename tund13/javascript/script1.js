let message = "Töötab!"; //varem oli var
let picurl = "../../../~rinde/media/photos/TLU_600x400/";
let picnameprefix = "tlu_";
let picext = ".jpg";
let minpicnum = 1;
let maxpicnum = 43;
let picnum = 1;
let picchange = 0;

window.onload = function(){
	//alert(message);
	console.log("Sõnum on: " + message);
	putOpenTime();
	putRandomPic();
	init_draw();
	init_clock();
	setButtons();
	//setInterval(300,clockTick);
	//järgnev funktsioon on teisies failis (music7)
	prepare_audio();
	
}

function setButtons(){
	document.getElementById("nextphoto").addEventListener("click", nextPhoto);
	document.getElementById("prevphoto").addEventListener("click", prevPhoto);
	//panen photo opacity siirde lõppu kuulama   transitionstart    transitionend
	document.getElementById("tlu_pic2").addEventListener("transitionend", enableButtons);
	document.getElementById("animBtn").addEventListener("click", toggleAnim);
	document.getElementById("stage").addEventListener("animationstart", animInfo);
	document.getElementById("stage").addEventListener("animationend", animInfo);
	document.getElementById("stage").addEventListener("animationiteration", animInfo);
}

function nextPhoto(){
	picnum++;
	if(picnum > maxpicnum){
		picnum = minpicnum;
	}
	putPhoto();
}

function prevPhoto(){
	picnum--;
	if(picnum < minpicnum){
		picnum = maxpicnum;
	}
	putPhoto();
}

function enableButtons(){
	document.getElementById("nextphoto").disabled = false;
	document.getElementById("prevphoto").disabled = false;
}

function putOpenTime(){
	let currenttime = new Date();
	let currenthour = currenttime.getHours();
	let currentminute = currenttime.getMinutes();
	let currentsecond = currenttime.getSeconds();
	document.getElementById("open_message").innerHTML = "Leht avati kell " + currenthour + ":" + currentminute + ":" + currentsecond + ".";
}

function putRandomPic(){
	let randomnum = minpicnum + Math.round(Math.random() * (maxpicnum - minpicnum));
	picnum = randomnum;
	putPhoto();
	document.getElementById("tlu_pic").src = picurl + picnameprefix + picnum + picext;
}

function putPhoto(){
	document.getElementById("nextphoto").disabled = true;
	document.getElementById("prevphoto").disabled = true;
	if(picchange%2 == 0){
		document.getElementById("tlu_pic2").src = picurl + picnameprefix + picnum + picext;
		document.getElementById("tlu_pic2").style.opacity = 1;
	} else {
		document.getElementById("tlu_pic").src = picurl + picnameprefix + picnum + picext;
		document.getElementById("tlu_pic2").style.opacity = 0;
	}
	picchange++;
}


function toggleAnim(){
	//console.log(document.getElementById("truckarea").style.animationPlayState);
	let allitems = document.getElementById("stage").getElementsByTagName("*");
	//console.log(allitems);
	
	
	if(document.getElementById("animBtn").innerHTML == "Käivita animatsioon"){
		document.getElementById("animBtn").innerHTML = "Peata animatsioon";
		//document.getElementById("truckarea").style.animationPlayState = "running";
		for(let i = 0; i < allitems.length; i++){
		allitems[i].style.animationPlayState ="running";
		}
	} else {
		document.getElementById("animBtn").innerHTML = "Käivita animatsioon";
		//document.getElementById("truckarea").style.animationPlayState = "paused";
		for(let i = 0; i < allitems.length; i++){
		allitems[i].style.animationPlayState ="paused";
		}
	}
}

function animInfo(evt){
	if(evt.type == "animationend"){
		if(evt.target.id == "truckarea"){
				let animdelay = 1 + Math.round(Math.random() * 5);
				let animduration = 8 + Math.round(Math.random() * 5);
				evt.target.style.animationDelay = animdelay + "s";
				evt.target.style.animationDuration = animduration + "s";
			if(evt.animationName == "drive"){
				evt.target.style.animationName = "driveback";
			} else{
				evt.target.style.animationName = "drive";
			}
		}
		if(evt.target.id == "wm_wing"){
			let animdelay = 1 + Math.round(Math.random() * 1);
			let animduration = 1 + Math.round(Math.random() * 1);
			evt.target.style.animationDelay = animdelay + "s";
			evt.target.style.animationDuration = animduration + "s";
			evt.target.style.animationName = "spin";
		}
	}
}