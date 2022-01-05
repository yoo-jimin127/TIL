import requests
import json

city = "Seoul"
apikey = "34d60f5d8e949a645997f0aca9311686"

api = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}"

result = requests.get(api)
# print(result.text)

data = json.loads(result.text)

print(type(result.text))
print(type(data))