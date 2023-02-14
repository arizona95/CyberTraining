from socket import *
import threading
import time

clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect(('127.0.0.1',8000))

print('접속하였습니다')

userID = input("당신의 이름은?:")
clientSocket.send(userID.encode('utf-8'))


def send(sock) :
	while True :
		sendData = input("나:)")
		sock.send(sendData.encode('utf-8'))

		if sendData == "quit" : exit()

def receive(sock) :
	while True :
		recvData = sock.recv(1024)
		print(f"너:) {recvData.decode('utf-8')}")

sender = threading.Thread(target = send, args = (clientSocket,))
receiver = threading.Thread(target = receive, args = (clientSocket,))
sender.start()
receiver.start()

while True :
	time.sleep(1000)
	pass
