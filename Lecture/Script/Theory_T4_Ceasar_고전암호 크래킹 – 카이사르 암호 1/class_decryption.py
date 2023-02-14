

class Cipher_basic() :
	"""
	super class
	"""

	def __init__(self, algo_name) :
		self.A = algo_name
		self.p = None
		self.c = None
		self.k = None

	def get_value(self, parm) :
		if parm == "key" :
			return self.k
		elif parm == "crypto" :
			return self.c
		elif parm == "plain" :
			return self.p


class Cipher(Cipher_basic):
	"""Cipher class

	Note :
	"""

	def __init__(self, algo_name) :
		super(Cipher, self).__init__(algo_name)

	def set(self, parm, value) :
		""" Setting function with name of param 

		Args :
			parm (string) : name of parameter
			value (string) : value of parameter

		"""
		if parm == "key" :
			self.k = value
		elif parm == "crypto" :
			self.c = value
		elif parm == "plain" :
			self.p = value

	def set_from_file(self, parm, filename) :
		if parm == "plain" :
			with open(filename, 'r') as fp :
				self.p = fp.read()
		elif parm == "crypto" :
			with open(filename, 'r') as fp :
				self.c = fp.read()

	def decrypt(self) :
		if self.A == "caesar" :
			self.p = self.decrypt_caesar()

	def decrypt_caesar(self) :
		decrypted_txt = "" 
		for letter in self.c :
			if 65 <= ord(letter) and ord(letter) <= 65+26 :
				d = chr(65 + (ord(letter)-65 - self.k)%26 + 32)
				decrypted_txt = decrypted_txt + d
			else :
				decrypted_txt = decrypted_txt +letter

		return decrypted_txt

if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행
    decryptor = Cipher("caesar")
    decryptor.set_from_file("crypto", "cipher.txt")
    decryptor.set("key",3)
    decryptor.decrypt()
    print(decryptor.get_value("plain"))