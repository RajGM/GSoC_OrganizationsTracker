import json

combinedOrg = {}

f = open('../scrapedData/combineData/allfinalData.json',"r")
combinedOrg = json.load(f)
f.close()

for year in range(2009,2016):
    strYear = str(year)
    f = open("../scrapedData/yearlyData/"+strYear+'Org.txt','r')
    for x in f.readlines():
        if x in combinedOrg.keys():
            combinedOrg[x]["years"].append(strYear)
        else:
            combinedOrg[x] = {"years":[strYear]}
            
    f.close()  

y = json.dumps(combinedOrg)

f = open("allDataCombined852.json","w")
f.write(y)
f.close()