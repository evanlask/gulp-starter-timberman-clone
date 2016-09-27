TM.Components.Sprite = CES.Component.extend({
  name: 'Sprite',
  init: function(src, tiled) {
    this.src = src;
    this.tiled = tiled === true ? true : false;
  }
});
