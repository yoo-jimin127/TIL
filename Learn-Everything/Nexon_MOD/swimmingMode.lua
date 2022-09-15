SwimmingMode {
 Property:
  [None]
  string Mode = "SwimmingMode"
  
 Entity Event Handler:
  [Service : InputService]
  HandleKeyDownEvent (KeyDownEvent event) {
    if _UserService.LocalPlayer.CurrentMapName == "minigame_map" then
    -- Parameters
       local key = event.key
       local rigidbody = _UserService.LocalPlayer.RigidbodyComponent
       local controller = _UserService.LocalPlayer.PlayerControllerComponent
       local player = _UserService.LocalPlayer

       --------------------------------------------------------
       if self.Mode == "SwimmingMode" then
          rigidbody.Gravity=0.5
          player.CameraComponent.Damping.x = 0.1
          player.CameraComponent.Damping.y = 0.1
          if key == KeyboardKey.Space or key == KeyboardKey.LeftAlt then   
             rigidbody:SetForce(Vector2(1 * controller.LookDirectionX,4))
          end
            if key == KeyboardKey.LeftArrow then   
              rigidbody:SetForce(Vector2(-2,2))
            end
            if key == KeyboardKey.RightArrow then   
              rigidbody:SetForce(Vector2(2,2))
            end   
       end
    end
  }
}
