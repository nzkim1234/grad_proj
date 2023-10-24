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
import joblib

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
mystate = { "vitaminA" : 0.0,
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

for i in my:
  # print(my[i], day_male[i])
  if day_male[i] - my[i] < 0 : mystate[i] = 0
  else : mystate[i] = day_male[i] - my[i]

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

# 모든 영양제에서 찾는 부분
# startnum = 1
# endnum = 1000
# apikey = '068fd1df5c964d369f3b'
# #34244
# key = 1
# dfa0 = pd.DataFrame()
# dfa1 = pd.DataFrame()
# for i in range(1,36):
#   endnum = i*1000
#   url = f'http://openapi.foodsafetykorea.go.kr/api/{apikey}/I0030/json/{startnum}/{endnum}'
#   contents = requests.get(url).text
#   data = json.loads(contents)
#   if data['I0030']['total_count'] == '0':
#     pass
#   else :
#     dfa1 = pd.json_normalize(data['I0030']['row'])[['PRDLST_NM','STDR_STND']]
#     dfa0 = pd.concat([dfa0,dfa1])
#     dfa0 = dfa0.reset_index(drop=True)
#     key += 1
#     del [[dfa1]]
#   startnum = endnum+1

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

name = []
for i in range(0,len(rc)) :
  name.append(rc[i][0])

sc = pd.DataFrame([list(rc[0][1].values()),
                   list(rc[1][1].values()),
                  list(rc[2][1].values())], columns = list(rc[0][1].keys()))
for i in range(3,len(rc)):
  sc.loc[i] = rc[i][1].values()
sc['product'] = name

#모델 불러오기
knn = joblib.load('knn_model2.pkl')
cosine = joblib.load('cosine_model2.pkl')

# knn 방식
# 사용자의 현재 영양 상태 (mystate 변수)를 기반으로 영양제 추천 함수
def recommend_nutritional_supplement(user_nutrition, model):
    # 사용자의 영양 상태를 기반으로 예측
    user_nutrition_df = pd.DataFrame(user_nutrition, index=[0])
    product = model.predict(user_nutrition_df)

    # 예측된 제품을 반환
    return product[0]

# 추천 영양제 얻기
recommended_product = recommend_nutritional_supplement(mystate, knn)
print(f"추천 영양제: {recommended_product}")

#코사인 유사도 방식
similarities = cosine
# 가장 유사한 영양제의 인덱스를 찾음
most_similar_index = np.argmax(similarities)

# 해당 인덱스에 해당하는 영양제를 추천
recommended_product = sc['product'].iloc[most_similar_index]

print(f"추천 영양제: {recommended_product}")

# 유클리드 유사도 방식?
# 사용자의 영양 상태 벡터
user_state = np.array(list(mystate.values()))

# 제품의 영양소 데이터
product_nutrition = sc.drop('product', axis=1).values

# 유클리드 거리 계산
distances = np.linalg.norm(product_nutrition - user_state, axis=1)

# 최소 거리에 해당하는 제품 추출
recommended_product_index = np.argmin(distances)
recommended_product = sc.loc[recommended_product_index, 'product']

print(f"추천 영양제: {recommended_product}")