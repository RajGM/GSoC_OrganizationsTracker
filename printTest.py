from bs4 import BeautifulSoup
import re
import urllib.request

year = "2015"
#data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+year+'/organizations/').read()
data = urllib.request.urlopen('https://www.google-melange.com/archive/gsoc/'+year).read()
soup = BeautifulSoup(data)
x = 0
orgDone = 0
f = open('2015TextOrg.txt','w')

for li in soup.find_all('a'):
 f.write(li.text+"\n")
 print(li.text+"\n")
f.close()


f.close()

