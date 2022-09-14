ReadyButton {
	Property:
		[None]
		boolean isReady = false

	Entity Event Handler:
		[client only] [Entity : UIButton (/ui/UIGroup_waiting/UIButton)]
		HandleButtonClick (ButtonClickEvent event) {
			-- Parameters
			local Entity = event.Entity
			--------------------------------------------------------
			
			-- 버튼이 눌렸을 때 해당 플레이어가 Ready 상태일 경우 Ready 상태를 취소하고, UI의 Text를 수정한 뒤 서버에 알립니다.
			if self.isReady  == true then
			    self.isReady = false
			    self.Entity.TextComponent.Text = "Ready"
			    _UserService.LocalPlayer.Player:OnCancelReady()
			-- 버튼이 눌렸을 때 해당 플레이어가 Ready 상태가 아닐 경우, Ready 상태로 만들어주고, UI의 Text를 수정한 뒤 서버에 알립니다.
			else
			    self.isReady = true
			    self.Entity.TextComponent.Text = "Cancel"
			    _UserService.LocalPlayer.Player:OnReady()
			end
		}
}
