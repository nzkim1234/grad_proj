# 라이브러리 import
import requests
import pprint
import json
import pandas as pd
import sys

import numpy as np
import random
import re

#pd.describe_option()
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)

# 제품 명을 입력하세요.
name =  sys.argv[1]
str = name.split()
startnum = 1
endnum = 1000
apikey = '068fd1df5c964d369f3b'
key = 1
dfa0 = pd.DataFrame()
dfa1 = pd.DataFrame()
for i in str:
  url = f'http://openapi.foodsafetykorea.go.kr/api/{apikey}/I0030/json/{startnum}/{endnum}/PRDLST_NM="{i}"'
  response = requests.get(url)
  contents = response.text
  data = json.loads(contents)
  if data['I0030']['total_count'] == '0':
    pass
  else :
    dfa1 = pd.json_normalize(data['I0030']['row'])[['PRDLST_NM','STDR_STND','NTK_MTHD']]
    dfa0 = pd.concat([dfa0,dfa1])
    dfa0 = dfa0.reset_index(drop=True)
    key += 1
    del [[dfa1]]

nut = dfa0.loc[dfa0['PRDLST_NM'] == name].head(1)
mthd = nut['NTK_MTHD'].to_string()

nm = nut['STDR_STND'].to_string().split('n')
for i in range(0, len(nm)):
  nm[i] = nm[i].replace('｛',' ')
  nm[i] = nm[i].replace('｝',' ')
  nm[i] = nm[i].replace(',','')
  nm[i] = nm[i].replace(' ','')
  nm[i] = nm[i].replace('표시량','')
  nm[i] = nm[i].replace('80~','')
  nm[i] = nm[i].replace('80～','')
  nm[i] = nm[i].replace('120%','')
  nm[i] = nm[i].replace('150%','')
  nm[i] = nm[i].replace('180%','')
  nm[i] = nm[i].replace('\\', '')
  nm[i] = re.sub("\(|\)|\{|\}","", nm[i])

vita = ["비타민A","비타민D", "비타민E", "비타민K", "비타민C", "비타민B1", "비타민B2", "나이아신", "판토텐산", "비타민B6", "비오틴", "비타민B12", "엽산", "칼슘", "마그네슘", "철", "구리", "망간", "요오드", "셀렌","셀레늄", "몰리브덴", "크롬"]

dic = {
"비타민A" : "vitaminA",
"비타민D" : "vitaminD",
"비타민E" : "vitaminE",
"비타민K" : "vitaminK",
"비타민B1" : "vitaminB1",
"비타민B2" : "vitaminB2",
"비타민B6" : "vitaminB6",
"비타민B12" : "vitaminB12",
"비타민C" : "vitaminC",
"나이아신" : "nicotinic_acid",
"판토텐산" : "pantothenic",
"엽산" : "folic_acid",
"비오틴" : "biotin",
"칼슘" : "calcium",
"마그네슘" : "magnesium",
"철" : "iron",
"구리" : "copper",
"셀렌" : "selenium",
"셀레늄" : "selenium",
"요오드" : "iodine",
"망간" : "manganese",
"몰리브덴" : "molybdenum",
"크롬" : "chrome"
}
dic_adv = {
"vitaminA" : "비타민A",
"vitaminD" : "비타민D",
"vitaminE" : "비타민E",
"vitaminK" : "비타민K",
"vitaminB1" : "비타민B1",
"vitaminB2" : "비타민B2",
"vitaminB6" : "비타민B6",
"vitaminB12" : "비타민B12",
"vitaminC" : "비타민C",
"nicotinic_acid" : "나이아신",
"pantothenic" : "판토텐산",
"folic_acid" : "엽산",
"biotin" : "비오틴",
"calcium" : "칼슘",
"magnesium" : "마그네슘",
"iron" : "철",
"copper" : "구리",
"selenium" : "셀렌",
"iodine" : "요오드",
"manganese" : "망간",
"molybdenum" : "몰리브덴",
"chrome" : "크롬"
}

