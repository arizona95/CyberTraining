/*
	privateIPDemo.js
	A.K.Herber '12
	18JUL2012
	Javascript
	jQuery 1.7.2
*/

/*Global Vars*/
var currentNode;
var nextNode;

var locked = false;
var state = 0;
var step = [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11];

var host1;
var gateway;
var table;
var host2;
var data1;
var data2;
var data3;
var data4;	
var stepButton;
var packet;


/*Initializing Function*/
function NATinit(){

	/*This code breaks the webpage in IE*/
	if(navigator.appName == "Microsoft Internet Explorer"){
		body.text = "";
	}
	
	host1 = document.getElementById("host1");
	gateway = document.getElementById("gateway1");
	table = document.getElementById("table1");
	host2 = document.getElementById("host2");
	data1 = document.getElementById("data1");
	data2 = document.getElementById("data2");
	data3 = document.getElementById("data3");
	data4 = document.getElementById("data4");
	
	natTable1 = document.getElementById("natTable1");
	natTable2 = document.getElementById("natTable2");

	stepButton = document.getElementById("step");
	
	packet1 = document.getElementById("packet");
}

function executeStep(){
	if(!locked){
		step[state]();
	}
	else{
		return;
	}
}

function NATreset(){
	if(!locked){
		location.reload();
	}
	else{
		return;
	}
}

//sourceNode calculates it's network address
function step1(){
	
	//button says next step
	stepButton.innerHTML = "NEXT<br/>STEP"
	
	//highlight host1
	host1.style.backgroundColor="#ADEBFF";
	
	//make data box 1 visible
	data1.style.visibility = "visible";

	state++;
}

function step2(){
	
	//unhighlight host1
	host1.style.backgroundColor="white";
	
	//move packet to the gateway
	movePacket(440, function(){
		//unlock from move
		locked = false;
		//highlight gateway
		gateway.style.backgroundColor="#ADEBFF";
	});
	
	state++;
}

function step3(){
	
	//make data box 2 visible
	data2.style.visibility = "visible";
	
	state++;
}

function step4(){
	
	//highlight table
	table.style.backgroundColor="#ADEBFF";
	
	//show new table entry
	natTable1.style.visibility="visible";
	natTable2.style.visibility="visible";
	state++;
}

function step5(){

	//un-highlight table
	table.style.backgroundColor="white";

	//un-highlight gateway
	gateway.style.backgroundColor="white";

	//move packet from gateway to host2
	movePacket(445, function(){
		//unlock from move
		locked = false;
		//highlight host2
		host2.style.backgroundColor="#ADEBFF";		
	});
	
	state++;	
}

function step6(){	
	//make data 1 and 2 hidden
	data1.style.visibility = "hidden";
	data2.style.visibility = "hidden";
	
	state++;
}

function step7(){

	//make data 3 visible
	data3.style.visibility = "visible";
	
	state++;
}

function step8(){
	//unhighlight host2
	host2.style.backgroundColor="white";
	
	//move packet from host 2 to gate way
	movePacket(-445, function(){
		//unlock from move
		locked = false;
		//highlight gateway
		gateway.style.backgroundColor="#ADEBFF";
	});
	
	state++;
}

function step9(){

	//make data 4 visible
	data4.style.visibility = "visible";
	
	state++;
}

function step10(){
	//unhighlight gateway
	gateway.style.backgroundColor="white";

	//move packet from gateway to host 1
	movePacket(-440, function(){
		//unlock from move
		locked = false;
		//highlight host 1
		host1.style.backgroundColor="#ADEBFF";		
	});
	
	state++;
}

function step11(){
	
	//unhighlight host1
	host1.style.backgroundColor="white";
	
	//clear table entry
	natTable1.style.visibility="hidden";
	natTable2.style.visibility="hidden";

	
	//button says begin
	stepButton.innerHTML = "BEGIN<br/>DEMO"
	
	//make data 3 and 4 hidden	
	data3.style.visibility = "hidden";
	data4.style.visibility = "hidden";
	
	//reset state to 0
	state = 0;
}


/*Image moving*/
function movePacket(dist, callback) {	
	locked = true;
	
    $("#packet1").animate({
        left: "+=" + dist + "px"
    }, 3000, callback);
}

