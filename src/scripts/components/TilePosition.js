TM.Components.TilePosition = CES.Component.extend({
  name: 'TilePosition',

  // x - initial x position
  // y - initial y position
  // velocityX - velocity of movement in x per frame
  // velocityY - velocity of movement in y per frame
  init: function(x, y, velocityX, velocityY) {
    //this.validateArguments(x, y, velocityX, velocityY);
    this.x = x;
    this.y = x;
    this.velocityX = velocityX === undefined ? 0 : velocityX;
    this.velocityY = velocityY === undefined ? 0 : velocityY;
  },

  // Validates arguments passed in to constructor
  //validateArguments: function(x, y, velocityX, velocityY) {
  //}
});
