/*
	netDemo.js
	A.K.Herber '12
	09JUL2012
	Javascript
	jQuery 1.7.2
*/
/*Global Vars*/
var sourceNode;
var destNode;
var currentNode;
var nextNode;
var message = "Data Dat-uh Datta Date-uh";
var goBit = false;
var locked = false;
var state = 0;
var step = [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13, step14];

var objects = new Object();
var arpReqs;
var arpResp;
var packet;
var arpIP = "0.0.0.0";


/*Initializing Function*/
function init(){

	/*This code breaks the webpage in IE*/
	if(navigator.appName == "Microsoft Internet Explorer"){
		body.text = "";
	}
	
	clear();
	
	objects.host1 = {	type: "host", name: "host1", ip: "22.87.123.6", gateway: "22.87.123.27", 
		net: "22.87.123.0", mac: "E6-00-6A-FB-39-1D", switchName: "switch1", obj: document.getElementById("host1"),
		x: 190, y:30};

	objects.host2 = {	type: "host", name: "host2", ip: "22.87.123.42", gateway: "22.87.123.27", 
		net: "22.87.123.0", mac: "04-B3-BC-18-9A-11", switchName: "switch1", obj: document.getElementById("host2"),
		x: 700, y:90};

	objects.router1 = {	type: "router", name: "router1", ip: "22.87.123.27", gateway: "78.136.30.26", 
		net: "22.87.123.0", mac: "50-E3-BB-10-C2-64", switchName: "switch1", obj: document.getElementById("router1"),
		x: 280, y:300};

	objects.switch1 = {	type: "switch", name: "switch1", obj: document.getElementById("switch1"),
		x: 450, y:160};

	objects.host3 = {	type: "host", name: "host3", ip: "101.66.95.9", gateway: "101.66.95.70", 
		net: "101.66.95.0", mac: "EE-46-02-72-39-B3", switchName: "switch2", obj: document.getElementById("host3"),
		x: 230, y:680};

	objects.host4 = {	type: "host", name: "host4", ip: "101.66.95.41", gateway: "101.66.95.70", 
		net: "101.66.95.0", mac: "33-48-A1-EC-BB-3A", switchName: "switch2", obj: document.getElementById("host4"),
		x: 800, y:750};

	objects.router2 = {	type: "router", name: "router2", ip: "101.66.95.70", gateway: "207.46.145.85", 
		net: "101.66.95.0", mac: "12-12-3D-AB-68-F2", switchName: "switch2", obj: document.getElementById("router2"),
		x: 680, y:540};

	objects.switch2 = {	type: "switch", name: "switch2", obj: document.getElementById("switch2"),
		x: 430, y:675};
	
	packet = document.getElementById("packet");
	
	arpReqsA = document.getElementById("a");
	arpReqsB = document.getElementById("b");
	arpReqsC = document.getElementById("c");
	arpReqs = new Array(arpReqsA, arpReqsB, arpReqsC);
	arpResp = document.getElementById("d");
}

function clear(){
	sourceNode = "";
	destNode = "";
	goBit = false;
	clearBox();
	state = 0;
	
	for (var i in objects){
		objects[i].obj.style.backgroundColor="white";
	}
	
}

/*Text box functions*/
function clearBox(){
	document.getElementById("textBox").innerHTML = "";
}

function appendText(text){
	document.getElementById("textBox").innerHTML += text;
}

function setScroll(){
	document.getElementById("textBox").scrollTop = document.getElementById("textBox").scrollHeight;
}

/*Selection / Deselection functions*/
function clicked(who){
	if (sourceNode == ""){	
		sourceNode = objects[who.id];
		setSelection1(sourceNode.obj);
		appendText("sender is " + sourceNode.name + "<br />");
		appendText( sourceNode.name + "'s IP is: " + sourceNode.ip + "<br />");
	}
	else if (sourceNode == objects[who.id]){
		if(destNode == ""){
			return;
		}
		else {
			deSelect(sourceNode.obj);
			deSelect(destNode.obj);
			clear();

			sourceNode = objects[who.id];
			setSelection1(sourceNode.obj);
			appendText("sender is " + sourceNode.name + "<br />");
			appendText( sourceNode.name + "'s IP is: " + sourceNode.ip + "<br />");	
			goBit = false;
			destNode = "";
		}
	}
	else if (destNode == ""){
		destNode = objects[who.id];
		setSelection2(destNode.obj);
		appendText("receiver is " + destNode.name + "<br />");
		appendText( destNode.name + "'s IP is: " + destNode.ip + "<br />");
		appendText("<hr />");
		goBit = true;
	}	
	else{
		deSelect(sourceNode.obj);
		deSelect(destNode.obj);
		clear();
		
		sourceNode = objects[who.id];
		setSelection1(sourceNode.obj);
		appendText("sender is " + sourceNode.name + "<br />");
		appendText( sourceNode.name + "'s IP is: " + sourceNode.ip + "<br />");
		goBit = false;
		destNode = "";
	}	
}

function setSelection1(obj){
	obj.style.border="5px solid #00FF00";
}

