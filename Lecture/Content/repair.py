import os
from pathlib import Path
from shutil import copyfile

root_translated_dir = "SY110"
root_repair_dir = "CyberWar"

# read repair_word_list

def read_repair_word_list() :

	repair_word = dict()

	with open("repair_word_list.txt","r",encoding = "utf-8") as f :
		repair_word_line = f.readlines()

	recent_word = ""
	for line in repair_word_line :
		if line.replace('\n','') == "" :
			continue

		if line.replace('\n','')[0] != '\t' :
			recent_word = line.replace('\n','')
		else :
			repair_word[line.replace('\n','')[1:]]=recent_word

	return repair_word

repair_word = read_repair_word_list()

def repair_html(filename) :
	Path(os.path.dirname(os.path.join(root_repair_dir,filename))).mkdir(parents=True, exist_ok=True)
	with open(os.path.join(root_translated_dir,filename), "r", encoding = "utf-8") as tf :
		html_content = tf.read()

		html_repair = html_content
		for repair_from_word in repair_word :
			html_repair= html_repair.replace(repair_from_word, repair_word[repair_from_word])

		with open(os.path.join(root_repair_dir,filename),"w", encoding = "utf-8") as rf :
			rf.write(html_repair)

def copy_by_filename(filename) :
	Path(os.path.dirname(os.path.join(root_repair_dir,filename))).mkdir(parents=True, exist_ok=True)
	copyfile(os.path.join(root_translated_dir,filename), os.path.join(root_repair_dir,filename))

file_list_in_translated = [os.path.join(root_translated_dir, f) for root_translated_dir, dn, filenames in os.walk(root_translated_dir) for f in filenames]
print(file_list_in_translated)

for filename in file_list_in_translated :
	file_low_name = "\\".join(filename.split('\\')[1:])
	if file_low_name.split('.')[-1] == 'html' :
		repair_html(file_low_name)
	else :
		copy_by_filename(file_low_name)

