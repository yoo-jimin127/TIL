GameManager {
	Property:
		[None]
		number roomIdx = 0
		[None]
		number checkReadyPlayerTimer = 0
		[None]
		number playerNumPerGame = 0

	Function:
		[server only]
		void OnUpdate (number delta) {
			self.checkReadyPlayerTimer = self.checkReadyPlayerTimer + delta
			-- 일정한 주기로 Ready 상태가 된 플레이어를 체크합니다.
			if self.checkReadyPlayerTimer >= 3.0 then
			    self.checkReadyPlayerTimer = 0.0

			    -- Ready 상태인 플레이어 수와 이름을 가져옵니다.
			    local readyPlayerNum = 0
				  local readyPlayers = {}
				  for k, v in pairs(_UserService.UserEntities) do
			        if v.Player.isReady == true then
			            readyPlayerNum = readyPlayerNum + 1
			            readyPlayers[#readyPlayers+1] = v.Name
			        end
			    end

			    -- Ready 상태인 플레이어 수가 미리 설정한 값 이상일 경우 해당 플레이어들을 Instance Map으로 보내주는 로직을 실행합니다.
			    if readyPlayerNum >= self.playerNumPerGame then
			        -- 만들어야 할 Instance Map의 개수만큼 반복합니다.
			        for i = 1, math.floor(readyPlayerNum / self.playerNumPerGame) do
			            -- Instance Map을 생성합니다.
			            local instanceMap = self:GetOrCreateInstanceMap()
			            local toSendPlayers = {}
			            -- 각 Instance Map에 배치해줄 플레이어들을 가져옵니다.
			            for j = 1, self.playerNumPerGame do
			                local idx = (i-1) * self.playerNumPerGame + j
			                toSendPlayers[#toSendPlayers+1] = readyPlayers[idx]
			            end
			            -- 가져온 플레이어들의 정보를 이용해 해당하는 Instance Map으로 보내줍니다.
			            _InstanceMapService:MoveUsersToInstanceMap(instanceMap.InstanceKey, toSendPlayers)
			        end
			    end
			end
		}

		any GetOrCreateInstanceMap(string arg1) {
			-- InstanceMapService를 이용해 Instance Map을 생성하고 roomIdx를 1 올려줍니다.
			-- roomIdx를 Instance Map을 만드는 키로 사용해 매번 새로운 InstanceMap이 만들어지게 합니다.
			local instanceMap = 
			_InstanceMapService:GetOrCreateInstanceMap("MinigameMap"..tostring(self.roomIdx))
			self.roomIdx = self.roomIdx + 1
			return instanceMap
		}
}
