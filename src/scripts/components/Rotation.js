var Rotation = CES.Component.extend({
  name: 'Rotation',

  // angle - degrees of rotation
  init: function(angle) {
    this.validateArguments(angle);
    this.angle = angle;
  },

  // Validates arguments passed in to constructor
  validateArguments: function(angle) {
    if(typeof angle !== 'number') {
      'deg must be a number'
    }
  },

  // Returns angle in radians
  getRadians: function() {
    return this.angle * Math.PI / 180;
  },

  // Returns angle in degrees
  getDegrees: function() {
    return this.angle;
  }
});
