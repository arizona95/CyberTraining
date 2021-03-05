/**
 * udps.java
 * 
 * The minimal udp server.
 * 
 * usage:  udps -p <port> 
 * Note: <port> must be an integer in the range [1024,65536).
 * Author: Ryan Rabe (minor edits by Chris Brown)
 */

import java.net.*;
import java.lang.Integer;

public class udps
{  
  public static void main(String args[]) throws Exception { 
    
    // Process command line
    int portReceive = -1, state = 0;
    for(int i = 0; i < args.length; ++i)
      if (state == 1)
      {
	portReceive = Integer.parseInt(args[i]);
	state = 0;
      }
      else if (args[i].equals("-p"))
	state = 1;
    
    // Print usage & exit if invalid call
    if (1024 > portReceive || portReceive  > 65536)
    {
      System.err.println("usage:  udps -p <port>");
      System.err.println("        Note: <port> must be an integer in the range [1024,65536).");
      System.exit(1);
    }

    // Setup socket and echo each incoming datagram
    try{
      DatagramSocket serverSocket = new DatagramSocket(portReceive);
      byte[] receiveData = new byte[1024];
      DatagramPacket dp = new DatagramPacket(receiveData, receiveData.length);
      
      while (true) {
	serverSocket.receive(dp);
	System.out.println(dp.getAddress() + ": " + 
			   new String(dp.getData(),dp.getOffset(),dp.getLength()));
      }
      
    }
    catch (SocketException ex) 
    {
      System.out.println("UDP Port " + portReceive + " is already in use.");
      System.exit(1);    
    }  
  } 
}
