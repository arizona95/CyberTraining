from random import randint

def is_prime(n) :
	if n<2 :
		return False
	for i in range(2, int(n ** 0.5) +1 ):
		if n%i ==0 :
			return False
	return True

def find_primes(start, end) :
	prime1 = prime2 = 0
	while not is_prime(prime1) :
		prime1 = randint(start, end -1)
	while not is_prime(prime2) :
		prime2 = randint(start, end -1)
	return prime1, prime2

def gcd(a,b) :
	while b:
		a, b = b, a%b
	return a

def find_d(phi, e) :
	d = None
	for i in range(phi //e, phi) :
		if e*i%phi ==1 :
			d=i
			break
	return d

def generate_keys() :

	# 공개키 고정
	e = int('0b1000001',2)

	n, d =0, None
	while d is None :
		prime1, prime2 = find_primes(1000, 10000)
		n = prime1 * prime2
		phi = (prime1-1) * (prime2-1)
		d = find_d(phi, e)

	return n, e, d

def get_mod(message, exp, n) :
	result = message
	for i in range(1, exp):
		result = (result * message) %n
	return result

def encrypt(message, e, n):
	return get_mod(message, e, n)

def decrypt(message, d, n):
	return get_mod(message, d, n)

if __name__ == '__main__':

	# 평문 입력
	message: int= int(input('평문을 입력하세요:'))

	# n,e,d 생성
	n, e, d = generate_keys()

	#암, 복호화
	print('공개키:', n, e, '  개인키:', d)
	encrypted = encrypt(message, e, n)
	print('암호문:', encrypted)
	decrypted = decrypt(encrypted, d, n)
	print('복호문:', decrypted)