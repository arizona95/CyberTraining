import re  # pip insatll regex
import operator

def get_from_change() :

	while 1 :
		from_change = input("변경할 알파벳 입력 >> ")
		#input 검사 
		if from_change != "done" and ( len(from_change) != 1 or from_change not in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ) :
			print("대문자 알파벳을 입력하세요")
			continue
		else :
			return from_change

def get_to_change() :

	while 1 :
		to_change = input("어떤 알파벳으로 변경하시겠습니까? >> ")
		#input 검사 
		if to_change != "done" and ( len(to_change) != 1 or to_change not in 'abcdefghijklmnopqrstuvwxyz' ) :
			print("소문자 알파벳을 입력하세요")
			continue
		else :
			return to_change


def frequency_check(target):

	#빈도분석 함수

	dictionary = dict()

	if target != None:
		target = re.sub('[^A-Za-z]+', '', target)  # 영어대문자, 영어소문자 만 남김

	if target == None or target == '':
		return

	for word in target :
		try:
			cnt = dictionary[word]
			dictionary[word] = cnt + 1
		except KeyError:
			dictionary[word] = 1

	sorted_dict = dict(sorted(dictionary.items(), key= operator.itemgetter(1), reverse=True))

	printer = ""
	for cnt, word in enumerate(sorted_dict) :
		#문자열 길이 맞추기
		printer +=  f"{word}:{sorted_dict[word]:6}    "

		#5개 출력 마다 줄바꿈
		if (cnt+1)%7 == 0 : printer += "\n"

	print("\n" + printer + "\n")


def word_frequency_check(target):

	#빈도분석 함수

	dictionary = dict()

	if target != None:
		target = re.sub('[^A-Za-z ]+', '', target)  # 영어대문자, 영어소문자 만 남김

	if target == None or target == '':
		return

	for word in target.split(" ") :
		try:
			cnt = dictionary[word]
			dictionary[word] = cnt + 1
		except KeyError:
			dictionary[word] = 1

	sorted_dict = dict(sorted(dictionary.items(), key= operator.itemgetter(1), reverse=True))

	printer = ""
	for cnt, word in enumerate(sorted_dict) :
		#문자열 길이 맞추기
		printer +=  f"{word:15}:{sorted_dict[word]:7}    "

		#5개 출력 마다 줄바꿈
		if (cnt+1)%7 == 0 : printer += "\n"

	print("\n" + printer + "\n")

def substitution_by_rules(cipher_txt, substitution_rules) :
	decryption_by_rules = cipher_txt

	for from_change, to_change in substitution_rules.items() :
		decryption_by_rules = decryption_by_rules.replace(from_change, to_change)

	return decryption_by_rules



if __name__ == '__main__':	# 프로그램의 시작점일 때만 아래 코드 실행
	
	# 암호문 읽기
	# f.close 보다 간단한 문법 !
	with open("cipher.txt", 'r', encoding = "utf-8") as f :
		cipher_txt = f.read()

	#초기의 변환은 cipher text 와 동일
	decryption_by_rules = cipher_txt

	# 지금까지의 치환 규칙
	substitution_rules = dict()

	# 1. 암호문 출력
	print(cipher_txt+"\n")
	# 1. 빈도수 출력
	frequency_check(decryption_by_rules)
	# 1. 단어 빈도수 출력
	word_frequency_check(decryption_by_rules)

	while 1 :
		# 2. 바꿀 문자 입력
		from_change = get_from_change()
		if from_change == "done" :

			with open("decrypted.txt", 'w', encoding = "utf-8") as f :
				f.write(decryption_by_rules)
				exit()

		# 2. 바뀔 문자 입력
		to_change = get_to_change()
		if to_change == "done" :

			with open("decrypted.txt", 'w', encoding = "utf-8") as f :
				f.write(decryption_by_rules)
				exit()

		# 2. 규칙 업데이트
		substitution_rules[from_change] = to_change
		decryption_by_rules = substitution_by_rules(cipher_txt, substitution_rules)

		# 3. 치환된 암호문 출력
		print('\n'+decryption_by_rules)

		# 3. 규칙 현황 출력
		printer = ""
		for cnt, word in enumerate(substitution_rules) :
			printer +=  f"{word}->    {substitution_rules[word]}     "

			#5개 출력 마다 줄바꿈
			if (cnt+1)%7 == 0 : printer += "\n"
		print("\n"+ printer)

		# 3. 치환된 암호문 빈도 분석 추가
		frequency_check(decryption_by_rules)

