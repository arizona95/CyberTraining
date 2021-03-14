import enchant # 영어사전 import  # pip install pyenchant

def decryption_caesar():
	# 시저 암호 해독 부분입니다.
	f = open('cipher.txt', 'r')   # 파일 읽기
	cipher_txt = f.read() # 파일포인터 로 부터 텍스트 읽기
	f.close()

	max_dictionary_score = 0
	max_key = 0
	max_decrypted_txt = ""
	for key in range(1,26) : #키의 후보는 1~26
		#키 후보에 대해, 번역된 텍스트가 영어사전 단어에 얼마나 있는지 체크!
		dictionary_score, decrypted_txt = decrypted_dictionary_score(key, cipher_txt)

		# 반복하면서, 가장 자연스러운 번역을 찾는다.
		if dictionary_score > max_dictionary_score :
			max_key = key
			max_dictionary_score = dictionary_score
			max_decrypted_txt = decrypted_txt




	f = open('decrypted.txt', 'w')   # 파일 쓰기
	f.write(f"key : {max_key}\n\n{max_decrypted_txt}") # 파일포인터 로 부터 텍스트 쓰기
	f.close()

	return max_decrypted_txt, max_key

def decrypted_dictionary_score(key, cipher_txt) :
	# 주어진 key 로 cipher_txt 를 복호화 한 다음, 영어단어 사전에 등록되어있는 정도를 반환하는 함수

	dictionary = enchant.Dict("en_US")  # 파이썬 영어사전

	decrypted_txt = ""            # 해독될 암호문이 저장되는 변수
	
	check_letter = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ' # input 체크

	for letter in cipher_txt :
		if letter in check_letter : 
			# 카이사르 암호의 특성 -> 문자열을 2*key+1 만큼 left shift 
			decrypted_txt += check_letter[(check_letter.index(letter)-2*key-1)%52]
		else : 
			# 알파벳 외에 문자열이 들어올 경우 예외처리
			decrypted_txt += letter

	#복호화된 문장 단어로 split
	decrypted_letter = decrypted_txt.replace('.','').replace('\n','').split(' ')
	
	# 만약, 점프가 두번 되어 빈 단어가 없다면, 제거한다.
	try: decrypted_letter.remove('')
	except: pass

	# dictionary_score 센다.
	dictionary_non_exist = 0
	dictionary_exist = 0

	for word in decrypted_letter : # 단어들 중 
		if dictionary.check(word) == True : # 단어가 영어사전에 있으면
			dictionary_exist += 1
		else: # 단어가 영어사전에 없으면
			dictionary_non_exist += 1

	return dictionary_exist/(dictionary_exist+dictionary_non_exist), decrypted_txt


if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행
    decrypted_txt, key = decryption_caesar()   # 변수 중복 가능
    print(f"key: {key}")
    print(decrypted_txt)