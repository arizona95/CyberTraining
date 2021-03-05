

// Stores the list of rules, assigning each an id
var nextID = 0;
var rules="";

// Static table HTML content
var tableHeader='\
<table style="border-style: solid; border-width: 2pt;">\
<tr align="center"><td>Action</td><td>Source IP</td><td>Protocol</td><td>Port</td><td>Destination\
 IP</td><td>Add/Delete/Move Rule</td>\
</tr>\
';
var tableFooter = '</table>';

// Rule class
var Rule = function(aprev,anext)
{
  this.action="accept";
  this.protocol="tcp";
  this.port="x";
  this.src="x.x.x.x";
  this.dest="10.10.10.x";
  this.limit="no";
  this.id=nextID; nextID = String(Number(nextID)+1);
  this.prev = aprev;
  this.next = anext;
  this.add = function()
  {
    var p = this.prev;
    this.prev = new Rule(this.prev,this);
    if (p == null) rules = this.prev; else p.next = this.prev;
  }
  this.rem = function()
  {
    if (this.prev != null)
      this.prev.next = this.next;
    else
      rules = this.next;
    if (this.next != null) { this.next.prev = this.prev; }
  }
  this.up = function()
  {
    if (this.prev == null) return;
    var p = this.prev, n = this.next;
    this.prev = p.prev;
    this.next = p;
    if (this.prev != null) { this.prev.next = this; } else { rules = this; }
    p.prev = this;
    p.next = n;
    if (n != null) { n.prev = p; }
  }
  this.down = function()
  {
    if (this.next != null) { this.next.up(); }
  }    
  
  this.testIP = function(A,B)//B is a 'real' IP.
  {
    var a = A.split(".");
    var b = B.split(".");
    if (a.length != b.length) { return false; }
    var i = 0;
    while(i < 4)
    {
      if (!(a[i].match(/^\s*x\s*$/) || RegExp("^\\s*" + b[i] + "\\s*$").test(a[i])))
	return false;
      i++;
    }
    return true;
  }
  
  this.test = function(srcIP,destIP,port,proto)
  {
    if (!(this.protocol == "both" || this.protocol == proto)) return false;
    if (!(this.port.match(/^\s*x\s*$/) || RegExp("^\\s*" + port + "\\s*$").test(this.port)))
      return false;
    if (!this.testIP(this.dest,destIP)) return false;
    if (!this.testIP(this.src,srcIP)) return false;
    return true;
  }
  
  this.html = function()
  {
    var s = '\
    <tr align="center" id="rule'+this.id+'">\
      <td><select name="action'+this.id+'" value="'+this.action+'"\
		 onchange="find('+this.id+',rules).action=document.forms.acl.action'+this.id+'.value;"\
		 '+(this.id == -1 ? ' disabled="disabled"' : '')+'>\
          <option value="accept" '+("accept" == this.action ? 'selected="selected"' : '')+'>forward</option>\
          <option value="drop" '+("drop" == this.action ? 'selected="selected"' : '')+'>drop</option>\
      </select></td>\
      <td><input type="text" size="18" name="src'+this.id+'"  value="'+this.src+'"\
		 onchange="find('+this.id+',rules).src=document.forms.acl.src'+this.id+'.value;"\
		 '+(this.id == 0 ? ' disabled="disabled"' : '')+'></td>\
      <td><select name="protocol'+this.id+'" value="'+this.protocol+'"\
		 onchange="find('+this.id+',rules).protocol=document.forms.acl.protocol'+this.id+'.value;"\
		 '+(this.id == 0 ? ' disabled="disabled"' : '')+'>\
          <option value="tcp" '+("tcp" == this.protocol ? 'selected="selected"' : '')+'>tcp</option>\
          <option value="udp" '+("udp" == this.protocol ? 'selected="selected"' : '')+'>udp</option>\
          <option value="both" '+("both" == this.protocol ? 'selected="selected"' : '')+'>both</option>\
      </select></td>\
      <td><input type="text" size="5" name="port'+this.id+'" value="'+this.port+'"\
		 onchange="find('+this.id+',rules).port=document.forms.acl.port'+this.id+'.value;"\
		 '+(this.id == 0 ? ' disabled="disabled"' : '')+'></td>\
      <td><input type="text" size="18" name="dest'+this.id+'"  value="'+this.dest+'"\
		 onchange="find('+this.id+',rules).dest=document.forms.acl.dest'+this.id+'.value;"\
		 '+(this.id == 0 ? ' disabled="disabled"' : '')+'></td>\
      <td>\
	<input type="button" value="+" onclick="find('+this.id+',rules).add(); redrawTable();">\
	<input type="button" value="&ndash;"\
	       onclick="find('+this.id+',rules).rem(); redrawTable();"\
		 '+(this.id == 0 ? ' disabled="disabled"' : '')+'>\
	<input type="button" value="&#x21E7;" onclick="find('+this.id+',rules).up(); redrawTable();"\
		 '+(this.id == 0 || this.prev == null? ' disabled="disabled"' : '')+'>\
	<input type="button" value="&#x21E9;" onclick="find('+this.id+',rules).down(); redrawTable();"\
		 '+(this.id == 0 || this.next.id == 0 ? ' disabled="disabled"' : '')+'>\
      </td>\
    </tr>\
    ';
    return s;
  }
}
  
