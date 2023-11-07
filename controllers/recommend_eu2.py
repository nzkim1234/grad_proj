# 라이브러리 import
import requests
import pprint
import json
import pandas as pd
import numpy as np
import random
import re
import heapq
import sys

# pd.describe_option()
pd.set_option("display.max_rows", None)
pd.set_option("display.max_columns", None)
pd.set_option("display.max_colwidth", None)

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

for i in my_vit_contain.keys():
  if day_male[i] - my_vit_contain[i] < 0 : mystate[i] = 0
  else : mystate[i] = int(day_male[i] - my_vit_contain[i])

new_str = []
for i in mypercent:
  if i == "intake_per_day":
    pass
  elif mypercent[i] <= 0.0:
    new_str.append(dic_adv[i])
if len(new_str) == 0:
  print("잘 먹고 계십니다!")
  quit()

vita_df = pd.read_csv("controllers/vitamin.csv",index_col = 0)
mydf = pd.read_csv("controllers/my_df.csv",index_col = 0)
recdf = pd.read_csv("controllers/rec_df.csv",index_col = 0)

if mydf.to_dict("records") == [mystate]:
  dumped = json.dumps(recdf.to_dict("records"))
  print(dumped)
else:
  for i in my_vit:
    vita_df = vita_df[vita_df["prod_name"] != i]
    vita_df = vita_df.reset_index(drop=True)
    
  recommended_index = []
  ans = vita_df
  euclid_recommended_product = ""

  for i in range(5):
    # 사용자의 영양 상태 벡터
    user_state = np.array(list(mystate.values()))

    # 제품의 영양소 데이터
    vita_df = vita_df[vita_df["prod_name"] != euclid_recommended_product]
    product_nutrition = vita_df.drop("prod_name", axis=1).values

    # 유클리드 거리 계산
    distances = np.linalg.norm(product_nutrition - user_state, axis=1)

    # 최소 거리에 해당하는 제품 추출
    recommended_index.append(np.argmin(distances))
    euclid_recommended_product = vita_df.loc[np.argmin(distances)]["prod_name"]

  #나의 현재 부족한 영양상태와 현재 추천하는 영양제 데이터 저장 
  my_df = pd.DataFrame(columns=mystate.keys())
  my_df.loc[0] = mystate.values()
  rec_df = ans.loc[recommended_index]
  rec_df = rec_df.reset_index(drop=True)

  my_df.to_csv("controllers/my_df.csv")
  rec_df.to_csv("controllers/rec_df.csv")
  #dumped = json.dumps(rec_df.to_dict("records"))
  dumped = json.dumps(ans.loc[recommended_index].to_dict('records'))
  print(dumped)

  
