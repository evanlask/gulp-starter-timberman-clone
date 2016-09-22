var Position = CES.Component.extend({
  name: 'Position',

  // x - x position in px (+/-)
  // y - y position in px (+/-)
  init: function(x, y) {
    this.validateArguments(x, y);
    this.x = x;
    this.y = y;
  },

  // Validates arguments passed in to constructor
  validateArguments: function(x, y) {
    if(typeof x !== 'number') {
      'x position must be a number'
    }

    if(typeof y !== 'number') {
      'y position must be a number'
    }
  }
});
