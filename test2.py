from bs4 import BeautifulSoup
import re
import urllib.request

year = 2009
data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/2019/organizations/').read()
soup = BeautifulSoup(data)
for li in soup.find_all('h4'):
   print(li.text)

