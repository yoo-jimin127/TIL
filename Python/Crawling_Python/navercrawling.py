import requests
from bs4 import BeautifulSoup
from datetime import datetime

headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
url = "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=105&sid2=731"
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

file = open("naver.html", "w", encoding='utf-8')
file.write(response.text)
file.close()

# html 문서에서 모든 span - lede를 가져오는 코드
results = soup.findAll("span", "lede")

search_rank_file = open("naverresult.txt", "a", encoding="utf-8")

print(datetime.today().strftime("%Y년 %m월 %d일의 뉴스입니다.\n"))
rank = 1

for result in results:
    search_rank_file.write(str(rank) + "번째 기사 : " + result.get_text() + "\n")
    print(rank, "번째 기사 : ", result.get_text(), "\n")
    rank += 1