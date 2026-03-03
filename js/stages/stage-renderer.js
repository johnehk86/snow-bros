import { COLORS, GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

export class StageRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.bgCache = null;
        this.bgCacheKey = null;
    }

    render(stage) {
        const bg = stage.bgColor || COLORS.BACKGROUND;
        this.drawBackground(bg);
        this.drawSideWalls();

        // Draw platforms
        for (const plat of stage.platforms) {
            this.drawPlatform(plat);
        }
    }

    drawBackground(bgColor) {
        this.renderer.clear(bgColor);

        // Stars / sparkle dots in background
        this.renderer.ctx.globalAlpha = 0.12;
        for (let i = 0; i < 60; i++) {
            // Seeded positions for consistent pattern
            const x = (i * 137 + 23) % GAME_WIDTH;
            const y = (i * 97 + 41) % GAME_HEIGHT;
            const size = (i % 3 === 0) ? 2 : 1;
            this.renderer.fillRect(x, y, size, size, '#ffffff');
        }

        // Subtle gradient overlay (darker at top)
        this.renderer.ctx.globalAlpha = 0.15;
        for (let y = 0; y < 40; y++) {
            this.renderer.fillRect(0, y, GAME_WIDTH, 1, '#000000');
        }

        // Subtle lighter at bottom
        this.renderer.ctx.globalAlpha = 0.06;
        for (let y = GAME_HEIGHT - 30; y < GAME_HEIGHT; y++) {
            this.renderer.fillRect(0, y, GAME_WIDTH, 1, '#ffffff');
        }

        this.renderer.ctx.globalAlpha = 1;
    }

    drawSideWalls() {
        // Left wall - stone/brick pattern
        for (let y = 0; y < GAME_HEIGHT; y += 8) {
            const shade = (y % 16 < 8) ? '#3a2a1a' : '#342418';
            this.renderer.fillRect(0, y, 2, 8, shade);
            this.renderer.fillRect(0, y, 1, 8, '#4a3a2a');
        }
        // Right wall
        for (let y = 0; y < GAME_HEIGHT; y += 8) {
            const shade = (y % 16 < 8) ? '#3a2a1a' : '#342418';
            this.renderer.fillRect(GAME_WIDTH - 2, y, 2, 8, shade);
            this.renderer.fillRect(GAME_WIDTH - 1, y, 1, 8, '#2a1a0a');
        }
    }

    drawPlatform(plat) {
        const x = plat.x;
        const y = plat.y;
        const w = plat.w;
        const h = plat.h;

        // Main brick body
        this.renderer.fillRect(x, y, w, h, '#886644');

        // Top surface - smooth snow/ice highlight
        this.renderer.fillRect(x, y, w, 1, '#ccbb99');
        this.renderer.fillRect(x + 1, y, w - 2, 1, '#ddccaa');

        // Second row - lighter
        if (h > 2) {
            this.renderer.fillRect(x, y + 1, w, 1, '#aa9966');
        }

        // Bottom shadow edge
        this.renderer.fillRect(x, y + h - 1, w, 1, '#553311');

        // Brick pattern with alternating offset
        const brickW = 8;
        const brickH = h;
        for (let bx = x; bx < x + w; bx += brickW) {
            // Vertical mortar lines
            this.renderer.fillRect(bx, y + 1, 1, brickH - 1, '#6a4e2e');
        }

        // Snow cap on platforms
        for (let sx = x; sx < x + w; sx += 2) {
            const seed = Math.sin(sx * 1.5) * 0.5 + 0.5;
            const snowH = seed > 0.3 ? 2 : 1;
            const snowW = seed > 0.6 ? 3 : 2;
            this.renderer.fillRect(sx, y - snowH, snowW, snowH, '#e8f0ff');
            if (seed > 0.5) {
                this.renderer.fillRect(sx, y - snowH, 1, snowH, '#ffffff');
            }
        }

        // Icicles hanging from some platforms (decorative)
        if (h >= 8) {
            for (let ix = x + 3; ix < x + w - 3; ix += 7) {
                const iceLen = 2 + Math.floor(Math.sin(ix) * 1.5 + 1.5);
                for (let iy = 0; iy < iceLen; iy++) {
                    const alpha = 1 - iy / iceLen;
                    this.renderer.ctx.globalAlpha = alpha * 0.6;
                    this.renderer.fillRect(ix, y + h + iy, 1, 1, '#aaccee');
                }
                this.renderer.ctx.globalAlpha = 1;
            }
        }
    }
}
