import json 
toolData = []
orgData = []
finalData = {}

f = open("./newTest/2016moreOrg.json","r")
jsondata = json.load(f)
f.close()
print(jsondata)

f = open("./newTest/2016Org.txt","r")
orgData = f.read()
f.close()

print(orgData)


