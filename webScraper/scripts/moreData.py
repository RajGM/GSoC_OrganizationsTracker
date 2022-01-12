from bs4 import BeautifulSoup
import re
import urllib.request
import json

for year in range(2016,2021):
 strYear = str(year)
 data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
 soup = BeautifulSoup(data,'html.parser')

 listdict = []
 li = soup.find("section")
 for ele in li.contents[1].ul.find_all("li"):
  newdict = {
      "org":ele["aria-label"],
      "link":"https://summerofcode.withgoogle.com"+ele.a["href"],
      "tech":[],
      "topics":[]
  }
  listdict.append(newdict)
 
 for i in range(len(listdict)):
  newdata = urllib.request.urlopen(listdict[i]["link"]).read()
  newsoup = BeautifulSoup(newdata,'html.parser')
 
  for tech in newsoup.body.find_all("li",{"class":"organization__tag organization__tag--technology"}): 
   listdict[i]["tech"].append(tech.text)

  for tool in newsoup.body.find_all("li",{"class":"organization__tag organization__tag--topic"}): 
   listdict[i]["topics"].append(tool.text)

 y = json.dumps(listdict)
 f = open(strYear+'toolsData.json','w')
 f.write(y)
 f.close()