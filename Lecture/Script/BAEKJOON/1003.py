
"""
def fibonacci(n) :
	if n==0 :
		print("0")
		return 0
	elif n==1 :
		print("1")
		return 1
	else :
		return fibonacci(n-1)+ fibonacci(n-2)


if __name__ == "__main__" :
	n = int(input())
	fibonacci(n)

"""
###############################################################
"""

def fib(n) :
	global zero_printed, one_printed

	zero_printed =0
	one_printed =0

	def fibonacci(n) :
		global zero_printed, one_printed

		if n==0 :
			zero_printed += 1 #print("0")
			return 0
		elif n==1 :
			one_printed += 1 #print("1")
			return 1
		else :
			return fibonacci(n-1)+ fibonacci(n-2)

	fibonacci(n)
	print(f"{zero_printed} {one_printed}")



if __name__ == "__main__" :
	T = int(input())
	for i in range(T) :
		n = int(input())
		fib(n)


"""
###############################################################

def fib_forward(max_n) :
	fib_ans = dict()

	for i in range(max_n):
		if i==0 : fib_ans[0] = [1,0]
		else : 
			fib_ans[i] = [fib_ans[i-1][1], sum(fib_ans[i-1]) ]

	return fib_ans


if __name__ == "__main__" :

	fib_ans = fib_forward(41)
	#print(fib_ans)

	T = int(input())
	for i in range(T) :
		n = int(input())
		print(f"{fib_ans[n][0]} {fib_ans[n][1]}")

