from bs4 import BeautifulSoup
import re
import urllib.request

year = "2016"
data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+year+'/organizations/').read()
soup = BeautifulSoup(data)
for li in soup.find_all('h4'):
   print(li.text)

