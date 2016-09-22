var SpriteAnimator = CES.System.extend({
  update: function(dt) {
    this.world.getEntities('SpriteAnimated').forEach(function(entity) {
      var spriteAnimated = entity.getComponent('SpriteAnimated');
      spriteAnimated.tick();
    });
  }
});
