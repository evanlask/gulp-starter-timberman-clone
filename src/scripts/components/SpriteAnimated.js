TM.Components.SpriteAnimated = CES.Component.extend({
  name: 'SpriteAnimated',

  // Create a animated sprite
  init: function(animationDefinition) {
    this.validateAnimationDefinition(animationDefinition);

    this.frames;               // Array containing frames of the animation
    this.rate;                 // Number of game ticks that must take place before switching to next frame
    this.ticksUntilNextFrame;  // Number of game ticks until next frame is shown
    this.currentFrame;         // Currently visible frame of the animation
    this.src;                  // Visible frame
    this.cycles;               // Number of times the animation has looped/cycles

    this.update(animationDefinition);
  },

  // Validates animation definition for required options and types
  validateAnimationDefinition: function(animationDefinition) {
    if(!Array.isArray(animationDefinition.frames)) {
      throw 'frames must be provided as array';
    }

    if(animationDefinition.frames.length === 0) {
      throw 'one or more frames must be provided';
    }

    if(typeof animationDefinition.rate !== 'number') {
      throw 'rate must be a number';
    }

    if(animationDefinition.rate <= 0) {
      throw 'rate must be greater than 0';
    }
  },

  // Call to update with a new animation
  update: function(animationDefinition) {
    this.frames = animationDefinition.frames;
    this.rate = animationDefinition.rate;
    this.ticksUntilNextFrame = this.rate;
    this.currentFrame = 0;
    this.src = this.frames[this.currentFrame];
    this.cycles = 0;
  },

  // Called by the SpriteAnimator system this function determines which frame of the animation should be visible
  tick: function() {
    if(this.ticksUntilNextFrame === 0) {
      // Show the next frame;
      if(this.currentFrame < this.frames.length - 1) {
        this.currentFrame++;
      }
      // Loop back around to the first frame
      else {
        this.currentFrame = 0;
        this.cycles++;
      }
      this.src = this.frames[this.currentFrame];
      this.ticksUntilNextFrame = this.rate;
    }
    else {
      this.ticksUntilNextFrame--;
    }
  }
});
