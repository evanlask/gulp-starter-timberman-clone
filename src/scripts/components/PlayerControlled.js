TM.Components.PlayerControlled = CES.Component.extend({
  name: 'PlayerControlled',

  init: function(side) {
    this.side = side;           // Indicates which side of the tree the player is on
    this.isChopping = false;    // True if the player is in a chop animation false if not
  }
});

// Which side of tree is player on
TM.Components.PlayerControlled.SIDE = {
  LEFT: 0,
  RIGHT: 1
};
