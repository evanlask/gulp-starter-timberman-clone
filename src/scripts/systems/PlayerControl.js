TM.Systems.PlayerControl = CES.System.extend({

  // keyBinds - key bindings object
  init: function(keyBinds) {
    this._super();
    this.keyBinds = keyBinds;
    this.keysPressed = {};
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  },

  addedToWorld: function(world) {
    this._super(world);
    this.attachListeners();
  },

  removedFromWorld: function(world) {
    this._super(world);
    this.removeListeners();
  },

  attachListeners: function() {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  },

  removeListeners: function() {
    document.removeEventListener('keydown', this.onKeyDown, false);
    document.removeEventListener('keyup', this.onKeyUp, false);
  },

  // Called when a key is pressed
  onKeyDown: function(e) {
    this.keysPressed[e.keyCode.toString()] = true;
  },

  // Called when a key is released
  onKeyUp: function(e) {
    this.keysPressed[e.keyCode.toString()] = false;
  },

  // Check if a key is currently pressed
  isKeyPressed: function(keyCode) {
    var keyState = this.keysPressed[keyCode.toString()];
    return keyState === undefined ? false : keyState;
  },

  update: function() {
    var self = this;

    // Look for entities that can be controlled by player
    this.world.getEntities('PlayerControlled').forEach(function(entity) {
      var playerControlled = entity.getComponent('PlayerControlled');
      var spriteAnimated = entity.getComponent('SpriteAnimated');

      // Look up relevant key states
      var isLeftPressed = self.isKeyPressed(self.keyBinds.LEFT);
      var isRightPressed = self.isKeyPressed(self.keyBinds.RIGHT);

      // LEFT or RIGHT but not both at the same time
      if(isLeftPressed) {
        playerControlled.move(TM.Components.PlayerControlled.SIDE.LEFT);
        spriteAnimated.update(TM.ANIMATIONS.PLAYER_LEFT_CHOP);
      } else if (isRightPressed) {
        playerControlled.move(TM.Components.PlayerControlled.SIDE.RIGHT);
        spriteAnimated.update(TM.ANIMATIONS.PLAYER_RIGHT_CHOP);
      }

      //
      playerControlled.tick();
    });
  }
});
