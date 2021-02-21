
def decryption_caesar(key):
	# 시저 암호 해독 부분입니다.
	f = open('cipher.txt', 'r')   # 파일 읽기
	cipher_txt = f.read() # 파일포인터 로 부터 텍스트 읽기
	f.close()
	decrypted_txt = ""            # 해독될 암호문이 저장되는 변수
	
	check_letter = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ' # input 체크

	for letter in cipher_txt :
		if letter in check_letter : 
			# 카이사르 암호의 특성 -> 문자열을 2*key+1 만큼 left shift 
			decrypted_txt += check_letter[(check_letter.index(letter)-2*key-1)%52]
		else : 
			# 알파벳 외에 문자열이 들어올 경우 예외처리
			decrypted_txt += letter


	f = open('decrypted.txt', 'w')   # 파일 쓰기
	f.write(decrypted_txt) # 파일포인터 로 부터 텍스트 쓰기
	f.close()

	return decrypted_txt


if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행
    key = 3                                  # 카이사르 암호의 키
    decrypted_txt = decryption_caesar(key)   # 변수 중복 가능
    print(decrypted_txt)