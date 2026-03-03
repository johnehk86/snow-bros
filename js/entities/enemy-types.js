/**
 * Enemy type configurations.
 * These augment the base Enemy class with type-specific behaviors.
 */

export const ENEMY_CONFIGS = {
    goblin: {
        speed: 0.8,
        jumpForce: -4.5,
        color: '#ff4444',
        hp: 1,
        score: 500,
        behavior: 'patrol', // simple patrol + chase
        canJump: true,
        jumpChance: 0.02,
    },
    demon: {
        speed: 1.0,
        jumpForce: -5.0,
        color: '#aa44ff',
        hp: 1,
        score: 700,
        behavior: 'aggressive', // more aggressive chase
        canJump: true,
        jumpChance: 0.04,
    },
    flame: {
        speed: 0.65,
        jumpForce: -4.0,
        color: '#ff8800',
        hp: 1,
        score: 800,
        behavior: 'ranged', // can shoot fireballs (visual only for now)
        canJump: true,
        jumpChance: 0.01,
        attackRange: 100,
    },
    sumo: {
        speed: 0.5,
        jumpForce: -3.5,
        color: '#ffcc44',
        hp: 2,
        score: 1000,
        behavior: 'tank', // slow but takes 2 hits more snow
        canJump: false,
        jumpChance: 0,
        width: 20,
        height: 22,
    },
    tornado: {
        speed: 1.3,
        jumpForce: -5.5,
        color: '#44ffff',
        hp: 1,
        score: 900,
        behavior: 'erratic', // random direction changes
        canJump: true,
        jumpChance: 0.06,
        dirChangeChance: 0.03,
    },
};

/**
 * Get difficulty-adjusted enemy count for a stage.
 */
export function getEnemyCountForStage(stageNum) {
    return Math.min(3 + Math.floor(stageNum / 2), 12);
}

/**
 * Get available enemy types for a given stage.
 */
export function getAvailableTypes(stageNum) {
    const types = ['goblin'];
    if (stageNum >= 4) types.push('demon');
    if (stageNum >= 7) types.push('flame');
    if (stageNum >= 12) types.push('sumo');
    if (stageNum >= 18) types.push('tornado');
    return types;
}
