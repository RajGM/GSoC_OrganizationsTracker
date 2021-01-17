from bs4 import BeautifulSoup
import re
import urllib.request

for year in range(2016,2021):
 strYear = str(year)
 data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
 soup = BeautifulSoup(data,'html.parser')
 #print(soup.prettify())
 for li in soup.find_all('md-option'):
  print(li.text)
  