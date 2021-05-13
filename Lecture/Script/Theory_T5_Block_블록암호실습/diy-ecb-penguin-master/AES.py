#!/usr/bin/env python3

from PIL import Image
from Crypto.Cipher import AES
from Crypto import Random
from argparse import ArgumentParser

def encrypt_image(image, key, iv=b''):
    image_array = bytes(image.tobytes())
    padding_length = AES.block_size - len(image_array) % AES.block_size
    image_array += bytes(padding_length * ".", "UTF-8") # Just an arbitrary padding byte

    mode = AES.MODE_CBC if iv else AES.MODE_ECB
    if mode == AES.MODE_CBC :
    	aes = AES.new(key, mode, iv)
    else :
    	aes = AES.new(key, mode)

    encrypted_image = aes.encrypt(image_array)
    encrypted_image = encrypted_image[:-padding_length]

    return Image.frombytes("RGB", image.size, encrypted_image, "raw", "RGB")

if __name__ == "__main__":



    image = Image.open("ori.png").convert('RGBA').convert('RGB') # The example Tux.png is in palette mode with transparency, and needs to be converted to RGBA first
                                                                       # TODO: Find a better way to do this in a general way

    key = Random.new().read(AES.key_size[0])

    encrypt_image(image, key).save("ecb.png")
    iv = Random.new().read(AES.block_size)
    encrypt_image(image, key, iv).save("cbc.png")

