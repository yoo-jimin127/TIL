import requests
from bs4 import BeautifulSoup

url = "https://news.daum.net/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

file = open("daum.html", "w", encoding='utf-8')
file.write(response.text)
file.close()

# print(soup.title)
# print(soup.title.string)
# print(soup.span)
# print(soup.findAll('span'))

# print(response.text[:500])
# print(response.url)
# print(response.content)
# print(response.encoding)
# print(response.headers)
# print(response.json)
# print(response.links)
# print(response.ok)
# print(response.status_code)

# html 문서에서 모든 a태그를 가져오는 코드
results = soup.findAll("a", "link_txt")