function setSelection2(obj){
	obj.style.border="5px solid red";
}

function deSelect(obj){
	obj.style.border="3px solid black";
}


/*Button Controls / Animation*/
function addMessage(){
	if(!goBit){
		message = prompt("Message:","");
	}
	else{
		return;
	}
}
 
function arpRequest(){
	if(!locked && !goBit){
		if(sourceNode == ""){
			alert("You must select a source!");
		}
		else{
			appendText("<hr />");
			var theSwitch = objects[sourceNode.switchName];
			var theAnswer = null;
			var network = new Array;
			var count = 0;
			for (var i in objects){
				if(objects[i].net == sourceNode.net){
					network[count] = objects[i];
					count++;
				}
			}			
			
			arpIP = prompt("Enter IP you are searching for:", arpIP);
			
			//get the first arpReq node to the source location
			arpReqsA.style.left = sourceNode.x + "px";
			arpReqsA.style.top = sourceNode.y + "px";
			
			appendText(sourceNode.name + " sends broadcast message:" + "<br />");
			appendText("Who has IP " + arpIP + " ?" + "<br />");
			setScroll();
			appendText("<hr />");
			
			//send the red pack to the sourceNode.switchName
			moveArp(arpReqsA.id, sourceNode, objects[sourceNode.switchName], function() {				
				
				arpReqsB.style.left = theSwitch.x + "px";
				arpReqsB.style.top = theSwitch.y + "px";
				arpReqsC.style.left = theSwitch.x + "px";
				arpReqsC.style.top = theSwitch.y + "px";
				
				//sourceNode.switchName sends red packs to all connected peers (including origin)
				appendText(theSwitch.name + " repeats broadcast message on all connections." + "<br />");
				appendText("<hr />");
				setScroll();
				
				for(var i = 0; i < arpReqs.length; i++){
					moveArp(arpReqs[i].id, theSwitch, network[i], function() {});
					//check if the ip matches an ip on the origin's network
					if(network[i].ip == arpIP){
						theAnswer = network[i];
					}					
				}
				
				setTimeout(function(){
				
					if(theAnswer != null){
						
						//position arpResp at theAnswer
						arpResp.style.left = theAnswer.x + 'px';
						arpResp.style.top = theAnswer.y + 'px';
						
						//matching ip sends a green node to matchingIP.switchName
						appendText(theAnswer.name + " replies:" + "<br />");
						appendText("I do. My MAC is " + theAnswer.mac + "<br />");
						appendText("<hr />");
						setScroll();
						
						moveArp(arpResp.id, theAnswer, theSwitch, function() {
							//matchingIP.switchName sends the green node back to the origin
							moveArp(arpResp.id, theSwitch, sourceNode, function(){
								locked = false;
							});
						});					
					}
					
					//else if no matching ip, return.
					else{
						locked = false;
						return;
					}
					
				}, 4000);				
			});
		}
	}
	else{
		return;
	}
}

function executeStep(){	
	if(goBit){
		if(!locked){
			step[state]();
		}
		else{
			return;
		}
	}
	else{
		alert("You must choose an origin and a destination.");
	}
}

function reset(){
	if(!locked){
		location.reload();
	}
	else{
		return;
	}
}

//sourceNode calculates it's network address
function step1(){
	currentNode = sourceNode;
	currentNode.obj.style.backgroundColor="#ADEBFF";
	
	//move the image to the source node for transforming it;
	packet.style.left = sourceNode.x + "px";
	packet.style.top = sourceNode.y + "px";
	
	appendText(currentNode.name + " calculates " + currentNode.name + "'s network address." + "<br />");
	appendText("IP: " + currentNode.ip + "<br />");
	appendText("Subnet Mask: 255.255.255.0" + "<br />");
	appendText("Net Address: " + currentNode.net + "<br />");
	appendText("<hr />");
	state++;
}

function step2(){
	appendText(currentNode.name + " calculates " + destNode.name + "'s network address." + "<br />");
	appendText("IP: " + destNode.ip + "<br />");
	appendText("Subnet Mask: 255.255.255.0" + "<br />");
	appendText("Net Address: " + destNode.net + "<br />");
	appendText("<hr />");
	state++;
}

function step3(){
	appendText(currentNode.name + " determines if " + destNode.name + " is on the same network." + "<br />");
	appendText(currentNode.name + "'s Net Address: " + currentNode.net + "<br />");
	appendText(destNode.name + "'s Net Address: " + destNode.net + "<br />");
	if(currentNode.net == destNode.net){
		appendText("Same Network!" + "<br />");
		state++;
	}
	else{
		appendText("Different Network!" + "<br />");
		state = 8;
	}
	appendText("<hr />");	
	setScroll();
}

function step4(){
	appendText(currentNode.name + " looks up " + destNode.name + "'s MAC address in it's ARP table." + "<br />");
	appendText("<hr />");
	state++;
	setScroll();
}

