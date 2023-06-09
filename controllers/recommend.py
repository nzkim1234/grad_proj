# 라이브러리 import
import requests
import pprint
import json
import pandas as pd
import sys
import numpy as np
import random
import re
import heapq

# pd.describe_option()
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)

my_vit = sys.argv[2]
my_vit_contain = json.loads(sys.argv[1])
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

my = { "vitaminA" : 300.0,
"vitaminD" : 3.0,
"vitaminE" : 6.0,
"vitaminK" : 65.0,
"vitaminB1" : 1.0,
"vitaminB2" : 1.0,
"vitaminB6" : 3.0,
"vitaminB12" : 2.0,
"vitaminC" : 600.0,
"nicotinic_acid" : 12.0,
"pantothenic" : 7.0,
"folic_acid" : 300.0,
"biotin" : 50.0,
"calcium" : 300.0,
"magnesium" : 340.0,
"iron" : 40.0,
"copper" : 2.0,
"selenium" : 100.0,
"iodine" : 30.0,
"manganese" : 3.0,
"molybdenum" : 23.0,
"chrome" : 42.0
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
nutri = { "vitaminA" : 0.0,
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

for i in my_vit_contain.keys():
  mypercent[i] = my_vit_contain[i] / day_male[i] * 100

new_str = []
for i in mypercent:
    if mypercent[i] <= 40.0:
      new_str.append(dic_adv[i])
if len(new_str) == 0:
  print("잘 먹고 계십니다!")
  quit()

startnum = 1
endnum = 1000
apikey = '068fd1df5c964d369f3b'
key = 1
dfa0 = pd.DataFrame()
dfa1 = pd.DataFrame()
for i in new_str:
  url = f'http://openapi.foodsafetykorea.go.kr/api/{apikey}/I0030/json/{startnum}/{endnum}/PRDLST_NM="{i}"'
  contents = requests.get(url).text
  data = json.loads(contents)
  if data['I0030']['total_count'] == '0':
    pass
  else :
    dfa1 = pd.json_normalize(data['I0030']['row'])[['PRDLST_NM','STDR_STND']]
    dfa0 = pd.concat([dfa0,dfa1])
    dfa0 = dfa0.reset_index(drop=True)
    key += 1
    del [[dfa1]]

# bb = []
# rec = []
# for i in range(0, len(dfa0)):
#   num = 0
#   for j in new_str:
#     if j in dfa0['STDR_STND'][i]:
#       num += 1
#   bb.append(num)
# for i in range(6):
#   if len(new_str) == 1:
#     rec.append(dfa0['PRDLST_NM'][random.randrange(0, len(dfa0))])
#   elif dfa0['PRDLST_NM'][bb.index(max(bb))] in my_vit:
#     del bb[bb.index(max(bb))]
#     rec.append(dfa0['PRDLST_NM'][bb.index(max(bb))])
#   else:
#     rec.append(dfa0['PRDLST_NM'][bb.index(max(bb))])
#     # print(bb.index(max(bb)),max(bb))
#     del bb[bb.index(max(bb))]
# del rec[0]

# bb = []
# rec = []
# for i in range(0, len(dfa0)):
#   num = 0
#   for j in new_str:
#     if j in dfa0['STDR_STND'][i]:
#       num += 1
#   bb.append(num)
# for i in range(6):
#   if len(new_str) == 1:
#     rec.append(dfa0.loc[random.randrange(0, len(dfa0))])
#   elif dfa0['PRDLST_NM'][bb.index(max(bb))] in my_vit:
#     del bb[bb.index(max(bb))]
#     rec.append(dfa0.loc[bb.index(max(bb))])
#   else:
#     rec.append(dfa0.loc[bb.index(max(bb))].to_list())
#     # print(bb.index(max(bb)),max(bb))
#     del bb[bb.index(max(bb))]
# del rec[0]

rc = dfa0.columns.values.tolist() + dfa0.values.tolist()
rc.remove('PRDLST_NM')
rc.remove('STDR_STND')

for i in range(0, len(rc)):
  nutri.update({}.fromkeys(nutri, 0))
  aa = []
  aa = rc[i][1].split(r'\n')
  for j in range(0, len(rc[i][1].split(r'\n'))):
    aa[j] = aa[j].replace('｛',' ')
    aa[j] = aa[j].replace('｝',' ')
    aa[j] = aa[j].replace(',','')
    aa[j] = aa[j].replace(' ','')
    aa[j] = aa[j].replace('표시량','')
    aa[j] = aa[j].replace('80~','')
    aa[j] = aa[j].replace('80～','')
    aa[j] = aa[j].replace('120%','')
    aa[j] = aa[j].replace('150%','')
    aa[j] = aa[j].replace('180%','')
    aa[j] = aa[j].replace('\\', '')
    aa[j] = re.sub("\(|\)|\{|\}","", aa[j])
  cc = []
  ccc = []
  num = 0
  for n in aa:
    for m in vita:
      pattern = f'{m}:.*\d+[㎎㎍um]*g*\w*'
      # pattern = f'{m}:.*\d+[㎎㎍um]*g*\w*/'
      r = re.compile(pattern)
      if r.search(n) != None:
        cc.append(r.findall(n))
        pattern = f'{m}:.*\d+[㎎㎍um]*g*.*/'
        r = re.compile(pattern)
        if r.search(n) != None:
          ind = -2
        else: ind = -1
        if m in dic:
          ccc.append(cc[num][0])
          ccc[num] = ccc[num].replace(m, dic[m])
          nutri[dic[m]] = float(re.findall(r'\d+(?:[.]\d+)?', ccc[num])[0])
          num += 1
  rc[i][1] = nutri
  rc[i][1] = nutri.copy()

# 부족한 영양소 찾기

def find_deficient_nutrients(nutrients, daily_values):
  deficient_nutrients = {}
  for key, value in nutrients.items():
    if value < daily_values[key]:
      deficient_amount = daily_values[key] - value
      deficient_nutrients[key] = deficient_amount
  return deficient_nutrients

# 현재 영양소 상태 계산

total_p = []

for nutrient in rc:
  current_nutrients = my.copy()
  nutrient_info = nutrient[1]
  for key, value in nutrient_info.items():
      current_nutrients[key] += value

  deficient_nutrients = find_deficient_nutrients(current_nutrients, day_male)  # 혹은 day_female

  total = 0
  if len(deficient_nutrients) == 0:
    print("부족한 영양소가 없습니다!")
  else:
    # print("부족한 영양소:")
    for key, value in deficient_nutrients.items():
      # print(f"{dic_adv[key]}: {value}/{day_male[key]}")
      # print(f"{dic_adv[key]}: {value/day_male[key]*100}")
      total += value/day_male[key]*100
  # print(total)
  total_p.append(total)

a = heapq.nsmallest(20, enumerate(total_p), key=lambda x: x[1])
recommand = []
name = []
for i in a:
  if (rc[i[0]][0] in name) | (rc[i[0]][0] in my_vit):
    pass
  else :
    name.append(rc[i[0]][0])
    recommand.append(rc[i[0]])
recommand = random.sample(recommand, 5)

for i in range(0,len(recommand)):
  recommand[i][1]["prod_name"] = recommand[i][0]
#for i in range(0, len(recommand)):
  #print(recommand[i][1])

recommand = list(list(zip(*recommand))[1])
dumped = json.dumps(recommand)
print(dumped)