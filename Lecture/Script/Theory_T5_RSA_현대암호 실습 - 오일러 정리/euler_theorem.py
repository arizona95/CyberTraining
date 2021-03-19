
def get_m() :
	while 1 :
		m = input("m 을 입력하세요 >>")
		if not m.isdigit() :
			if m == "exit" :
				print("프로그램을 종료합니다.")
				exit()
			else :
				print("3 이상의 양의 정수를 입력하세요")
		elif int(m) <3 :
			print("3 이상의 양의 정수를 입력하세요")
		else :
			return int(m)

def get_a() :
	while 1 :
		a = input("a 을 입력하세요 >>")
		if not a.isdigit() :
			if a == "exit" :
				print("프로그램을 종료합니다.")
				exit()
			else :
				print("3 이상의 양의 정수를 입력하세요")
		elif int(a) <2 :
			print("2 이상의 양의 정수를 입력하세요")
		else :
			return int(a)

def gcd(a,b) :
	while b:
		a, b = b, a%b
	return a

def find_eo_list(m) :
	eo_list = list()
	for k in range(m) :
		if gcd(k, m) ==1 :
			eo_list.append(k)
	return eo_list


def print_list_beautiful(l):
	printer = ""
	for n in l :
		printer +=  f"{n:6}"
	print(printer)

def multiply_modular(l, a, m) :
	return [(x*a)%m for x in l]

def multiply_all_in_list(l) :
	from functools import reduce
	return reduce((lambda x, y: x*y), l)


if __name__ == '__main__':	# 프로그램의 시작점일 때만 아래 코드 실행

	# m 입력받기
	m = get_m()
	# 서로소 리스트
	eo_list = find_eo_list(m)
	# 출력하기
	print_list_beautiful(eo_list)
	#곱 출력하기
	print(f"모든 숫자의 곱은 {multiply_all_in_list(eo_list)} 입니다.")


	#무한 반복
	while 1 :
		# a 입력받기
		a = get_a()
		eom_list = multiply_modular(eo_list, a, m) 
		print_list_beautiful(eom_list)
		#곱 출력하기
		print(f"모든 숫자의 곱은 {multiply_all_in_list(eom_list)} 입니다.")
