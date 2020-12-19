from bs4 import BeautifulSoup
import re
import urllib.request

year = "2015"
for year in range(2009,2016):
 strYear = str(year)
 data = urllib.request.urlopen('https://www.google-melange.com/archive/gsoc/'+strYear).read()
 soup = BeautifulSoup(data)
 x = 0
 orgDone = 0
 f = open(strYear+'Org.txt','w')

 for li in soup.find_all('a'):
  if x==1 and li.text == "Google Summer of Code":
   x = 0
  elif li.text == "Google Summer of Code":
   x = 1
  elif li.text == "Privacy Policy" and x==1:
   x = 3
   orgDone = 1

  if x==1 and li.text != "Google Summer of Code" and orgDone==0:
   f.write(li.text+"\n")
   print(li.text+"\n")

 f.close()

