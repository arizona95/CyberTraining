
"""
def turret():
	n = int(input())

	for i in range(n) :
		x1, y1, r1, x2, y2, r2 = map(int, input().split())
		r = ((x1-x2)**2 + (y1-y2)**2)**(1/2)
		R = [r1,r2,r]
		m = max(R); R.remove(m)
		print(-1 if (r==0 and r1==r2) else\
			1 if (r==r1+r2 or m==sum(R)) else\
			0 if m>sum(R) else\
			2)
"""
###############################################################
def turret() :
	n = int(input())

	for i in range(n) :
		x1, y1, r1, x2, y2, r2 = map(int, input().split())
		r = ((x1-x2)**2 + (y1-y2)**2)**(1/2)
		R = [r1,r2,r]
		s = sum(R); m = 2*max(R)
		print(-1 if (r==0 and r1==r2) else\
			1 if m==s else\
			0 if m>s else\
			2)



# 이 부분을 추가합니다.	
if __name__ == "__main__":
    turret()