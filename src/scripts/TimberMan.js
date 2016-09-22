// Game Configuration
var CONFIG = {
  STATS_ENABLED: true,
  WIDTH: 360,
  HEIGHT: 540,
  GROUND_HEIGHT: 133,
  LOG_WIDTH: 360,
  LOG_HEIGHT: 100,
  PLAYER_WIDTH: 147,
  PLAYER_HEIGHT: 120,
  PLAYER_TICKS_BETWEEN_ACTIONS: 20,
  KEY_BINDS: {
    LEFT: 37,
    RIGHT: 39
  }
};

// Texture Definitions
var TEXTURES = {
  BACKGROUND: 'media/7.png',
  SKY: 'media/110.png',
  PLAYER_LEFT_IDLE: 'media/31.png',
  PLAYER_LEFT_IDLE_2: 'media/57.png',
  PLAYER_LEFT_CHOP: 'media/60.png',
  PLAYER_RIGHT_IDLE: 'media/41.png',
  PLAYER_RIGHT_IDLE_2: 'media/39.png',
  PLAYER_RIGHT_CHOP: 'media/43.png',
  LOG_SPACER: 'media/35.png',
  LOG_LEFT: 'media/33.png',
  LOG_RIGHT: 'media/34.png'
};

// Animation Definitions
var ANIMATIONS = {
  PLAYER_LEFT_IDLE: {
    frames: [
      TEXTURES.PLAYER_LEFT_IDLE,
      TEXTURES.PLAYER_LEFT_IDLE_2,
    ],
    rate: 30
  },
  PLAYER_LEFT_CHOP: {
    frames: [
      TEXTURES.PLAYER_LEFT_CHOP,
      TEXTURES.PLAYER_LEFT_IDLE,
    ],
    rate: 7
  },
  PLAYER_RIGHT_IDLE: {
    frames: [
      TEXTURES.PLAYER_RIGHT_IDLE,
      TEXTURES.PLAYER_RIGHT_IDLE_2,
    ],
    rate: 30
  },
  PLAYER_RIGHT_CHOP: {
    frames: [
      TEXTURES.PLAYER_RIGHT_CHOP,
      TEXTURES.PLAYER_RIGHT_IDLE
    ],
    rate: 7
  }
}

// Timberman clone
var TimberMan = CES.Class.extend({
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
    this.renderSystem = new RenderPixi({
      containerElement: containerElement,
      width: CONFIG.WIDTH,
      height: CONFIG.HEIGHT,
      textures: TEXTURES,
      onReady: this.onRenderSystemReady
    });

    // Optional frame statistics
    if(CONFIG.STATS_ENABLED) {
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
    this.world.addSystem(new PlayerControl(CONFIG.KEY_BINDS));
    this.world.addSystem(new SpriteAnimator());
    this.world.addSystem(new TilePositionAnimator());
    this.world.addSystem(renderSystem);

    // Start game
    this.restart();
  },

  // Create environmental entities
  createEnvironmentEntities: function() {
    // Sky
    var sky = new CES.Entity();
    sky.addComponent(new Dimension(CONFIG.WIDTH, CONFIG.HEIGHT));
    sky.addComponent(new Position(0,0));
    sky.addComponent(new Rendered());
    sky.addComponent(new TilePosition(0, 0, -0.4, 0));
    sky.addComponent(new Sprite(TEXTURES.SKY, true));
    this.world.addEntity(sky);

    // Background
    var background = new CES.Entity();
    background.addComponent(new Dimension(CONFIG.WIDTH, CONFIG.HEIGHT));
    background.addComponent(new Position(0, 0));
    background.addComponent(new Rendered());
    background.addComponent(new Sprite(TEXTURES.BACKGROUND));
    this.world.addEntity(background);

    // Birds
  },

  // Create player entitiy
  createPlayerEntities: function() {
    var player = new CES.Entity();
    player.addComponent(new Dimension(CONFIG.PLAYER_WIDTH, CONFIG.PLAYER_HEIGHT));
    player.addComponent(new PlayerControlled(CONFIG.PLAYER_TICKS_BETWEEN_ACTIONS));
    player.addComponent(new Position(200, 375));
    player.addComponent(new Rendered());
    player.addComponent(new SpriteAnimated(ANIMATIONS.PLAYER_RIGHT_IDLE));
    this.world.addEntity(player);
  },

  // Create log entities
  createLogEntities: function(count) {
    // TODO - Dynamic generation of logs

    var log = new CES.Entity();
    log.addComponent(new Dimension(CONFIG.LOG_WIDTH, CONFIG.LOG_HEIGHT));
    log.addComponent(new Position(0, 377));
    log.addComponent(new Rendered());
    log.addComponent(new Sprite(TEXTURES.LOG_LEFT));
    this.world.addEntity(log);

    var log = new CES.Entity();
    log.addComponent(new Dimension(CONFIG.LOG_WIDTH, CONFIG.LOG_HEIGHT));
    log.addComponent(new Position(0, 277));
    log.addComponent(new Rendered());
    log.addComponent(new Sprite(TEXTURES.LOG_SPACER));
    this.world.addEntity(log);

    var log = new CES.Entity();
    log.addComponent(new Dimension(CONFIG.LOG_WIDTH, CONFIG.LOG_HEIGHT));
    log.addComponent(new Position(0, 177));
    log.addComponent(new Rendered());
    log.addComponent(new Sprite(TEXTURES.LOG_RIGHT));
    this.world.addEntity(log);

    var log = new CES.Entity();
    log.addComponent(new Dimension(CONFIG.LOG_WIDTH, CONFIG.LOG_HEIGHT));
    log.addComponent(new Position(0, 77));
    log.addComponent(new Rendered());
    log.addComponent(new Sprite(TEXTURES.LOG_RIGHT));
    this.world.addEntity(log);

    var log = new CES.Entity();
    log.addComponent(new Dimension(CONFIG.LOG_WIDTH, CONFIG.LOG_HEIGHT));
    log.addComponent(new Position(0, -23));
    log.addComponent(new Rendered());
    log.addComponent(new Sprite(TEXTURES.LOG_SPACER));
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
    if(CONFIG.STATS_ENABLED) {
      this.stats.begin();
    }

    // Do game stuff
    var currentFrame = new Date().getTime();
    this.world.update(currentFrame - this.lastFrame);
    this.lastFrame = currentFrame;

    // Increment frame counter
    this.frameCount++;

    // Optional frame statistics
    if(CONFIG.STATS_ENABLED) {
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

// Initialize game
var timberMan = new TimberMan(document.getElementById('timberman'));
