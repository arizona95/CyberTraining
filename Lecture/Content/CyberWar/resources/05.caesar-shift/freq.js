
var countFreq = function()
{
  // Get the ciphertext to analyze
  var s = document.forms.caesar3.ciphertext.value.toLowerCase();
  
  // If the plaintext has changed, update ciphertext
  if (changesource == 1)
  {
    var shift = document.forms.caesar2.shift.value;
    var sPlain = document.forms.caesar1.plaintext.value.toLowerCase();
    var sNew = "";
    for(var j = 0; j < sPlain.length; ++j)
    {
      var nextc = sPlain.charCodeAt(j) - 97;
      if (0 <= nextc && nextc < 26 ) 
	sNew += String.fromCharCode((Number(nextc) + Number(shift))%26 + 97);
      else
	sNew += String.fromCharCode(nextc + 97);
    }
    s = sNew;
    document.forms.caesar3.ciphertext.value = s;
  }

  // Count frequencies & update in document
  var N = s.length;
  if (N == 0) return false;
  var A = new Array();
  var i;
  for(i = 0; i < 26; i++) A[i] = 0;
  var k = 0;
  for(k = 0; k < N; k++)
  {
    var c = s.charCodeAt(k) - 97;
    if (0 <= c && c < 26 ) 
      A[c]++;
  }
  for(i = 0; i < 26; i++)
  {
    var tag = 'char' + String.fromCharCode(i + 97);
    document.getElementById(tag).innerHTML = (100*A[i]/N).toFixed(3);
  }

  // compute liklihoods
  var L = new Array();
  for(i = 0; i < 26; i++)
  {
    var p = 0;
    for(k = 0; k < N; k++)
    {
      var c = s.charCodeAt(k) - 97;
      if (0 <= c && c < 26 ) 
      {
	var shiftedC = String.fromCharCode(97 + (c + i)%26);
	p += Math.log(document.getElementById('freq' + shiftedC).innerHTML/100);
      }
    }
    L[i] = p;
  }
  
  // sum of liklihoods (for normalization)
  var total = 0; for(i = 0; i < 26; i++) total += Math.exp(L[i]);
  
  // find most likely
  var im = 0, inext = 26; L[26] = -99999999999.0;
  for(i = 1; i < 26; i++)
    if (L[im] < L[i]) { inext = im; im = i;  }
    else if (L[inext] < L[i]) { inext = i; }
  
  // update liklihoods
  document.getElementById('likely').innerHTML = (26 - im)%26;
  document.getElementById('likelyprob').innerHTML = Math.exp(L[im])/total;
  document.getElementById('vsnextbest').innerHTML = Math.exp(L[im]-L[inext]);

  // If ciphertext was the last to change (not counting shift changes) update plaintext
  if (changesource == 3)
  {
    var sCipher = s;
    var plainNew = "";
    for(var j = 0; j < sCipher.length; ++j)
    {
      var nextc = sCipher.charCodeAt(j) - 97;
      if (0 <= nextc && nextc < 26 ) 
	plainNew += String.fromCharCode((Number(nextc) + Number(im))%26 + 97);
      else
	plainNew += String.fromCharCode(nextc + 97);
    }
    document.forms.caesar1.plaintext.value = plainNew;
    document.forms.caesar2.shift.value = (26 - im)%26;
  }
}
