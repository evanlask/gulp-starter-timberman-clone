TM.Systems.TilePositionAnimator = CES.System.extend({
  update: function() {
    this.world.getEntities('TilePosition').forEach(function(entity) {
      var tilePosition = entity.getComponent('TilePosition');
      tilePosition.x += tilePosition.velocityX;
      tilePosition.y += tilePosition.velocityY;
    });
  }
});
