import { GAME_WIDTH } from '../utils/constants.js';

export class HUD {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render(player, stageNum, boss = null) {
        // Top bar background
        this.renderer.ctx.globalAlpha = 0.4;
        this.renderer.fillRect(0, 0, GAME_WIDTH, 22, '#000000');
        this.renderer.ctx.globalAlpha = 1;

        // Score
        this.renderer.drawText(`${String(player.score).padStart(8, '0')}`, 4, 2, '#ffffff', 8);

        // Stage number
        this.renderer.drawText(`ST.${String(stageNum).padStart(2, '0')}`, GAME_WIDTH - 36, 2, '#ffff88', 8);

        // Lives
        for (let i = 0; i < player.lives; i++) {
            const lx = 4 + i * 10;
            const ly = 12;
            // Mini player icon
            this.renderer.fillRect(lx, ly, 7, 8, '#4488ff');
            this.renderer.fillRect(lx + 1, ly, 5, 2, '#aaddff');
        }

        // Power-up indicators with labels
        let indicatorX = GAME_WIDTH - 4;
        if (player.invincible > 0) {
            indicatorX -= 10;
            this.renderer.fillRect(indicatorX, 13, 8, 7, '#44ff44');
            this.renderer.drawText('I', indicatorX + 2, 13, '#000', 7);
        }
        if (player.rangeBoost > 0) {
            indicatorX -= 10;
            this.renderer.fillRect(indicatorX, 13, 8, 7, '#ffff44');
            this.renderer.drawText('R', indicatorX + 2, 13, '#000', 7);
        }
        if (player.snowPower > 0) {
            indicatorX -= 10;
            this.renderer.fillRect(indicatorX, 13, 8, 7, '#4444ff');
            this.renderer.drawText('P', indicatorX + 2, 13, '#fff', 7);
        }
        if (player.speedBoost > 0) {
            indicatorX -= 10;
            this.renderer.fillRect(indicatorX, 13, 8, 7, '#ff4444');
            this.renderer.drawText('S', indicatorX + 2, 13, '#fff', 7);
        }

        // Boss name display
        if (boss && boss.active) {
            this.renderer.drawText(boss.name, GAME_WIDTH / 2, 26, '#ff8888', 8, 'center');
        }
    }
}
