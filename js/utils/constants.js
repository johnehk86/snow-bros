// Native resolution (original arcade)
export const GAME_WIDTH = 256;
export const GAME_HEIGHT = 240;

// Physics
export const GRAVITY = 0.35;
export const MAX_FALL_SPEED = 6;
export const FRICTION = 0.85;

// Player
export const PLAYER_SPEED = 1.8;
export const PLAYER_JUMP_FORCE = -5.8;
export const PLAYER_WIDTH = 16;
export const PLAYER_HEIGHT = 20;
export const PLAYER_MAX_LIVES = 3;

// Snow projectile
export const SNOW_SPEED = 4;
export const SNOW_WIDTH = 8;
export const SNOW_HEIGHT = 8;
export const SNOW_LIFETIME = 30; // frames
export const SNOW_HIT_AMOUNT = 1;

// Snowball
export const SNOWBALL_SPEED = 3;
export const SNOWBALL_WIDTH = 16;
export const SNOWBALL_HEIGHT = 16;

// Enemy
export const ENEMY_WIDTH = 16;
export const ENEMY_HEIGHT = 20;
export const ENEMY_SPEED = 0.8;
export const ENEMY_JUMP_FORCE = -4.5;
export const SNOW_LEVELS = 5; // 0-4, 4 = fully frozen
export const SNOW_MELT_RATE = 0.008; // per frame
export const ENEMY_ATTACK_RANGE = 60;
export const ENEMY_CHASE_RANGE = 80;

// Items
export const ITEM_WIDTH = 12;
export const ITEM_HEIGHT = 12;
export const ITEM_GRAVITY = 0.2;
export const ITEM_LIFETIME = 600; // frames (10 seconds)

// Scoring
export const SCORE_ENEMY_KILL = 500;
export const SCORE_CHAIN_BONUS = [0, 500, 1000, 2000, 5000, 10000];

// Stage
export const PLATFORM_TILE_SIZE = 8;
export const STAGE_CLEAR_DELAY = 120; // frames

// Timing
export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;

// Game states
export const STATE_TITLE = 'TITLE';
export const STATE_PLAYING = 'PLAYING';
export const STATE_STAGE_CLEAR = 'STAGE_CLEAR';
export const STATE_GAME_OVER = 'GAME_OVER';
export const STATE_PAUSED = 'PAUSED';

// Colors
export const COLORS = {
    PLAYER: '#4488ff',
    PLAYER2: '#44ff88',
    ENEMY_GOBLIN: '#ff4444',
    ENEMY_DEMON: '#aa44ff',
    ENEMY_FLAME: '#ff8800',
    ENEMY_SUMO: '#ffcc44',
    ENEMY_TORNADO: '#44ffff',
    SNOW: '#ffffff',
    SNOWBALL: '#ddddff',
    PLATFORM: '#886644',
    BACKGROUND: '#1a1a2e',
    HUD_TEXT: '#ffffff',
    ITEM_RED: '#ff4444',
    ITEM_BLUE: '#4444ff',
    ITEM_YELLOW: '#ffff44',
    ITEM_GREEN: '#44ff44',
};
