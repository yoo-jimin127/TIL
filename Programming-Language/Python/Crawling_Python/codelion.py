import requests
from bs4 import BeautifulSoup
from datetime import datetime

url = "https://news.daum.net/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

file = open("daum.html", "w", encoding='utf-8')
file.write(response.text)
file.close()

# html 문서에서 모든 a태그를 가져오는 코드
results = soup.findAll("a", "link_txt")

search_rank_file = open("rankresult.txt", "a", encoding="utf-8")

print(datetime.today().strftime("%Y년 %m월 %d일의 뉴스입니다.\n"))
rank = 1

for result in results:
    search_rank_file.write(str(rank) + "번째 기사 : " + result.get_text() + "\n")
    print(rank, "번째 기사 : ", result.get_text(), "\n")
    rank += 1


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