function initRules()
{
  rules = new Rule(null,null);
  rules.protocol = "both"; 
  rules.dest = "10.10.10.x";
  rules.action = "accept";
}

function find(id,L) { if (L == null) return null; return L.id == id ? L : find(id,L.next); }


function redrawTable()
{
  var str = tableHeader;
  var ptr = rules;
  while(ptr != null) { str += ptr.html(); ptr = ptr.next; }
  document.getElementById('tabdiv').innerHTML = str + tableFooter;
}
    
function getAction(srcIP,destIP,port,proto)
{
  var tmp=rules;
  while(!tmp.test(srcIP,destIP,port,proto))
    tmp=tmp.next;
  return tmp.action;
}

function getRule(srcIP,destIP,port,proto)
{
  var tmp=rules;
  while(!tmp.test(srcIP,destIP,port,proto))
    tmp=tmp.next;
  return tmp;
}

function highlightrow(i) { document.getElementById("rule"+i).style.backgroundColor="yellow"; }
function unhighlightrow(i) { document.getElementById("rule"+i).style.backgroundColor=null; }

function testBatch(desiredAction,srcs,dests,ports,protos) // returns the first mistake
{
  for(var i = 0; i < srcs.length; i++) {
    for(var j = 0; j < dests.length; j++) {
      for(var k = 0; k < ports.length; k++) {
	for(var l = 0; l < protos.length; l++) {
	  if (getAction(srcs[i],dests[j],ports[k],protos[l]) != desiredAction)
	    return [srcs[i],dests[j],ports[k],protos[l]]; }}}}
  return null;
}


var badIPs = ["7.7.7.7","8.8.8.8"];
var goodIPs = ["34.64.71.155","34.64.71.101","34.67.32.165",
	       "117.34.85.164","89.82.67.23",
	       "7.7.7.67","7.7.7.17","8.8.8.167","8.8.8.117"
	       ];
var allIPs = ["7.7.7.7","8.8.8.8", "34.64.71.155","34.64.71.101","34.67.32.165",
	       "117.34.85.164","89.82.67.23",
	       "7.7.7.67","7.7.7.17","8.8.8.167","8.8.8.117"
	       ];
var otherInternal = [ "10.10.10.12","10.10.10.27","10.10.10.54","10.10.10.99","10.10.10.102","10.10.10.118"];
var allports = [ "445","22","53","67","68","80","443" ];
var allBut80 = [ "22","53","67","68","443","445" ];
var allBut53 = [ "22","80","67","68","443","445" ];


function testRuleSet()
{
  var all = "";
  var msg;
  var r;

  // http server
  msg = "";
  r = testBatch("drop",badIPs,["10.10.10.8"],["80"],["tcp"]);
  if (r != null)
    msg += "Error! " + r[0] + " is allowed to access the webserver!";
  r = testBatch("accept",goodIPs,["10.10.10.8"],["80"],["tcp"]);
  if (r != null)
    msg += "Error! External hosts like " + r[0] + " are not allowed to access the webserver!";
  if (msg == "")
  { 
    r = testBatch("drop",badIPs,["10.10.10.32"],allports,["tcp","udp"]);
    if (r != null)
      msg += "Error! " + r[0] + " is allowed to access the webserver on " + r[3] + " port " + r[2] + "!";
    if (msg == "")
    {
      r = testBatch("drop",goodIPs,["10.10.10.32"],allBut80,["tcp","udp"]);
      if (r != null)
	msg += "Error! External hosts like " + r[0] + " are allowed to access the webserver on " + r[3] + " port " + r[2] + "!";
    }
  }
  if (msg == "")
    msg = "<span style='color: #006200;'>Correct access to webserver confirmed!</span>";
  all += "<br>" + msg;

  // DNS server
  msg = "";
  r = testBatch("drop",badIPs,["10.10.10.16"],["53"],["udp"]);
  if (r != null)
    msg += "Error! " + r[0] + " is allowed to access the DNS nameserver!";
  r = testBatch("accept",goodIPs,["10.10.10.16"],["53"],["udp"]);
  if (r != null)
    msg += "Error! External hosts like " + r[0] + " are not allowed to access the DNS nameserver!";
  if (msg == "")
    msg = "<span style='color: #006200;'>Correct access to DNS nameserver confirmed!</span>";
  all += "<br>" + msg;

  // file server
  msg = "";
  r = testBatch("drop",badIPs,["10.10.10.32"],allports,["tcp","udp"]);
  if (r != null)
    msg += "Error! External host " + r[0] + " is allowed to access the fileserver on port " + r[2] + "!";
  if (msg == "")
  {
    r = testBatch("drop",goodIPs,["10.10.10.32"],allports,["tcp","udp"]);
    if (r != null)
      msg += "Error! External hosts like " + r[0] + " are allowed to access the fileserver on port " + r[2] + "!";
  }
  if (msg == "")
    msg = "<span style='color: #006200;'>Correct access to fileserver confirmed!</span>";
  all += "<br>" + msg;

  // other internal hosts
  msg = "";
  r = testBatch("drop",allIPs,otherInternal,allports,["tcp","udp"]);
  if (r != null)
    msg += "Error! External host " + r[0] + " is allowed to access to internal hosts like " + r[1] + " on ports like " + r[2] + "!";
  all += "<br>" + msg;

  document.getElementById("aclout").innerHTML = all;
}

initRules();
