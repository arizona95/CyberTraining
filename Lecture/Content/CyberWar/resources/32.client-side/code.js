    function textToCode(t, k)
    {
      var res = "";
      for(i = 0; i < t.length; ++i)
      {
	var x = ((t.charCodeAt(i) + k)%128).toString(16); 
	if (x.length < 2) x = "0" + x;
        res = res + x;
      }
      return res;
    }

    function codeToHTML(c, k)
    {
      var res = "";
      for(i = 0; i+1 < c.length; i = i + 2)
      {
         res = res + ('&#' + (k + (16*parseInt(c[i],16) + parseInt(c[i+1],16)))%128 + ';');
      }
      return res;
    }

