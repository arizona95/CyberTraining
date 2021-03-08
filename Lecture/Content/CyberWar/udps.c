/***********************************************************
 * A simple UDP server program.  It just reads messages and
 * prints them out along with the identity of sending host.
 ***********************************************************/
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

int main(int argc, char **argv)
{
  /* Set up socket */
  int sfd = socket(AF_INET,SOCK_DGRAM,0);
  if (sfd == -1) { fprintf(stderr,"Socket not created!\n"); exit(1); }

  /* Get current host's IP address. */
  struct hostent *p;
  p = gethostbyname(getenv("HOST"));
  if (p == NULL) { fprintf(stderr,"Name not found!\n"); exit(2); }
  unsigned int *ip = (unsigned int*)(p->h_addr_list[0]);

  /* Set up address structure */
  struct sockaddr_in mysa;
  mysa.sin_family = AF_INET;
  mysa.sin_addr.s_addr = *ip;
  mysa.sin_port = htons(10000);

  /* Bind socket to address */
  if (bind(sfd,(struct sockaddr*)&mysa,sizeof(mysa)) < 0)
  {
    close(sfd);
    fprintf(stderr,"bind failed!\n");
    exit(3);
  }

  while(1)
  {
    /* Define buffer in which to recieve client's message. */
    char msg[257] = {'\0'};

    /* Set up structure for client's host+port and recieve datagram! */
    struct sockaddr_in sourcesa = {0};
    int ssize = sizeof(sourcesa);
    int r = recvfrom(sfd,msg,256,0,(struct sockaddr*)&sourcesa,&ssize);

    /* Print host and message. */
    struct hostent *he= gethostbyaddr((char *)&sourcesa.sin_addr.s_addr,4,AF_INET);
    printf("Got message from '%s' (IP %u)!\n",he->h_name,sourcesa.sin_addr.s_addr);
    if (r == 0)
      printf("-->%i-byte message!\n",r);
    else
      printf("-->%i-byte message: %s",r,msg);
  }

  fprintf(stderr,"Server shutting down!\n");
  close(sfd);
  return 0;
}
