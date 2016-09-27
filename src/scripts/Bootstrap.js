// Create global namespace
var TM = {};
TM.Components = {};
TM.Systems = {};

// Game Configuration
TM.CONFIG = {
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
TM.TEXTURES = {
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
TM.ANIMATIONS = {
  PLAYER_LEFT_IDLE: {
    frames: [
      TM.TEXTURES.PLAYER_LEFT_IDLE,
      TM.TEXTURES.PLAYER_LEFT_IDLE_2,
    ],
    rate: 30
  },
  PLAYER_LEFT_CHOP: {
    frames: [
      TM.TEXTURES.PLAYER_LEFT_CHOP,
      TM.TEXTURES.PLAYER_LEFT_IDLE,
    ],
    rate: 7
  },
  PLAYER_RIGHT_IDLE: {
    frames: [
      TM.TEXTURES.PLAYER_RIGHT_IDLE,
      TM.TEXTURES.PLAYER_RIGHT_IDLE_2,
    ],
    rate: 30
  },
  PLAYER_RIGHT_CHOP: {
    frames: [
      TM.TEXTURES.PLAYER_RIGHT_CHOP,
      TM.TEXTURES.PLAYER_RIGHT_IDLE
    ],
    rate: 7
  }
};
