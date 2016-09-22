var PlayerControlled = CES.Component.extend({
  name: 'PlayerControlled',

  init: function(ticksBetweenActions) {
    this.ticksBetweenActions = ticksBetweenActions;   // Number of game ticks that have to take place between player actions
    this.side = PlayerControlled.SIDE.RIGHT;          // Indicates which side of the tree player is on
    this.canAct = true;                               // Indicates if the player has permission to perform an action
    this.tickCounter = 0;                             // Number of game ticks since last action
  },

  move: function(side) {
    // Move the player
    this.side = side;

    // Reset tick counter
    this.tickCounter = 0;

    // Player can't act for a while
    this.canAct = false;

    console.log('MOVE', this.side);
  },

  // Called by PlayerControl
  tick: function() {
    // Can the player act again?
    if(this.tickCounter >= this.ticksBetweenActions) {
      this.canAct = true;
    }

    this.tickCounter++;
  }
});

// Which side of tree is player on
PlayerControlled.SIDE = {
  LEFT: 1,
  RIGHT: 2
};
