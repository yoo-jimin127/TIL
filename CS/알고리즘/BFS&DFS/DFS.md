## DFS - Depth First Search
DFS는 '깊이 우선 탐색'을 의미
그래프에서 **깊은 부분을 우선적으로 탐색** 하는 알고리즘

### DFS 알고리즘의 동작 방식 : stack을 사용
1. 탐색 시작 노드를 스택에 삽입하고 방문 처리
1. 스택의 최상단 노드에 방문하지 않은 인접 노드가 있을 경우
    - 해당 인접 노드를 스택에 넣고 방문 처리를 함
    - 방문하지 않은 인접노드가 없으면 스택에서 최상단 노드를 꺼냄
1. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복

![image](https://user-images.githubusercontent.com/66112716/156766115-f6086b0c-4cf7-4d19-b295-6afa4f792047.png)
[사진 출처](https://velog.io/@vagabondms/DFS-vs-BFS)
 
```python
# DFS 메서드 정의
def dfs(graph, v, visited) :
    # 현재 노드를 방문 처리
    visited[v] = True
    print(v, end=' ')

    # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
    for i in graph[v]:
        if not visited[i]:
            dfs(graph, i, visited)

#각 노드가 연결된 정보를 리스트 자료형으로 표현 (2차원 리스트)
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

# 각 노드가 방문된 정보를 리스트 자료형으로 표현 (1차원 리스트)
visited = [False] * 9

# 정의된 dfs 함수 호출
dfs(graph, 1, visited)
```
 - 코드 출처 : 이것이 코딩 테스트다 (한빛 미디어)