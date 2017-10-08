import random
import json
from enum import Enum

class car:
  name = ""
  price = ""
  detail_set = {}
  image = ""
  
  def __init__(self, name, price, detail_set, model_num):
    self.name = name
    self.price = price
    self.detail_set = detail_set
    self.image = name+".jpg"

  def __str__(self):
    "Name: {0}\nprice: {1}\ndetail_set:\n {2}\nmodel_num: {3}".format(name, price, self.getFeatures(), model_num)

  def getJSON(self):
    json = {}
    json["features"] = self.detail_set
    json["price"] = self.price
    return json
 
class details(Enum):
  LEATHER_SEATS = 1
  PARKING_ASSIST = 2
  TELEVISION = 3
  INFOTAINMENT = 4
  FOUR_WHEEL_DRIVE = 5
  SAFE_SENSE = 6
  GLASS_ROOF = 7
  REAR_CAMERA = 8
  BLIND_SPOT_MONITOR = 9
  HIGH_QUALITY_AUDIO = 10


def Generate_Cars(num_of_cars):
  cars = {"Camry_LE": 26000, "Camry_XLE": 26000, "Camry_XSE": 26000, "Camry_L": 26000, "Toyota_Yaris": 26000, "Toyota_Corolla": 26000, "Toyota_Avalon": 26000, "Toyota_86": 26000, "Toyota_Sienne": 26000}
  arr_cars = []

  def generate_car():
    name = list(cars.keys())[random.randint(0, len(cars.keys())-1)]
    number_of_features = random.randint(5, len(details))
    price = cars[name]
    
    ## build json feature
    features = {}
    for feature in details:
      features[feature.name] = False
    
    ## Add Features 
    for _ in range(number_of_features):
      features[(details(random.randint(1, len(details))).name)] = True
      price += random.randint(750, 1500) ## adds money per feature

    ## Get Serial Number 
    serial = list("123567ABC")
    random.shuffle(serial)
    model_num = "".join(serial)

    return car(name+"_"+model_num, price, features, model_num)
  
  for _ in range(num_of_cars):
    arr_cars.append(generate_car())
   
  return arr_cars

def Make_JSON_From_Arr(arr_cars):
  json_blob = {}
  for car in arr_cars:
     json_blob[car.name] = car.getJSON()
  return json.dumps({"cars": json_blob})

if __name__ == "__main__":
  arr_cars = Generate_Cars(5000)
  with open("Car_Data.txt", "w") as text_file:
    text = Make_JSON_From_Arr(arr_cars)
    text_file.write(text)
