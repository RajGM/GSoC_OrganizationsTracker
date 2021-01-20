from bs4 import BeautifulSoup
import re
import urllib.request

#for year in range(2016,2021):
strYear = str(2016)
data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
soup = BeautifulSoup(data,'html.parser')

listdict = []
li = soup.find("section")
for ele in li.contents[1].ul.find_all("li"):
 newdict = {
     "org":ele["aria-label"],
     "link":"https://summerofcode.withgoogle.com"+ele.a["href"]
 }
 listdict.append(newdict)
 
#print(listdict)
for i in range(len(listdict)):
    #print(listdict[i])
    #print( type(listdict[i]) )
    #print( listdict[i]["org"] )
    listdict[i]["org"] = listdict[i]["year"] = "2016"
    #print( listdict[i] )
    #print(type(listdict[i]))
    #for x in listdict[i]:
     #print(type(x))
     #x["year"] = "2016"