function step5(){
	appendText(currentNode.name + " sends data.<br />" + "<br />");
	appendText("<div class='data'>" + destNode.mac + "<div class='data'>" + destNode.ip + "<br />" + message + "</div></div>" + "<br />");
	appendText("<hr />");
	
	currentNode.obj.style.backgroundColor = "white";
    movePacket(currentNode, objects[currentNode.switchName], function() {
        objects[currentNode.switchName].obj.style.backgroundColor = "#ADEBFF";
		locked = false;
    });
	
	state++;
	setScroll();
	
	
}

function step6(){
	
	appendText("switch receives data, sees " + destNode.name + "'s MAC address and forwards the data to " + destNode.name + "<br />");
	
	objects[currentNode.switchName].obj.style.backgroundColor="white";
	movePacket(objects[currentNode.switchName], destNode, function() {
		destNode.obj.style.backgroundColor="#ADEBFF";
		locked = false;
	});	
	
	appendText("<hr />");
	state++;
	setScroll();
}

function step7(){	
	appendText(destNode.name + " receives data and verifies that the MAC and IP are the same as its own. " + destNode.name + " opens the message." + "<br />");
	appendText("Message: " + message + "<br />");
	appendText("DONE!" + "<br />");
	appendText("<hr />");
	setScroll();
	state++;
}

function step8(){
	//Ending Step
	destNode.obj.style.backgroundColor="white";	
	return;
}

function step9(){

	//detect if sender is router(gateway)
	if(currentNode.type == "router"){
		//go to the router specific step	
		state=13;
		step14();
		return;
	}
	
	appendText(currentNode.name + " looks up it's Gateway's IP Address and finds the MAC address in it's ARP table." + "<br />");
	appendText("<hr />");	
	setScroll();
	state++;
}

function step10(){
	//figure out gateway id
	for (var i in objects){
		if(objects[i].ip == currentNode.gateway){
			nextNode = objects[i];
		}
	}
	
	appendText(currentNode.name + " sends data. <br />" + "<br />");
	appendText("<div class='data'>" + nextNode.mac + "<div class='data'>" + destNode.ip + "<br />" + message + "</div></div>" + "<br />");
	appendText("<hr />");
	
	currentNode.obj.style.backgroundColor="white";
	movePacket( currentNode, objects[currentNode.switchName], function() {
        objects[currentNode.switchName].obj.style.backgroundColor="#ADEBFF";
		locked = false;
    });
	
	setScroll();
	state++;
}

function step11(){	
	appendText("switch receives data, sees " + nextNode.name + "'s MAC address and forwards the data to " + nextNode.name + "<br />");
	appendText("<hr />");
	
	objects[sourceNode.switchName].obj.style.backgroundColor="white";	
	movePacket(objects[currentNode.switchName], nextNode, function() {
        nextNode.obj.style.backgroundColor="#ADEBFF";
		locked = false;
    });
	
	state++;
	setScroll();
}

function step12(){
	currentNode = nextNode;	
	//figure out next Node
	for (var i in objects){
		if(objects[i].ip == destNode.gateway){
			nextNode = objects[i];
		}
	}
	
	appendText(currentNode.name + " see's that the MAC address is correct," +
								" but that the IP is for a host on a different" +
								" network and forwards the packet to other networks" +
								" that will get it to " + destNode.name + "." + "<br />");
	appendText("<hr />");
	
	currentNode.obj.style.backgroundColor="white";
	movePacket(currentNode, nextNode, function() {
		nextNode.obj.style.backgroundColor="#ADEBFF";
		locked = false;
    });	
	setScroll();
	state++;
}
function step13(){	
	currentNode = nextNode;
	
	if(currentNode.ip == destNode.ip){
		state = 6;
		step7();		
		return;
	}
	else {
		appendText(nextNode.name + " receives packet and determines that the IP is for a host on its own network." + "<br />");
		appendText("<hr />");	
		setScroll();
		state = 3;
	}
	
}
function step14(){
	//figure out next Node
	for (var i in objects){
		if(objects[i].ip == destNode.gateway){
			nextNode = objects[i];
		}
	}
	
	//currentNode.obj.style.backgroundColor = "#ADEBFF";
	
	appendText(currentNode.name + " see's that the IP is for a host on a different" +
								" network and forwards the packet to other networks" +
								" that will get it to " + destNode.name + "." + "<br />");
	appendText("<hr />");
	
	currentNode.obj.style.backgroundColor="white";
	movePacket(currentNode, nextNode, function() {
        nextNode.obj.style.backgroundColor="#ADEBFF";
		locked = false;
    });
	
	setScroll();
	state = 12;
}


/*Image moving*/

function movePacket(obj1, obj2, callback) {
    var x = obj2.x - obj1.x;
    var y = obj2.y - obj1.y;
	
	locked = true;
	
    $("#packet").animate({
        left: "+=" + x + "px",
        top:  "+=" + y + "px"
    }, 3000, callback);
}

function moveArp(id, obj1, obj2, callback) {
    var x = obj2.x - obj1.x;
    var y = obj2.y - obj1.y;
	
	locked = true;
	
    $("#"+id).animate({
        left: "+=" + x + "px",
        top:  "+=" + y + "px"
    }, 4000, callback);
}

