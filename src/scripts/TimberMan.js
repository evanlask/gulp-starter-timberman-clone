TM.TimberMan = CES.Class.extend({
  init: function(containerElement) {
    // Game engine state
    this.isRunning;      // True if game loop running false if not
    this.frameCount;     // Total number of frames rendered
    this.lastFrame;      // Time of last frame render

    // CES references
    this.world;          // Game world
    this.playerEntity;   // Player entity
    this.logEntities;    // Log entities

    // Renderer needs to be initialized first so textures can be preloaded
    this.onRenderSystemReady = this.onRenderSystemReady.bind(this);
    this.renderSystem = new TM.Systems.RenderPixi({
      containerElement: containerElement,
      width: TM.CONFIG.WIDTH,
      height: TM.CONFIG.HEIGHT,
      textures: TM.TEXTURES,
      onReady: this.onRenderSystemReady
    });

    // Optional frame statistics
    if(TM.CONFIG.STATS_ENABLED) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      containerElement.appendChild(this.stats.dom);
    }
  },

  // Called after the renderer is ready to be used
  onRenderSystemReady: function(renderSystem) {
    // Create world to contain entities
    this.world = new CES.World();

    // Initialize systems (act on entities in the world)
    this.world.addSystem(new TM.Systems.SpriteAnimator());
    this.world.addSystem(new TM.Systems.TilePositionAnimator());
    this.world.addSystem(new TM.Systems.PlayerControl(TM.CONFIG.KEY_BINDS));
    this.world.addSystem(renderSystem);

    // Start game
    this.restart();
  },

  // Create environmental entities
  createEnvironmentEntities: function() {
    // Sky
    var sky = new CES.Entity();
    sky.addComponent(new TM.Components.Dimension(TM.CONFIG.WIDTH, TM.CONFIG.HEIGHT));
    sky.addComponent(new TM.Components.Position(0,0));
    sky.addComponent(new TM.Components.Rendered());
    sky.addComponent(new TM.Components.TilePosition(0, 0, -0.4, 0));
    sky.addComponent(new TM.Components.Sprite(TM.TEXTURES.SKY, true));
    this.world.addEntity(sky);

    // Background
    var background = new CES.Entity();
    background.addComponent(new TM.Components.Dimension(TM.CONFIG.WIDTH, TM.CONFIG.HEIGHT));
    background.addComponent(new TM.Components.Position(0, 0));
    background.addComponent(new TM.Components.Rendered());
    background.addComponent(new TM.Components.Sprite(TM.TEXTURES.BACKGROUND));
    this.world.addEntity(background);

    // Birds
  },

  // Create player entitiy
  createPlayerEntities: function() {
    var player = new CES.Entity();
    player.addComponent(new TM.Components.Dimension(TM.CONFIG.PLAYER_WIDTH, TM.CONFIG.PLAYER_HEIGHT));
    player.addComponent(new TM.Components.PlayerControlled(TM.Components.PlayerControlled.SIDE.RIGHT));
    player.addComponent(new TM.Components.Position(TM.CONFIG.PLAYER_RIGHT_POSITION_X, 375));
    player.addComponent(new TM.Components.Rendered());
    player.addComponent(new TM.Components.SpriteAnimated(TM.ANIMATIONS.PLAYER_RIGHT_IDLE));
    this.world.addEntity(player);
  },

  // Create log entities
  createLogEntities: function() {
    // TODO - Dynamic generation of logs

    var log = new CES.Entity();
    log.addComponent(new TM.Components.Dimension(TM.CONFIG.LOG_WIDTH, TM.CONFIG.LOG_HEIGHT));
    log.addComponent(new TM.Components.Position(0, 377));
    log.addComponent(new TM.Components.Rendered());
    log.addComponent(new TM.Components.Sprite(TM.TEXTURES.LOG_LEFT));
    this.world.addEntity(log);

    log = new CES.Entity();
    log.addComponent(new TM.Components.Dimension(TM.CONFIG.LOG_WIDTH, TM.CONFIG.LOG_HEIGHT));
    log.addComponent(new TM.Components.Position(0, 277));
    log.addComponent(new TM.Components.Rendered());
    log.addComponent(new TM.Components.Sprite(TM.TEXTURES.LOG_SPACER));
    this.world.addEntity(log);

    log = new CES.Entity();
    log.addComponent(new TM.Components.Dimension(TM.CONFIG.LOG_WIDTH, TM.CONFIG.LOG_HEIGHT));
    log.addComponent(new TM.Components.Position(0, 177));
    log.addComponent(new TM.Components.Rendered());
    log.addComponent(new TM.Components.Sprite(TM.TEXTURES.LOG_RIGHT));
    this.world.addEntity(log);

    log = new CES.Entity();
    log.addComponent(new TM.Components.Dimension(TM.CONFIG.LOG_WIDTH, TM.CONFIG.LOG_HEIGHT));
    log.addComponent(new TM.Components.Position(0, 77));
    log.addComponent(new TM.Components.Rendered());
    log.addComponent(new TM.Components.Sprite(TM.TEXTURES.LOG_RIGHT));
    this.world.addEntity(log);

    log = new CES.Entity();
    log.addComponent(new TM.Components.Dimension(TM.CONFIG.LOG_WIDTH, TM.CONFIG.LOG_HEIGHT));
    log.addComponent(new TM.Components.Position(0, -23));
    log.addComponent(new TM.Components.Rendered());
    log.addComponent(new TM.Components.Sprite(TM.TEXTURES.LOG_SPACER));
    this.world.addEntity(log);
  },

  // Start game execution
  start: function() {
    this.frameCount = 0;
    this.isRunning = true;
    this.lastFrameTime = new Date().getTime();
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  },

  // Pause game execution
  pause: function() {
    this.isRunning = false;
  },

  // Resume game execution
  resume: function() {
    this.isRunning = true;
    this.tick();
  },

  // Game loop
  tick: function() {
    // Optional frame statistics
    if(TM.CONFIG.STATS_ENABLED) {
      this.stats.begin();
    }

    // Do game stuff
    var currentFrame = new Date().getTime();
    this.world.update(currentFrame - this.lastFrame);
    this.lastFrame = currentFrame;

    // Increment frame counter
    this.frameCount++;

    // Optional frame statistics
    if(TM.CONFIG.STATS_ENABLED) {
      this.stats.end();
    }

    // Next tick/update
    if(this.isRunning) {
      requestAnimationFrame(this.tick);
    }
  },

  // Restart game
  restart: function() {
    var self = this;

    // Pause game to prepare for reset
    this.pause();

    // Remove all previously existing entities from world
    var entities = this.world.getEntities();
    entities.forEach(function(entity) {
      self.world.removeEntity(entity);
    });

    // Create new entities
    this.createEnvironmentEntities();
    this.createLogEntities();
    this.createPlayerEntities();

    // Start game
    this.start();
  }
});
