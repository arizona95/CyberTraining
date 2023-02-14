from socket import *
import threading
import time

serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('',8000))
serverSocket.listen(5)

userList = dict()

def send(sock) :
	while True :
		sendData = input("나:)")
		sock.send(sendData.encode('utf-8'))

def receive(sock, user) :
	while True :
		recvData = sock.recv(1024).decode('utf-8')
		print(f"{user}:) {recvData}")

		for userID in userList :
			if userID != user
				#print(f"userID : {userID}")
				socket = userList[userID]
				#print(f"socket : {socket}")
				socket.send(recvData.encode('utf-8'))

		if recvData == "quit" : 
		#2. 비정상적으로 종료가 될때도, quit 이 온것처럼 처리해야함
			# 1. userList 에서 삭제
			break


while True :
	try :
		connectedSocket , addr = serverSocket.accept()
		print("client 연결되었습니다!")
		print(f"{addr} 에서 접속함")
	except :
		pass
		break

	userName = connectedSocket.recv(1024).decode('utf-8')
	userList[userName] = connectedSocket


	sender = threading.Thread(target = send, args = (connectedSocket,))
	receiver = threading.Thread(target = receive, args = (connectedSocket,userName))
	sender.start()
	receiver.start()

while True :
	time.sleep(1000)
	pass
