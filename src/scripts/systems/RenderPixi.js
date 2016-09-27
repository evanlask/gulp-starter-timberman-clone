TM.Systems.RenderPixi = CES.System.extend({
  init: function(options) {
    this._super();

    // Validate options before going any further
    this.validateOptions(options);

    // Store options
    this.options = options;

    // Make sure event handlers are always bound to this object
    this.onEntityAdded = this.onEntityAdded.bind(this);
    this.onEntityRemoved = this.onEntityRemoved.bind(this);
    this.onPreloadComplete = this.onPreloadComplete.bind(this);

    // Preload textures
    this.preloadTextures(options.textures, this.onPreloadComplete);
  },

  // Makes sure required options are present and of the correct type
  validateOptions: function(options) {
    // Validate containerElement option
    if(!(options.containerElement instanceof HTMLElement)) {
      throw 'containerElement must be an HTML element';
    }

    // Validate width option
    if(typeof options.width !== 'number') {
      throw 'width must be a number';
    }

    // Validate height option
    if(typeof options.height !== 'number') {
      throw 'height must be a number';
    }

    // Validate ready callback
    if(typeof options.onReady !== 'function') {
      throw 'onReady must be a function';
    }
  },

  // Preload textures
  preloadTextures: function(textures, onComplete) {
    // Add error texture
    PIXI.loader.add('media/error.png');

    // Add each texture to loader
    for(var id in textures) {
      var src = textures[id];
      PIXI.loader.add(src);
    }

    // Load the textures
    PIXI.loader.load(onComplete);
  },

  // Called once preloading of textures is complete
  onPreloadComplete: function() {
    // Create Pixi.js renderer
    this.renderer = PIXI.autoDetectRenderer(this.options.width, this.options.height);
    this.options.containerElement.appendChild(this.renderer.view);

    // Create stage where entities will be rendered
    this.stage = new PIXI.Container();

    // Initial render
    this.renderer.render(this.stage);

    // Execute callback indicating renderer is ready to be used
    this.options.onReady(this);
  },

  // Fetches a preloaded texture
  getTexture: function(src) {
    var texture = PIXI.loader.resources[src].texture;

    if(!texture) {
      throw 'Texture not found for ' + src;
    }

    return texture;
  },

  // Called when system is added to world
  addedToWorld: function(world) {
    this._super(world);

    // Adding and removal of entities
    world.entityAdded().add(this.onEntityAdded);
    world.entityRemoved().add(this.onEntityRemoved);
  },

  // Called when system is removed from world (THIS IS NOT TESTED YET BUGGY I BET)
  removedFromWorld: function(world) {
    this._super(world);

    // Stop listening for addition and removal of entities
    world.entityAdded().remove(this.onEntityAdded);
    world.entityRemoved().remove(this.onEntityRemoved);

    // Clear out the stage
    this.stage.removeChildren();
  },

  // Called when entities are added to world
  onEntityAdded: function(entity) {
    // Only deal with entities that are requesting to be rendered
    if(!entity.hasComponent('Rendered')) {
      return;
    }

    // Check for required components
    if(!entity.hasComponent('Dimension') || !entity.hasComponent('Position')) {
      throw 'Dimension and Position components required for rendering';
    }

    // Two types of sprite are possible
    var sprite = entity.getComponent('Sprite');
    var spriteAnimated = entity.getComponent('SpriteAnimated');

    // Instance of a PIXI.Sprite created here
    var pixiSprite;

    // Normal sprites
    if(sprite) {
      // Tiled sprite
      if(sprite.tiled) {
        pixiSprite = new PIXI.extras.TilingSprite(this.getTexture(sprite.src));
      }
      // Not tiled sprite
      else {
        pixiSprite = new PIXI.Sprite(this.getTexture(sprite.src));
      }
    }
    // Animated sprites
    else if(spriteAnimated) {
      pixiSprite = new PIXI.Sprite(this.getTexture(spriteAnimated.src));
    }
    // ERROR
    else {
      pixiSprite = new PIXI.Sprite(this.getTexture('img/error.png'));
    }

    // Dimension
    var dimension = entity.getComponent('Dimension');
    if(dimension) {
      pixiSprite.width = dimension.width;
      pixiSprite.height = dimension.height;
    }

    // Position
    var position = entity.getComponent('Position');
    if(position) {
      pixiSprite.x = position.x;
      pixiSprite.y = position.y;
    }

    // Rotation
    var rotation = entity.getComponent('Rotation');
    if(rotation) {
      pixiSprite.rotation = rotation.getRadians();
    }

    // Tile Position
    var tilePosition = entity.getComponent('TilePosition');
    if(tilePosition && entity.getComponent('Sprite').tiled) {
      pixiSprite.tilePosition.x = tilePosition.x;
      pixiSprite.tilePosition.y = tilePosition.y;
    }

    // Add a reference to the sprite on the entities Rendered component
    entity.getComponent('Rendered').pixiSprite = pixiSprite;

    // Add to stage
    this.stage.addChild(pixiSprite);
  },

  // Called when entity is removed from world
  onEntityRemoved: function(entity) {
    // Remove entity from stage
    var rendered = entity.getComponent('Rendered');
    this.stage.removeChild(rendered.sprite);
  },

  // Called on each update of the world
  update: function() {
    var self = this;

    // Loop over all rendered entities and update
    this.world.getEntities('Rendered').forEach(function(entity) {
      // Fetch the sprite for this entity
      var rendered = entity.getComponent('Rendered');
      var pixiSprite = rendered.pixiSprite;

      // Two types of sprite are possible
      var sprite = entity.getComponent('Sprite');
      var spriteAnimated = entity.getComponent('SpriteAnimated');

      // Normal sprites
      var texture;
      if(sprite) {
        // Check if texture needs to be updated or not
        texture = self.getTexture(sprite.src);
        if(pixiSprite.texture !== texture) {
          pixiSprite.texture = texture;
        }
      }
      // Animated sprites
      else if(spriteAnimated) {
        // Check if texture needs to be updated or not
        texture = self.getTexture(spriteAnimated.src);
        if(pixiSprite.texture !== texture) {
          pixiSprite.texture = texture;
        }
      }
      // ERROR
      //else {
      //}

      // Dimension
      var dimension = entity.getComponent('Dimension');
      if(dimension) {
        pixiSprite.width = dimension.width;
        pixiSprite.height = dimension.height;
      }

      // Position
      var position = entity.getComponent('Position');
      if(position) {
        pixiSprite.x = position.x;
        pixiSprite.y = position.y;
      }

      // Rotation
      var rotation = entity.getComponent('Rotation');
      if(rotation) {
        pixiSprite.rotation = rotation.getRadians();
      }

      // Tile Position
      var tilePosition = entity.getComponent('TilePosition');
      if(tilePosition && entity.getComponent('Sprite').tiled) {
        pixiSprite.tilePosition.x = tilePosition.x;
        pixiSprite.tilePosition.y = tilePosition.y;
      }
    });

    this.renderer.render(this.stage);
  }
});
