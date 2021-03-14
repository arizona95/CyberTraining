
def encryption_caesar(key):
	# 시저 암호화 부분입니다.
	f = open('plaintext.txt', 'r')   # 파일 읽기
	plain_txt = f.read() # 파일포인터 로 부터 텍스트 읽기
	f.close()
	encrypted_txt = ""            # 암호화될 암호문이 저장되는 변수
	
	check_letter = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ' # input 체크

	for letter in plain_txt :
		if letter in check_letter : 
			# 카이사르 암호의 특성 -> 문자열을 2*key 만큼 right shift 
			index_letter = check_letter.index(letter)
			# +1-index_letter%2 만큼 추가로 right shift : 문자열 대문자 위함
			encrypted_txt += check_letter[(index_letter+2*key+1-index_letter%2)%52] 
		else : 
			# 알파벳 외에 문자열이 들어올 경우 예외처리
			encrypted_txt += letter.replace('\n','')  # 줄바꿈은 제거
  
	f = open('cipher.txt', 'w')   # 파일 쓰기
	f.write(encrypted_txt) # 파일포인터 로 부터 텍스트 쓰기
	f.close()

	return encrypted_txt


if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행
    key = 3                                  # 카이사르 암호의 키
    encrypted_txt = encryption_caesar(key)   # 변수 중복 가능
    print(encrypted_txt)