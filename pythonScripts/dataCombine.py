import json

combinedOrg = {}

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

f = open("newData.json","w")
f.write(y)
f.close()