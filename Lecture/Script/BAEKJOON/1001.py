"""
A_B = input().split()
A = int(A_B[0])
B = int(A_B[1])
print(A-B)
"""
###############################################################
#"""
print( (lambda x, y : x-y)(*map(int, input().split())) )
#"""