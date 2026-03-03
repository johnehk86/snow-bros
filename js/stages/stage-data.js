import { GAME_WIDTH, GAME_HEIGHT, PLATFORM_TILE_SIZE as T } from '../utils/constants.js';

/**
 * Stage format:
 * - platforms: Array of {x, y, w, h} - one-way platforms
 * - walls: Array of {x, y, w, h} - solid walls (side barriers)
 * - enemies: Array of {x, y, type}
 * - playerSpawn: {x, y}
 */

// Helper to create a platform from tile coords
function plat(tx, ty, tw) {
    return { x: tx * T, y: ty * T, w: tw * T, h: T };
}

// Side walls (present in most stages)
function sideWalls() {
    return [
        { x: -8, y: 0, w: 8, h: GAME_HEIGHT },  // left wall
        { x: GAME_WIDTH, y: 0, w: 8, h: GAME_HEIGHT }, // right wall
    ];
}

// Floor
function floor() {
    return { x: 0, y: GAME_HEIGHT - T, w: GAME_WIDTH, h: T };
}

export const STAGES = [
    // Stage 1: Simple introduction
    {
        platforms: [
            floor(),
            plat(4, 24, 8),    // low left
            plat(20, 24, 8),   // low right
            plat(8, 19, 16),   // middle
            plat(2, 14, 10),   // upper left
            plat(20, 14, 10),  // upper right
            plat(10, 9, 12),   // top center
        ],
        walls: sideWalls(),
        enemies: [
            { x: 100, y: 120, type: 'goblin' },
            { x: 180, y: 60, type: 'goblin' },
            { x: 140, y: 180, type: 'goblin' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#1a1a2e',
    },

    // Stage 2: More platforms
    {
        platforms: [
            floor(),
            plat(0, 25, 10),
            plat(22, 25, 10),
            plat(6, 20, 20),
            plat(0, 15, 12),
            plat(20, 15, 12),
            plat(8, 10, 16),
            plat(3, 5, 8),
            plat(21, 5, 8),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 60, y: 100, type: 'goblin' },
            { x: 180, y: 100, type: 'goblin' },
            { x: 120, y: 30, type: 'goblin' },
            { x: 40, y: 180, type: 'goblin' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#1e1e3a',
    },

    // Stage 3: Zigzag
    {
        platforms: [
            floor(),
            plat(0, 25, 14),
            plat(18, 22, 14),
            plat(0, 18, 14),
            plat(18, 15, 14),
            plat(0, 11, 14),
            plat(18, 8, 14),
            plat(8, 4, 16),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 50, y: 60, type: 'goblin' },
            { x: 200, y: 100, type: 'goblin' },
            { x: 50, y: 140, type: 'goblin' },
            { x: 200, y: 160, type: 'goblin' },
            { x: 120, y: 20, type: 'goblin' },
        ],
        playerSpawn: { x: 30, y: GAME_HEIGHT - T - 20 },
        bgColor: '#221a2e',
    },

    // Stage 4: Castle walls
    {
        platforms: [
            floor(),
            plat(2, 26, 6),
            plat(12, 26, 8),
            plat(24, 26, 6),
            plat(0, 21, 10),
            plat(22, 21, 10),
            plat(8, 17, 16),
            plat(0, 13, 8),
            plat(24, 13, 8),
            plat(10, 9, 12),
            plat(4, 5, 24),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 40, y: 80, type: 'goblin' },
            { x: 200, y: 80, type: 'goblin' },
            { x: 120, y: 130, type: 'demon' },
            { x: 80, y: 30, type: 'goblin' },
            { x: 180, y: 30, type: 'goblin' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#2e1a1a',
    },

    // Stage 5: Open arena
    {
        platforms: [
            floor(),
            plat(3, 25, 6),
            plat(23, 25, 6),
            plat(10, 22, 12),
            plat(0, 17, 8),
            plat(24, 17, 8),
            plat(6, 13, 20),
            plat(0, 9, 6),
            plat(26, 9, 6),
            plat(10, 5, 12),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 50, y: 60, type: 'demon' },
            { x: 200, y: 60, type: 'demon' },
            { x: 120, y: 100, type: 'goblin' },
            { x: 80, y: 170, type: 'goblin' },
            { x: 160, y: 170, type: 'goblin' },
            { x: 120, y: 30, type: 'demon' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#1a2e1a',
    },

    // Stage 6: Narrow corridors
    {
        platforms: [
            floor(),
            plat(4, 26, 24),
            plat(0, 22, 12),
            plat(20, 22, 12),
            plat(6, 18, 20),
            plat(0, 14, 10),
            plat(22, 14, 10),
            plat(8, 10, 16),
            plat(2, 6, 28),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 40, y: 40, type: 'goblin' },
            { x: 200, y: 40, type: 'goblin' },
            { x: 80, y: 80, type: 'demon' },
            { x: 160, y: 140, type: 'demon' },
            { x: 120, y: 170, type: 'flame' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#2e2e1a',
    },

    // Stage 7: Steps
    {
        platforms: [
            floor(),
            plat(0, 26, 8),
            plat(5, 23, 8),
            plat(10, 20, 8),
            plat(15, 17, 8),
            plat(20, 14, 8),
            plat(15, 11, 8),
            plat(10, 8, 8),
            plat(5, 5, 8),
            plat(12, 3, 8),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 80, y: 30, type: 'goblin' },
            { x: 160, y: 60, type: 'demon' },
            { x: 120, y: 100, type: 'goblin' },
            { x: 200, y: 100, type: 'flame' },
            { x: 50, y: 170, type: 'goblin' },
            { x: 100, y: 150, type: 'goblin' },
        ],
        playerSpawn: { x: 30, y: GAME_HEIGHT - T - 20 },
        bgColor: '#1a1a3e',
    },

    // Stage 8: Twin towers
    {
        platforms: [
            floor(),
            plat(0, 25, 6),
            plat(12, 25, 8),
            plat(26, 25, 6),
            plat(0, 20, 8),
            plat(24, 20, 8),
            plat(0, 15, 8),
            plat(24, 15, 8),
            plat(10, 17, 12),
            plat(0, 10, 8),
            plat(24, 10, 8),
            plat(8, 7, 16),
            plat(10, 3, 12),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 30, y: 60, type: 'demon' },
            { x: 210, y: 60, type: 'demon' },
            { x: 30, y: 120, type: 'goblin' },
            { x: 210, y: 120, type: 'goblin' },
            { x: 120, y: 130, type: 'flame' },
            { x: 120, y: 20, type: 'demon' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#2a1a2e',
    },

    // Stage 9: The gauntlet
    {
        platforms: [
            floor(),
            plat(2, 27, 28),
            plat(4, 23, 6),
            plat(14, 23, 6),
            plat(24, 23, 6),
            plat(0, 19, 6),
            plat(10, 19, 12),
            plat(26, 19, 6),
            plat(4, 15, 8),
            plat(20, 15, 8),
            plat(8, 11, 16),
            plat(2, 7, 8),
            plat(22, 7, 8),
            plat(10, 3, 12),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 40, y: 50, type: 'flame' },
            { x: 200, y: 50, type: 'flame' },
            { x: 100, y: 80, type: 'demon' },
            { x: 160, y: 80, type: 'demon' },
            { x: 50, y: 150, type: 'goblin' },
            { x: 130, y: 150, type: 'goblin' },
            { x: 210, y: 150, type: 'goblin' },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#1e2a1e',
    },

    // Stage 10: Boss arena (placeholder layout)
    {
        platforms: [
            floor(),
            plat(0, 25, 32),
            plat(4, 19, 8),
            plat(20, 19, 8),
            plat(8, 13, 16),
            plat(2, 7, 10),
            plat(20, 7, 10),
        ],
        walls: sideWalls(),
        enemies: [
            { x: 120, y: 100, type: 'goblin', boss: true },
        ],
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor: '#2e0a0a',
        isBoss: true,
    },
];

// Seeded random for reproducible procedural stages
function seededRandom(seed) {
    let s = seed;
    return function() {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        return s / 0x7fffffff;
    };
}

// Platform layout templates for procedural generation
const LAYOUT_TEMPLATES = [
    // Symmetric
    (rand, rows) => {
        const platforms = [];
        for (let row = 0; row < rows; row++) {
            const y = 5 + row * 4;
            const tw = 6 + Math.floor(rand() * 8);
            const gap = Math.floor(rand() * 8);
            platforms.push(plat(gap, y, tw));
            platforms.push(plat(32 - gap - tw, y, tw));
        }
        return platforms;
    },
    // Staircase
    (rand, rows) => {
        const platforms = [];
        const dir = rand() < 0.5 ? 1 : -1;
        for (let row = 0; row < rows; row++) {
            const y = 5 + row * 4;
            const tw = 8 + Math.floor(rand() * 6);
            const tx = dir > 0
                ? Math.floor(row * (32 - tw) / rows)
                : Math.floor((rows - row) * (32 - tw) / rows);
            platforms.push(plat(tx, y, tw));
        }
        return platforms;
    },
    // Zigzag corridors
    (rand, rows) => {
        const platforms = [];
        for (let row = 0; row < rows; row++) {
            const y = 5 + row * 4;
            const tw = 10 + Math.floor(rand() * 8);
            const tx = row % 2 === 0 ? 0 : 32 - tw;
            platforms.push(plat(tx, y, tw));
        }
        return platforms;
    },
    // Scattered
    (rand, rows) => {
        const platforms = [];
        for (let row = 0; row < rows; row++) {
            const y = 5 + row * 4;
            const count = 1 + Math.floor(rand() * 2);
            for (let i = 0; i < count; i++) {
                const tw = 5 + Math.floor(rand() * 10);
                const tx = Math.floor(rand() * (32 - tw));
                platforms.push(plat(tx, y, tw));
            }
        }
        return platforms;
    },
];

/**
 * Generate stage data for any stage number.
 */
export function generateStage(stageNum) {
    // Use handcrafted stages for 1-10
    if (stageNum <= STAGES.length) {
        return STAGES[stageNum - 1];
    }

    // Boss stages
    const isBoss = stageNum % 10 === 0;

    // Seeded random for consistency
    const rand = seededRandom(stageNum * 7919);
    const difficulty = Math.min(stageNum / 50, 1);

    // Generate platforms
    const rows = 5 + Math.floor(difficulty * 2);
    const templateIdx = Math.floor(rand() * LAYOUT_TEMPLATES.length);
    const genPlatforms = LAYOUT_TEMPLATES[templateIdx](rand, rows);
    const platforms = [floor(), ...genPlatforms];

    // Generate enemies
    const enemyCount = isBoss ? 1 : Math.min(3 + Math.floor(stageNum / 3), 10);
    const enemies = [];
    const types = ['goblin', 'goblin', 'demon'];
    if (stageNum > 5) types.push('flame');
    if (stageNum > 15) types.push('sumo');
    if (stageNum > 25) types.push('tornado');

    for (let i = 0; i < enemyCount; i++) {
        const type = types[Math.floor(rand() * types.length)];
        // Place enemies on platforms
        const platIdx = Math.floor(rand() * genPlatforms.length);
        const p = genPlatforms[platIdx] || { x: 60, y: 180 };
        enemies.push({
            x: p.x + rand() * Math.max(p.w - 16, 8),
            y: p.y - 22,
            type,
            boss: isBoss && i === 0,
        });
    }

    // Background color based on stage "world" (every 10 stages)
    const world = Math.floor((stageNum - 1) / 10);
    const bgColors = [
        '#1a1a2e', '#2e1a1a', '#1a2e1a', '#2e2e1a', '#1a1a3e',
    ];
    const bgColor = bgColors[world % bgColors.length];

    return {
        platforms,
        walls: sideWalls(),
        enemies,
        playerSpawn: { x: 120, y: GAME_HEIGHT - T - 20 },
        bgColor,
        isBoss,
    };
}
