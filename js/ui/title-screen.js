import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

export class TitleScreen {
    constructor(renderer) {
        this.renderer = renderer;
        this.blinkTimer = 0;
        this.highScore = parseInt(localStorage.getItem('snowBrosHighScore') || '0', 10);
        this.snowflakes = [];
        this.titleBounce = 0;

        // Generate decorative snowflakes
        for (let i = 0; i < 60; i++) {
            this.snowflakes.push({
                x: Math.random() * GAME_WIDTH,
                y: Math.random() * GAME_HEIGHT,
                speed: 0.2 + Math.random() * 0.6,
                size: 1 + Math.floor(Math.random() * 3),
                wobble: Math.random() * Math.PI * 2,
                brightness: 0.4 + Math.random() * 0.6,
            });
        }
    }

    update() {
        this.blinkTimer++;
        this.titleBounce = Math.sin(this.blinkTimer * 0.05) * 3;

        // Animate snowflakes
        for (const sf of this.snowflakes) {
            sf.y += sf.speed;
            sf.x += Math.sin(sf.wobble) * 0.4;
            sf.wobble += 0.015 + sf.speed * 0.01;
            if (sf.y > GAME_HEIGHT + 4) {
                sf.y = -4;
                sf.x = Math.random() * GAME_WIDTH;
            }
        }
    }

    render() {
        // Gradient background
        this.renderer.clear('#080818');
        for (let y = 0; y < GAME_HEIGHT; y++) {
            const ratio = y / GAME_HEIGHT;
            const r = Math.floor(8 + ratio * 16);
            const g = Math.floor(8 + ratio * 12);
            const b = Math.floor(24 + ratio * 20);
            this.renderer.ctx.globalAlpha = 0.3;
            this.renderer.fillRect(0, y, GAME_WIDTH, 1, `rgb(${r},${g},${b})`);
        }
        this.renderer.ctx.globalAlpha = 1;

        // Snowflakes (behind text)
        for (const sf of this.snowflakes) {
            this.renderer.ctx.globalAlpha = sf.brightness;
            const color = sf.size > 2 ? '#ddeeff' : '#ffffff';
            this.renderer.fillRect(sf.x, sf.y, sf.size, sf.size, color);
        }
        this.renderer.ctx.globalAlpha = 1;

        // Ground snow
        for (let x = 0; x < GAME_WIDTH; x += 2) {
            const h = 3 + Math.floor(Math.sin(x * 0.3) * 2 + Math.cos(x * 0.7) * 1);
            this.renderer.fillRect(x, GAME_HEIGHT - h, 2, h, '#ddeeff');
            this.renderer.fillRect(x, GAME_HEIGHT - h, 1, 1, '#ffffff');
        }

        // Title shadow
        const ty = 40 + this.titleBounce;
        this.renderer.drawText('SNOW BROS', GAME_WIDTH / 2 + 1, ty + 1, '#000044', 16, 'center');
        // Title main
        this.renderer.drawText('SNOW BROS', GAME_WIDTH / 2, ty, '#66ccff', 16, 'center');

        // Subtitle
        this.renderer.drawText('Nick & Tom', GAME_WIDTH / 2, ty + 22, '#aaddff', 8, 'center');
        this.renderer.drawText('~ REMAKE ~', GAME_WIDTH / 2, ty + 36, '#556688', 8, 'center');

        // Decorative snowflakes around title
        const sparkle = this.blinkTimer % 20 < 10;
        if (sparkle) {
            this.renderer.fillRect(48, ty + 4, 2, 2, '#ffffff');
            this.renderer.fillRect(200, ty + 8, 2, 2, '#ffffff');
        }

        // Controls box
        const boxY = 115;
        this.renderer.ctx.globalAlpha = 0.2;
        this.renderer.fillRect(50, boxY - 4, GAME_WIDTH - 100, 60, '#ffffff');
        this.renderer.ctx.globalAlpha = 1;

        this.renderer.drawText('HOW TO PLAY', GAME_WIDTH / 2, boxY, '#aaccee', 8, 'center');
        this.renderer.drawText('\u2190\u2192  Move    \u2193 Drop', GAME_WIDTH / 2, boxY + 14, '#8899bb', 8, 'center');
        this.renderer.drawText('Z  Jump    X  Snow', GAME_WIDTH / 2, boxY + 27, '#8899bb', 8, 'center');
        this.renderer.drawText('Enter  Start/Pause', GAME_WIDTH / 2, boxY + 40, '#8899bb', 8, 'center');

        // High score
        if (this.highScore > 0) {
            this.renderer.drawText(`HI-SCORE  ${String(this.highScore).padStart(8, '0')}`, GAME_WIDTH / 2, 185, '#ffcc44', 8, 'center');
        }

        // Blink "Press Enter"
        const blinkPhase = this.blinkTimer % 80;
        if (blinkPhase < 55) {
            this.renderer.drawText('PRESS ENTER TO START', GAME_WIDTH / 2, 204, '#ffff88', 8, 'center');
        }

        // Credits
        this.renderer.drawText('Original \u00A9 Toaplan 1990', GAME_WIDTH / 2, GAME_HEIGHT - 14, '#334466', 8, 'center');
    }
}
