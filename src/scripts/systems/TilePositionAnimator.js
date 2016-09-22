var TilePositionAnimator = CES.System.extend({
  update: function(dt) {
    this.world.getEntities('TilePosition').forEach(function(entity) {
      var tilePosition = entity.getComponent('TilePosition');
      tilePosition.x += tilePosition.velocityX;
      tilePosition.y += tilePosition.velocityY;
    });
  }
});
