TM.Systems.SpriteAnimator = CES.System.extend({
  update: function() {
    this.world.getEntities('SpriteAnimated').forEach(function(entity) {
      var spriteAnimated = entity.getComponent('SpriteAnimated');
      spriteAnimated.tick();
    });
  }
});
