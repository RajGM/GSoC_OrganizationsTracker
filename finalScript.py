from bs4 import BeautifulSoup
import re
import urllib.request
import json
allYearData = {}
singleYearData = {}

#2016-2021
for year in range(2016,2018):
 strYear = str(year)
 data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
 soup = BeautifulSoup(data,'html.parser')
 
 li = soup.find("section")
 for ele in li.contents[1].ul.find_all("li"):
  singleYearData[ele["aria-label"]]["years"].append(strYear)
  linkTo = "https://summerofcode.withgoogle.com"+ele.a["href"]
  newdata = urllib.request.urlopen(linkTo).read()
  newsoup = BeautifulSoup(newdata,'html.parser')
  techData = []
  topicsData = []
  for tech in newsoup.body.find_all("li",{"class":"organization__tag organization__tag--technology"}): 
   techData.append(tech.text)

  for tool in newsoup.body.find_all("li",{"class":"organization__tag organization__tag--topic"}): 
   topicsData.append(tool.text)     
  
  if ele["aria-label"] in singleYearData.keys():
   newdict = {
       "link":linkTo,
       "tech":techData,
       "topics":topicsData
   }
   singleYearData[ele["aria-label"]]["years"].append(strYear)
   singleYearData[ele["aria-label"]][strYear] = newdict

  else:
   newdict = {
       "years":[strYear],
       strYear:{
       "link":linkTo,
       "tech":techData,
       "topics":topicsData
       }
   }
   singleYearData[ele["aria-label"]] = newdict

 print(singleYearData)

jsonData = json.dumps(singleYearData)
print(jsonData)
with open('allfinalData.json', 'w') as outfile:
 outfile.write(jsonData)



"""
 print(strYear+"Done")
 y = json.dumps(listdict)
 f = open(strYear+'toolsData.json','w')
 f.write(y)
 f.close()
 """