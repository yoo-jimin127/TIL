## BFS - Breath First Search
BFS 알고리즘은 '너비 우선 탐색'의 의미를 가짐.
**가까운 노드부터** 탐색하는 알고리즘.

###BFS 알고리즘의 동작 방식
1. 탐색 시작 노드를 큐에 삽입하고 방문 처리를 함
1. 큐에서 노드를 꺼내 해당 노드의 인접 노드 중 방문하지 않은 노드를 모두 큐에 삽입
1. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복
 
 ![image](https://user-images.githubusercontent.com/66112716/156172886-c000348a-e1a6-4d82-bbbe-0f7a16e2755c.png)
 [사진 출처](https://seing.tistory.com/29)

 재귀 함수로 DFS를 구현할 경우, 컴퓨터 시스템의 동작 특성 상 실제 프로그램의 수행시간이 느려질 수 있음.
 따라서 stack lib를 사용하여 시간 복잡도를 완화할 필요도 있음.
 보통 DFS보다 **BFS 탐색이 더 빠르게** 동작함.

 BFS 예제
 ```python
 from collection import dequeue

 #BFS 메서드 정의
 def bfs(graph, start, visited):
     # 큐 구현을 위해 deque 라이브러리 사용
     queue = dequeue([start])
     # 현재 노드의 방문처리
     visited[start] = True
     # 큐가 빌 때 까지 반복
     while queue :
         # 큐에서 하나의 원소를 뽑아 출력
         v = queue.popleft()
         print(v, end=' ')
         #해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
         for i in graph[v]:
             if not visited[i]:
                 queue.append(i)
                 visited[i] = True

# 각 노드가 연결된 정보를 리스트 자료형으로 표현 ( 2차원 리스트 )
graph = [
    [],
    [2, 3, 8],
    [1, 7],
    [1, 4, 5],
    [3, 5],
    [3, 4],
    [7],
    [2, 6, 8],
    [1, 7]
]

# 각 노드가 방문한 정보를 리스트 자료형으로 표현(1차원 리스트)
visited = [False] * 9

# 정의된 bfs 함수 호출
bfs(graph, 1, visited)

 ```
 - 코드 출처 : 이것이 코딩 테스트다 (한빛 미디어)