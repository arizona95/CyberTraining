/*
	vCipherDemo.js
	A.K.Herber '12
	20Jun2012
*/

//Global Vars
var key = "";
var plain = "";
var cipher = "";
var animationOption = 0;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var state = 0;
var totCount = 0;

function lockBox(){
	
}

function masterClear(){
	miniClear();	
	document.getElementById("key").value = "";
	document.getElementById("plain").value = "";
	document.getElementById("cipher").value = "";
}

function miniClear(){
	animationOption = 0;
	state = 0;
	totCount = 0;
	
	document.getElementById("demoTable").innerHTML = 
		"<tr id='keyLetter'><td align='right'>key:</td></tr>" +
		"<tr id='plainLetter'><td align='right'>message:</td></tr>" +
		"<tr id='cipherLetter'><td align='right'>encrypted:</td></tr>";
	
	for(var i=0; i<26; i++){
		highlightRow(i+1,"white");
		highlightCol(i+1,"white");
	}
	
	//disable the step button
	document.getElementById("step").disabled = true;
	//Make the demo table invisible
	document.getElementById("demoTable").style.visibility = "hidden";
}


// Makes entire String uppercase and Removes non-letter
// items from string if there is something there
function fixString(inputStr){
	if (inputStr == null)
		return "";			
	else {				
		inputStr = inputStr.toUpperCase();				
		//regex out the non-letters
		inputStr = inputStr.replace(/[^a-z]/gi, "");				
		return inputStr;
	}
}

//Initiates the simulation. Enciphers, Deciphers or Key-Solves
//then sets up the system for the animation stepping.
function doSim(){
	miniClear();

	//Get the keys from the page and sanitize the inputs
	//(uppercase, letter characters only)
	key = fixString(document.getElementById("key").value);
	plain = fixString(document.getElementById("plain").value);
	cipher = fixString(document.getElementById("cipher").value);
	
	//Check for inputs
	if(cipher == "" && plain == ""){
		alert("2 Fields must be populated.");
		return;
	}
	
	else {
		// Figure out what we have and process appropriately
		// If we have the key, solve forwards or backwards
		
		var output="";
		
		if(key != ""){
			var input;		
			
			if(cipher == ""){	
				input = plain;
				var forward = true;
			}
			else {
				input = cipher;
				var forward = false;
			}
			
			var key_index = 0;
			
			//The loop
			for (i = 0; i < input.length; i++){
				
				//Grab the letter at I
				var charIn = input.charAt(i);
				
				//Get the numerical value of the letter to prevent ascii math in our code
				var charIn_Val = alphabet.indexOf(charIn);
				
				//Add/Subtract the value of the key's postion to the value of the Input text position
				if (forward)				
					charIn_Val += alphabet.indexOf(key.charAt(key_index));
				else
					charIn_Val -= alphabet.indexOf(key.charAt(key_index));
				
				//Mod the value by 26 to maintain the character within the alphabet
				//Complex method to account for the modulus of a negative number
				charIn_Val = ((charIn_Val%26)+26)%26;
				
				//Turn the value back into a letter
				output += alphabet.charAt(charIn_Val);			
				
				//Increment the key Index to continue looping
				key_index = (key_index + 1) % key.length;
			}

			if(forward){				
				cipher = output;
				animationOption = 1;
			}
			
			else{
				plain = output;
				animationOption = 2;
			}

		}
		
		// If we dont have the key, solve for it.
		else {			
			//The loop
			for (i = 0; i < plain.length; i++){
			
				//Grab the letter at I
				var plainCharVal = alphabet.indexOf(plain.charAt(i));
				var cipherCharVal = alphabet.indexOf(cipher.charAt(i));
				
				//Calculate the distance between them 
				//(this is the numerical location of the key character)
				charVal = cipherCharVal - plainCharVal;
				
				//Mod the value by 26 to maintain the character within the alphabet
				//Complex method to account for the modulus of a negative number
				charVal = ((charVal%26)+26)%26;
				
				//Turn the value back into a letter
				output += alphabet.charAt(charVal);
			}
			
			key = output;				
			animationOption = 3;
		}
		
		//Update the text fields with the new information
		document.getElementById("key").value = key;
		document.getElementById("plain").value = plain;
		document.getElementById("cipher").value = cipher;		
		
	}

	//************Animation Set-up*************
	
	//disable the start button
	//document.getElementById("start").disabled = true;
	
	//enable the step button
	document.getElementById("step").disabled = false;
	
	//Fill in the demo table boxes with appropriate information to highlight
	if(animationOption == 1){
		for(var i=0; i < key.length; i++){
			document.getElementById("keyLetter").innerHTML += "<td>"+key[i]+"</td>";
		}
		for(var i=0; i < plain.length; i++){
			document.getElementById("plainLetter").innerHTML += "<td>"+plain[i]+"</td>";
		}
	}
	else if(animationOption == 2){
		for(var i=0; i < key.length; i++){
			document.getElementById("keyLetter").innerHTML += "<td>"+key[i]+"</td>";
		}
		for(var i=0; i < cipher.length; i++){
			document.getElementById("cipherLetter").innerHTML += "<td>"+cipher[i]+"</td>";
		}		
	}
	else if(animationOption == 3){
		for(var i=0; i < plain.length; i++){
			document.getElementById("plainLetter").innerHTML += "<td>"+plain[i]+"</td>";
		}
		for(var i=0; i < cipher.length; i++){
			document.getElementById("cipherLetter").innerHTML += "<td>"+cipher[i]+"</td>";
		}		
	}
	else{
		masterClear();
		return;
	}
	
	//Make the demo table visible
	document.getElementById("demoTable").style.visibility = "visible";
	
	/*
	//Here we fix the key length for the animation script
	//The key has to be as long as either the cipher or the plain text.
	//If it isnt you get an undefined error when the text is longer than the key.
	//Nothing has to happen for key-solving because the
	//cipher text and plaintext are always equal length
	if(animationOption != 3){
		var modKey = "";
		for(var i=0; i<plain.length; i++){
			modKey += key[i%key.length];
		}
		key = modKey;
	}
	*/
}

