import json

combinedOrg = {}

for year in range(2009,2021):
    strYear = str(year)
    f = open(strYear+'Org.txt','r')
    for x in f.readlines():
        if x in combinedOrg.keys():
            print("Key exists")
            print(combinedOrg[x])
            combinedOrg[x].append(strYear)
        else:
            print("Adding Key")
            combinedOrg[x] = list()
            combinedOrg[x].append(strYear)
    f.close()  

print(combinedOrg)

y = json.dumps(combinedOrg)

f = open("newData.json","w")
f.write(y)
f.close()