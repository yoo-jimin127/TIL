Player {
	Property:
		[None]
		boolean isReady = false
		[None]
		number roomIdx = 0
		[None]
		any readyButton = nil

	Function:
		[client only]
		void OnBeginPlay () {
			wait(1)
			self.readyButton = _EntityService:GetEntity("855edfe4-5275-4855-9214-395a41473ec7") -- readyButton의 Entity ID를 ""사이에 입력합니다.
			-- Instance Map으로 이동하면 Ready 버튼이 보이지 않도록 합니다.
			if _UserService.LocalPlayer.CurrentMapName == "minigame_map" or _UserService.LocalPlayer.CurrentMapName == "lobby_map" then
			    self.readyButton.Enable = false
			end
		}

		[server]
		void OnReady () {
			self.isReady = true
		}

		[server]
		void OnCancelReady () {
			self.isReady = false
		}
}