//***************************Table Management**************************
//Functions for managing the table of alphabets
function highlight(row,col,color){
	var table = document.getElementById("vctable");
	var trow = table.rows[row];
	var entry = trow.childNodes[col].style.backgroundColor = color;
}
function highlightRow(row, color){
	for(var i=0; i<=26; i++){
		highlight(row,i+1,color);
	}
}
function highlightCol(col,color){
	for(var i = 0; i <= 26; i++){
		highlight(i,col+(i==0?0:1),color);
	}
}

//***************************Letter Management**************************
//Functions for managing the letters that are animated near the entry boxes
function highlightLetter(num,color,id){
	document.getElementById(id).childNodes[num+1].style.backgroundColor = color;
}
function setPlainLetter(num){
	document.getElementById("plainLetter").innerHTML += "<td>"+plain[num]+"</td>";
}
function setKeyLetter(num){
	document.getElementById("keyLetter").innerHTML += "<td>"+key[num]+"</td>";
}
function setCipherLetter(num){
	document.getElementById("cipherLetter").innerHTML += "<td>"+cipher[num]+"</td>";
}

//*********************************Enciphering******************************
function step11(i){
	highlightLetter(i,"lightGray","plainLetter"); 
}
function step12(i){
	var k = alphabet.indexOf(plain[i]);
	highlightRow(k+1,"lightGray");
}
function step13(i){
	highlightLetter(i%key.length,"yellow","keyLetter");
}
function step14(i){
	var k = alphabet.indexOf(key[i%key.length]);
	highlightCol(k+1,"yellow");
}
function step15(i){
	highlight(alphabet.indexOf(plain[i])+1,alphabet.indexOf(key[i%key.length])+2,"red");	
}
function step16(i){
	setCipherLetter(i);
	highlightLetter(i,"red","cipherLetter");
}

//*********************************Deciphering******************************

function step21(i){
	highlightLetter(i%key.length,"yellow","keyLetter");
}
function step22(i){
	var k = alphabet.indexOf(key[i%key.length]);
	highlightCol(k+1,"yellow");
}
function step23(i){
	highlightLetter(i,"red","cipherLetter");
}
function step24(i){
	highlight(alphabet.indexOf(plain[i])+1,alphabet.indexOf(key[i%key.length])+2,"red");	
}
function step25(i){
	var k = alphabet.indexOf(plain[i]);
	highlightRow(k+1,"lightGray");
	highlight(alphabet.indexOf(plain[i])+1,alphabet.indexOf(key[i%key.length])+2,"red");
}
function step26(i){
	setPlainLetter(i);
	highlightLetter(i,"lightGray","plainLetter"); 
}

//*********************************Key-Solving******************************

function step31(i){
	highlightLetter(i,"lightGray","plainLetter"); 
}
function step32(i){
	var k = alphabet.indexOf(plain[i]);
	highlightRow(k+1,"lightGray");
}

function step33(i){
	highlightLetter(i,"red","cipherLetter");
}
function step34(i){
	highlight(alphabet.indexOf(plain[i])+1,alphabet.indexOf(key[i%key.length])+2,"red");	
}

function step35(i){
	var k = alphabet.indexOf(key[i]);
	highlightCol(k+1,"yellow");
	highlight(alphabet.indexOf(plain[i])+1,alphabet.indexOf(key[i%key.length])+2,"red");
}
function step36(i){
	setKeyLetter(i);
	highlightLetter(i,"yellow","keyLetter"); 
}


//*****************************Clear*********************************
function clear(i){
	highlightLetter(i,"white","plainLetter");	
	var k = alphabet.indexOf(plain[i]);
	highlightRow(k+1,"white");	
	highlightLetter(i%key.length,"white","keyLetter");
	var k = alphabet.indexOf(key[i%key.length]);
	highlightCol(k+1,"white");	
	highlightLetter(i,"white","cipherLetter");	
	totCount++;
}

//Steps for en-ciphering
var step1 = [step11, step12, step13, step14, step15, step16, clear];
//Steps for de-ciphering
var step2 = [step21, step22, step23, step24, step25, step26, clear];
//Steps for key-solving
var step3 = [step31, step32, step33, step34, step35, step36, clear];

function executeStep(){
	if(animationOption == 1 && totCount<plain.length){
		var i = (state - state%7)/7;
		var j = state % 7;
		step1[j](i);
		state++;
	}
	else if(animationOption == 2 && totCount<cipher.length){	
		var i = (state - state%7)/7;
		var j = state % 7;
		step2[j](i);
		state++;
	}
	else if(animationOption == 3 && totCount<plain.length){
		var i = (state - state%7)/7;
		var j = state % 7;
		step3[j](i);
		state++;
	}
	else{
		return;
	}	
}