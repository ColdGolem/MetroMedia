function report(level){

console.log("Crowd level:",level);

document.getElementById("unlockBox").classList.remove("hidden");

}

function watchAd(){

alert("Ad plays here to unlock chat preview");

document.getElementById("chatArea").classList.remove("hidden");

startTimer();

}

function startTimer(){

let time=600;

let timer=setInterval(()=>{

time--;

let m=Math.floor(time/60);
let s=time%60;

document.getElementById("timer").innerText=
"Chat unlocked for "+m+":"+s;

if(time<=0){

clearInterval(timer);

alert("Session ended. Watch another ad or pay.");

}

},1000);

}

function payChat(){

/*

RAZORPAY PAYMENT (ENABLE AFTER API KEYS)

var options={
key:"YOUR_KEY",
amount:"1000",
currency:"INR",
name:"MetroPulse",
description:"Unlock Chat",
handler:function(response){
alert("Chat unlocked!");
}
};

var rzp=new Razorpay(options);
rzp.open();

*/

alert("Payment system coming soon");

}
