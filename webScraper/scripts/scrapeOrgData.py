from bs4 import BeautifulSoup
import re
import urllib.request
import json
combinedOrg = {}

def gather2015Data():
 for year in range(2009,2016):
  strYear = str(year)
  data = urllib.request.urlopen('https://www.google-melange.com/archive/gsoc/'+strYear).read()
  soup = BeautifulSoup(data,"html.parser")
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
    
  f.close()

def gather2020Data():
 for year in range(2016,2021):
  strYear = str(year)
  print(strYear)
  data = urllib.request.urlopen('https://summerofcode.withgoogle.com/archive/'+strYear+'/organizations/').read()
  soup = BeautifulSoup(data,"html.parser")
  f = open(strYear+'Org.txt','w')
  for li in soup.find_all('h4'):
   print(li.text)
   f.write(li.text+"\n")  
  f.close()

def combineOrgData():
 for year in range(2009,2021):
     strYear = str(year)
     f = open(strYear+'Org.txt','r')
     for x in f.readlines():
         if x in combinedOrg.keys():
             combinedOrg[x].append(strYear)
         else:
             combinedOrg[x] = list()
             combinedOrg[x].append(strYear)
     f.close()  

 y = json.dumps(combinedOrg)

 f = open("orgData.json","w")
 f.write(y)
 f.close()

gather2015Data()
gather2020Data()
combineOrgData()