import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.io.*;
import java.util.*;

/*
  This program does symmetric encryption with 128-bit AES.
  See usage statement for details.
  Note: <ctrl>-z followed by <enter> gives EOF in the Windows
  shell.
 */

public class aes {

  public static String asHex (byte buff[]) 
  {
    StringBuffer strbuff = new StringBuffer(buff.length * 2);
    for (int i = 0; i < buff.length; i++) 
    {
      if (((int) buff[i] & 0xff) < 0x10)
	strbuff.append("0");
      strbuff.append(Long.toString((int) buff[i] & 0xff, 16));
    }
    return strbuff.toString();
  }

  public static int hexDigitToInt(char x) throws Exception
  {
    int i = -1;
    if ('0' <= x && x <= '9') i = x - '0';
    else if ('A' <= x && x <= 'F') i = 10 + x - 'A';
    else if ('a' <= x && x <= 'f') i = 10 + x - 'a';
    else throw new Exception("Invalid Hex Character '" + x + "'.");
    return i;
  }

  public static byte[] hexStringToByteBuff(String s) throws Exception
  {
    if (s.length() % 2 != 0) throw new Exception("Number of hex digits must be even!");
    int n = s.length()/2;
    byte[] buff = new byte[n];
    for(int i = 0; i < n; ++i)
      buff[i] = (byte)(hexDigitToInt(s.charAt(2*i))*16 + hexDigitToInt(s.charAt(2*i + 1)));
    return buff;
  }

  public static void main(String[] args) throws Exception 
  {
    byte[] output = null;

    //-- Process commandline arguments
    boolean help = false, genkey = false, encrypt = false, decrypt = false;
    String input = "", inFileName = null, outFileName = null, key = null;
    int state = 0, index = 0;
    for(index = 0; index < args.length; ++index)
    {
      switch(state)
      {
      case 0:
	if (args[index].equals("-k")) { genkey = true; }
	else if (args[index].equals("-h")) { help = true; }
        else if (args[index].equals("-e")) { encrypt = true; state = 1; }
        else if (args[index].equals("-d")) { decrypt = true; state = 1; }
        else if (args[index].equals("-i")) { state = 2; }
        else if (args[index].equals("-o")) { state = 3; }
	else input += args[index];
        break;
      case 1:
	key = args[index]; state = 0;
	break;
      case 2:
	inFileName = args[index]; state = 0;
	break;
      case 3:
	outFileName = args[index]; state = 0;
      }
    }
    if (state == 1)
      throw new Exception("Argument error: key value missing after '-e/d'!");
    if (state == 2)
      throw new Exception("Argument error: file name missing after '-i'!");
    if (state == 3)
      throw new Exception("Argument error: file name missing after '-o'!");
    if (encrypt && decrypt)
      throw new Exception("Argument error: The -e and -d options are mutually exclusive!");

    //-- Show help
    if (args.length == 0 || help)
    {
      System.out.println(
      "aes: a command-line aes encryption tool.\n" +
      "usage: aes -k | (-e|-d) <key> [text | -i file] [-o file] | -h\n" +
      "-h        : This help info.\n" +
      "-k        : Generate a key.\n" +
      "-e <key>  : Encrypt.\n" +
      "-d <key>  : Decrypt.\n" +
      "<text>    : Provide text to encrypt or decrypt on command-line.\n" +
      "-i <file> : Name of file to use as encrypt/decrypt input.\n" +
      "-o <file> : Name of file to use as encrypt/decrypt ouput.\n"
			 );
      return;
    }

    //-- no valid operation requested
    if (!genkey && !encrypt && !decrypt && !help)
    {
       throw new Exception("Argument error: must use one of the options: -k, -e, -d!");
    }


    //-- key generation case
    if (genkey)
    {
      KeyGenerator kgen = KeyGenerator.getInstance("AES");
      kgen.init(128);
      SecretKey skey = kgen.generateKey();
      byte[] raw = skey.getEncoded();
      output = raw;
      //      output = asHex(raw);
    }
    else
    {
      //-- Get key from argument
      String keyAsString = args[1];
      byte[] raw = hexStringToByteBuff(keyAsString);
      if (raw.length != 16) throw new Exception("Invalid key: must be 32 hex digits!");
      SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
      
      //-- Get input text
      byte[] text;
      if (input != "")
      {
	text = input.getBytes();
      }
      else
      {
	InputStream in = System.in;
	if (inFileName != null)
	{
	  in = new FileInputStream(inFileName);	  
	}
	ArrayList<Byte> L = new ArrayList<Byte>();
	int next;
	while((next = in.read()) != -1)
	  L.add((byte)next);
	text = new byte[L.size()];
	for(int i = 0; i < L.size(); ++i)
	  text[i] = L.get(i);
      }

      //-- Encrypt
      if (encrypt)
      {
	Cipher cipher = Cipher.getInstance("AES");
	cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
	byte[] encrypted = cipher.doFinal(text);
	output = encrypted;
	//output = asHex(encrypted);
      }
      
      //-- Decrypt
      if (decrypt)
      {
	Cipher cipher = Cipher.getInstance("AES");
	cipher.init(Cipher.DECRYPT_MODE, skeySpec);
	String stext = (new String(text)).trim();
	byte[] original = cipher.doFinal(hexStringToByteBuff(stext));
	output = original;
	//	output = new String(original);
      }
    }
    
    // Write results
    if (outFileName == null)
    {
      System.out.print((encrypt || genkey) ? (asHex(output) + "\n") : new String(output));
    }
    else
    {
      if (encrypt || genkey)
      {
	PrintWriter out = new PrintWriter(new FileWriter(outFileName));
	out.print(asHex(output) + "\n");
	out.flush();
	out.close();
      }
      else
      {
	// It seems that wrapping the FileOutputStream in a BufferedOutputStream is
        // needed on Windows to give a "binary mode", i.e. stop the conversion of certain
        // byte values to others in the output.
	BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(outFileName));
	out.write(output);
	out.flush();
	out.close();
      }
    }
  }
}
