
"""
A_B = input().split()
A = int(A_B[0])
B = int(A_B[1])
print(A+B)

"""
###############################################################
"""
A_B = input().split()

SUM = 0

for i in range(len(A_B)) :
	SUM += int(A_B[i])

print(SUM)
"""
###############################################################
"""
A_B = input().split()
print(int(A_B[0])+int(A_B[1]))
"""
###############################################################
"""
A_B = input().split()
print((lambda x,y: x + y)(int(A_B[0]), int(A_B[1])))
"""
###############################################################
"""
a, b = map(int, input().split())
print(a+b)
"""
###############################################################
"""
from functools import reduce
print(reduce(lambda x,y : y+x, map(int, input().split())))

"""
###############################################################
#"""
print( (lambda x,y: x + y)(*map(int, input().split())) )
#"""