my = { "vitaminA" : 0.0,
"vitaminD" : 0.0,
"vitaminE" : 0.0,
"vitaminK" : 0.0,
"vitaminB1" : 0.0,
"vitaminB2" : 0.0,
"vitaminB6" : 0.0,
"vitaminB12" : 0.0,
"vitaminC" : 0.0,
"nicotinic_acid" : 0.0,
"pantothenic" : 0.0,
"folic_acid" : 0.0,
"biotin" : 0.0,
"calcium" : 0.0,
"magnesium" : 0.0,
"iron" : 0.0,
"copper" : 0.0,
"selenium" : 0.0,
"iodine" : 0.0,
"manganese" : 0.0,
"molybdenum" : 0.0,
"chrome" : 0.0
}
day_male = { "vitaminA" : 1000.0 ,
"vitaminD" : 25.0 ,
"vitaminE" : 15.0 ,
"vitaminK" : 75.0 ,
"vitaminB1" : 3.0 ,
"vitaminB2" : 3.0 ,
"vitaminB6" : 5.0 ,
"vitaminB12" : 5.0 ,
"vitaminC" : 1000.0 ,
"nicotinic_acid" : 25.0 ,
"pantothenic" : 10.0 ,
"folic_acid" : 600.0 ,
"biotin" : 50.0 ,
"calcium" : 800.0 ,
"magnesium" : 360.0 ,
"iron" : 10.0 ,
"copper" : 1.0 ,
"selenium" : 60.0 ,
"iodine" : 300.0 ,
"manganese" : 4.0 ,
"molybdenum" : 30.0 ,
"chrome" : 30.0
}
day_female = { "vitaminA" : 800.0,
"vitaminD" : 25.0 ,
"vitaminE" : 15.0 ,
"vitaminK" : 65.0 ,
"vitaminB1" : 3.0 ,
"vitaminB2" : 3.0 ,
"vitaminB6" : 5.0 ,
"vitaminB12" : 5.0 ,
"vitaminC" : 1000.0 ,
"nicotinic_acid" : 25.0 ,
"pantothenic" : 10.0 ,
"folic_acid" : 600.0 ,
"biotin" : 50.0 ,
"calcium" : 700.0 ,
"magnesium" : 280.0 ,
"iron" : 14.0 ,
"copper" : 1.0 ,
"selenium" : 60.0 ,
"iodine" : 300.0 ,
"manganese" : 3.5 ,
"molybdenum" : 25.0 ,
"chrome" : 20.0
}
mypercent = { "vitaminA" : 0.0,
"vitaminD" : 0.0,
"vitaminE" : 0.0,
"vitaminK" : 0.0,
"vitaminB1" : 0.0,
"vitaminB2" : 0.0,
"vitaminB6" : 0.0,
"vitaminB12" : 0.0,
"vitaminC" : 0.0,
"nicotinic_acid" : 0.0,
"pantothenic" : 0.0,
"folic_acid" : 0.0,
"biotin" : 0.0,
"calcium" : 0.0,
"magnesium" : 0.0,
"iron" : 0.0,
"copper" : 0.0,
"selenium" : 0.0,
"iodine" : 0.0,
"manganese" : 0.0,
"molybdenum" : 0.0,
"chrome" : 0.0
}

pattern = '\d정'
r = re.compile(pattern)
try: 
    take = re.findall('\d',r.findall(mthd)[0])[0]
    my['intake_per_day'] = int(take)
except:
    my['success'] = 0

aa = []
aaa = []
num = 0

# pattern = f'{j}:[가-힣]+\d+(?:[,.]\d+)?\w+'
for i in nm:
  for j in vita:
    # pattern = f'{j}:(?:[가-힣]+)?\d+(?:[,.]\d+)?'
    pattern = f'{j}(?:\W+\w+[가-힣]+)?:(?:[가-힣]+)?(?:\d+:)?\d+(?:[,.]\d+)?'
    r = re.compile(pattern)
    if r.search(i) != None:
      aa.append(r.findall(i))
      if j in dic:
        aaa.append(aa[num][0])
        aaa[num] = aaa[num].replace(j, dic[j])
        my[dic[j]] += float(re.findall(r'\d+(?:[,.]\d+)?', aaa[num])[-1])
        num += 1

if aaa:
    my['success'] = 1

else:
    my['success'] = 0

my = json.dumps(my)
print(my)
