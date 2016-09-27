TM.Components.Dimension = CES.Component.extend({
  name: 'Dimension',

  // width - width of entity
  // height - height of entity
  init: function(width, height) {
    this.validateArguments(width, height);
    this.width = width;
    this.height = height;
  },

  // Validates arguments passed in to constructor
  validateArguments: function(width, height) {
    if(typeof width !== 'number') {
      throw 'width must be a number';
    }

    if(typeof height !== 'number') {
      throw 'height must be a number';
    }

    if(width < 0) {
      throw 'width must be greater than or equal to zero';
    }

    if(height < 0) {
      throw 'height must be greater than or equal to zero';
    }
  }
});
