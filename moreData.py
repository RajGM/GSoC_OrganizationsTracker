from bs4 import BeautifulSoup
import re
import urllib.request

#for year in range(2016,2021):
strYear = str(2016)
data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
soup = BeautifulSoup(data,'html.parser')

li = soup.find("section")
#print(  len(li.contents[1]) )
for ele in li.contents[1].ul.find_all("li"):
 print( ele["aria-label"] ) 
 print( ele.a["href"] ) 
