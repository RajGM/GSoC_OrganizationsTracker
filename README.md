# GSoC_OrganizationsTracker

LIVE LINK : https://rajgm.github.io/GSoC_OrganizationsTracker/

This project contains data about every organization that has participated in Google Summer of Code since 2009.

This project contains every tools and technologies used by the organization.

It also contains Filter based on tools(tech), topic and number of times organization has participated.

# Google Summer of Code Organization Filter 

## Table of contents

- [Quick start](#quick-start)
- [What's included](#whats-included)
- [TechStack](#TechStack)
- [Creator](#creator)

## Quick start

Quick start available option:

- Clone the repo: `https://github.com/RajGM/GSoC_OrganizationsTracker.git`
- Run index.html on local machine for the preview

### To scrape Data
- Run these commands with python
- Run scrapeOrgData.py to collect name of the organization year wise from the website
- Run scrapeToolsTechLinkData.py to collection information about tools, topic and more about each organization from the website
- Run allDataCombine.py to combine all of the data into single json file 
- OR
- pip install beautifulsoup4
- python3 scrapeOrgData.py
- python3 scrapeToolsTechLinkData.py
- python3 allDataCombine.py

## What's included
Within the download you'll find the following directories and files.

```text
GSOC_OrganizationTracker/
├── webScraper/
│   ├── scripts/
│   |   ├── working2015Org.py
│   |   ├── working2020Org.py
│   |   ├── dataCombineOrg.py
│   |   ├── printTest.py
│   |   ├── moreData.py
│   |   ├── finalScript.py
│   |   ├── allDataCombine.py
│   |   ├── scrapeAndCombine.py
│   ├── scrapedData/
│   |   ├── yearlyData/
│   |   |   ├── 2009Org.txt
│   |   |   ├── 2010Org.txt
│   |   |   ├── 2011Org.txt
│   |   |   ├── 2012Org.txt
│   |   |   ├── 2013Org.txt
│   |   |   ├── 2014Org.txt
│   |   |   ├── 2015Org.txt
│   |   |   ├── 2016Org.txt
│   |   |   ├── 2017Org.txt
│   |   |   ├── 2018Org.txt
│   |   |   ├── 2019Org.txt
│   |   |   ├── 2020Org.txt
│   |   ├── combinedData/
│   |   |   ├── toolsData.json
│   |   |   ├── allfinalData.json
│   |   |   ├── allDataCombined852.json
├── websiteFiles/
│   ├── assets/
│   |   ├── images/
│   |   |   ├── filter.png
│   |   ├── data/
│   |   |   ├── addDataCombined.json
│   ├── styles/
│   |   ├── index.css
│   ├── scripts/
│   |   ├── index.js
├── index.html
├── README.md
```

## Json Schema
``` text
Object
├── OrganizationName (Object)
│   ├── Year (Object)
│   |   ├──  Link (Object)
│   |   |   ├── Tech (Array)
│   |   |   ├── Topics (Array)
│   ├── Years (Array)     
```

## TechStack
This section list frameworks, libraries used to build this project 

* [HTML5](https://html5.org/)
* [CSS3](https://www.w3.org/Style/CSS/Overview.en.html)
* [JavaScript](https://www.javascript.com/)
* [Python](https://docs.python.org/3/)
* [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

## Creator

**Raj Gaurav Maurya**

- <https://github.com/RajGM>
- <https://twitter.com/RajGM29>
- <https://www.linkedin.com/in/rajgm29/>