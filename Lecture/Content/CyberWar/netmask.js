function dec2binIP (form) {
    fullOctetRE = /([01]{8})/;
    var addr = form.ipaddr.value;
    addr = addr.replace(/[.]/g,' ');
    var addr_octets = addr.match(/\b\d{1,}\b/g);

    if ( addr_octets.length > 4 ) {
	form.elements[0].style.color = "red";
    }
    else {
	form.elements[0].removeAttribute("style");

	for ( i=0;i<addr_octets.length;i=i+1 ) {
	    if ( addr_octets[i] > 255 ) {
		form.elements[0].style.color = "red";
		addr_octets.splice(i,4-i);
		break;
	    }
	    else {
		form.elements[0].removeAttribute("style");
	    }

	    addr_octets[i] = parseInt(addr_octets[i]).toString(2);
	    while ( !fullOctetRE.test(addr_octets[i]) ) {
		addr_octets[i] = '0' + addr_octets[i];
	    }
	}

	document.getElementById("ipbits").innerHTML = addr_octets.toString().replace(/[,]/g,' ');

	iscomplete(form);
    }

    return false;
}

function dec2binMASK(form) {
    fullOctetRE = /([01]{8})/;
    validmaskRE = /(255|254|252|248|240|224|192|128|^0{1,3})/;
    var mask = form.netmask.value;
    mask = mask.replace(/[.]/g,' ');
    var mask_octets = mask.match(/\b\d{1,}\b/g);
    var lastoctet = 255;

    if ( mask_octets.length > 4 ) {
	form.elements[1].style.color = "red";
    }
    else {
	form.elements[1].removeAttribute("style");

	for ( i=0;i<mask_octets.length;i=i+1 ) {
	    if ( !validmaskRE.test(mask_octets[i]) || mask_octets[i] > 255 ) {
		form.elements[1].style.color = "red";
		mask_octets.splice(i,4-i);
		break;
	    }
	    else if ( lastoctet != 255 && mask_octets[i] != 0 ) {
		form.elements[1].style.color = "red";
		mask_octets.splice(i,4-i);
		break;
	    }
	    else {
		form.elements[1].removeAttribute("style");
	    }

	    lastoctet = mask_octets[i];

	    mask_octets[i] = parseInt(mask_octets[i]).toString(2);
	    while ( !fullOctetRE.test(mask_octets[i]) ) {
		mask_octets[i] = '0' + mask_octets[i];

	    }
		
	}


	document.getElementById("maskbits").innerHTML = mask_octets.toString().replace(/[,]/g,' ');
	
	iscomplete(form);
    }

    return false;
}

function cidrout(form) {
	var cidrend = 32;
var mask2 = form.netmask.value;
    mask2 = mask2.replace(/[.]/g,' ');
    var mask_octets2 = mask2.match(/\b\d{1,}\b/g);
var j = 0;	
if (mask_octets2[j] == '254') {cidrend = 7;}
if (mask_octets2[j] == '252') {cidrend = 6;}
if (mask_octets2[j] == '248') {cidrend = 5;}
if (mask_octets2[j] == '240') {cidrend = 4;}
if (mask_octets2[j] == '224') {cidrend = 3;}
if (mask_octets2[j] == '192') {cidrend = 2;}
if (mask_octets2[j] == '128') {cidrend = 1;}
if (mask_octets2[j] == '0') {cidrend = 0;}
j=1;
if (mask_octets2[j] == '254') {cidrend = 15;}
if (mask_octets2[j] == '252') {cidrend = 14;}
if (mask_octets2[j] == '248') {cidrend = 13;}
if (mask_octets2[j] == '240') {cidrend = 12;}
if (mask_octets2[j] == '224') {cidrend = 11;}
if (mask_octets2[j] == '192') {cidrend = 10;}
if (mask_octets2[j] == '128') {cidrend = 9;}
if ( mask_octets2[i] == '0' && mask_octets2[0] == '255') {cidrend = 8;}
j=2;
if (mask_octets2[j] == '254') {cidrend = 23;}
if (mask_octets2[j] == '252') {cidrend = 22;}
if (mask_octets2[j] == '248') {cidrend = 21;}
if (mask_octets2[j] == '240') {cidrend = 20;}
if (mask_octets2[j] == '224') {cidrend = 19;}
if (mask_octets2[j] == '192') {cidrend = 18;}
if (mask_octets2[j] == '128') {cidrend = 17;}
if (mask_octets2[j] == '0' && mask_octets2[1] == '255') {cidrend = 16;}
j=3;
if (mask_octets2[j] == '254') {cidrend = 31;}
if (mask_octets2[j] == '252')  {cidrend = 30;}
if (mask_octets2[j] ==  '248') {cidrend = 29;}
if (mask_octets2[j] == '240') {cidrend = 28;}
if (mask_octets2[j] ==  '224') {cidrend = 27;}
if (mask_octets2[j] ==  '192') {cidrend = 26;}
if (mask_octets2[j] ==  '128') {cidrend = 25;}
if (mask_octets2[j] == '0' && mask_octets2[2] == '255') {cidrend = 24;}



	form.mycidr.value = form.netaddr.value+"/"+cidrend

	return false;
}	


function iscomplete(form) {
    var ipbits = document.getElementById("ipbits").innerHTML.replace(/<.*?>/g,'');
    var maskbits = document.getElementById("maskbits").innerHTML;
    var net_octets = new Array(4);

    var fullOctetRE = /([01]{8})/;
    var dottedquadRE = /\b[01]{8}[ ][01]{8}[ ][01]{8}[ ][01]{8}$/;

    if ( dottedquadRE.test(ipbits) && dottedquadRE.test(maskbits) &&
	    !form.elements[0].getAttribute("style") && 
	    !form.elements[1].getAttribute("style") ) {
	var addr_octets = ipbits.split(' ');
	var mask_octets = maskbits.split(' ');

	for ( i=0;i<4;i=i+1 ) {
	    net_octets[i] = (parseInt(mask_octets[i],2) & parseInt(addr_octets[i],2)).toString(2);
	    while ( !fullOctetRE.test(net_octets[i]) ) {
		net_octets[i] = '0' + net_octets[i];
	    }
	}

	var coloredbits = '<span style="background:yellow;">';
	var cidr = maskbits.replace(/[ ]/g,'').match(/[^0]/g);
	var len = cidr.length + cidr.length / 8 - 1;

	var rawbits = net_octets.toString().replace(/[,]/g,' ');
	for ( k=0;k<len;k=k+1 )
	    coloredbits = coloredbits + rawbits[k];
	coloredbits = coloredbits + '</span>';
	for ( ;k<rawbits.length;k=k+1 )
	    coloredbits = coloredbits + rawbits[k];

	document.getElementById("netbits").innerHTML = coloredbits;

	netip = new Array(4);
	for ( j=0;j<4;j=j+1 ) {
	    netip[j] = parseInt(net_octets[j],2);
	}
	form.netaddr.value = netip.toString().replace(/[,]/g,'.');
	cidrout(form);
	return true;
    }
    else {
	form.netaddr.value = "";
	form.mycidr.value ="";
	document.getElementById("netbits").innerHTML = "";
    }

    return false;
}

function updateAll (form) {
    dec2binIP(form);
    dec2binMASK(form);
	cidrout(form);
    return false;
}