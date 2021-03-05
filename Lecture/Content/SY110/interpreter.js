function htmltoentity(userinput){
  var formatted=userinput.replace(/(<)|(>)|(&)|(\n)/g,function(thematch){
      if (thematch=="<") return "&lt;"; 
      else if (thematch==">") return "&gt;"; 
      else if (thematch=="\n") return "<br />"; 
      else return "&amp;";}); return formatted; }
function resProc(res) 
{ 
  if (typeof(res) == "number") { return '<span class="red">' + res + '</span>'; }
  if (typeof(res) == "boolean") { return '<span class="red">' + res + '</span>'; }
  if (typeof(res) == "string") return '"<span class="red">' + htmltoentity(res) + '</span>"'; 
  if (typeof(res) == "object" && (res instanceof Array))
  {
    if (res.length == 0) return '[]';
    var tmp = "[" + resProc(res[0]);
    var i = 1; while(i < res.length) { tmp += "," + resProc(res[i]);  ++i;}
    return tmp + "]"; 
  }
  return '<span class="red">' + htmltoentity("" + res) + '</span>';
}
function trim(str) { return str.replace(/^\s\s*/, "").replace(/\s\s*$/, ""); }


function jsProcessPress(thisPtr,theEvent) {
       if (thisPtr.jslog == undefined) 
       { 
         thisPtr.jslog = ""; 
         thisPtr.jshistory = []; 
         thisPtr.jshistIdx = 0; 
       }


       if (theEvent.keyCode == 38) { /* up arrow */
         if (thisPtr.jshistIdx == thisPtr.jshistory.length) { thisPtr.currEdit = thisPtr.value; }
         if (thisPtr.jshistIdx == 0) return false;
         thisPtr.jshistIdx--;
         thisPtr.value = thisPtr.jshistory[thisPtr.jshistIdx];
         return false;
       }

       if (theEvent.keyCode == 40) { /* down arrow */
         thisPtr.jshistIdx++;
         if (thisPtr.jshistIdx >= thisPtr.jshistory.length) { 
           if (thisPtr.currEdit != undefined) { thisPtr.value = thisPtr.currEdit; }
           thisPtr.jshistIdx = thisPtr.jshistory.length;
           return false; 
         }
         thisPtr.value = thisPtr.jshistory[thisPtr.jshistIdx];
         return false;
       }

	if(theEvent.keyCode == 13){ // enter key
          var input = trim(thisPtr.value);        
          thisPtr.jshistIdx = thisPtr.jshistory.push(input);
          thisPtr.currEdit = undefined;
          thisPtr.value = "";
          var res = "";
          try { res = window.eval(input); }
          catch(err) { res = err.toString(); }
          var noResponseFlag = false;
          if (res === undefined && input.search(/^(var|function) /) != -1)
            noResponseFlag = true;;
          thisPtr.jslog += "<b>js&gt;</b> " + htmltoentity(input) + "<br />" + (noResponseFlag ? "" : resProc(res) + "<br />");
          var p; var i = 0; while((p = thisPtr.parentElement.children[i]).id != "jsResults") ++i;
          p.innerHTML = thisPtr.jslog;
          return false; } 
}
