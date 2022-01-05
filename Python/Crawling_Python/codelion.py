import requests
from bs4 import BeautifulSoup

url = "http://www.daum.net"
response = requests.get(url)

# print(type(response.text))
# print(response.url)
# print(response.content)
# print(response.encoding)
# print(response.headers)
# print(response.json)
# print(response.links)
# print(response.ok)
# print(response.status_code)

soup = BeautifulSoup(response.text, 'html.parser')

print(soup.title)