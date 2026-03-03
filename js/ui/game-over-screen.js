import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

export class GameOverScreen {
    constructor(renderer) {
        this.renderer = renderer;
        this.timer = 0;
        this.finalScore = 0;
        this.stageReached = 0;
    }

    show(score, stage) {
        this.timer = 0;
        this.finalScore = score;
        this.stageReached = stage;
    }

    update() {
        this.timer++;
    }

    canContinue() {
        return this.timer > 60; // wait 1 second before allowing input
    }

    render() {
        this.renderer.clear('#0a0000');

        this.renderer.drawText('GAME OVER', GAME_WIDTH / 2, 50, '#ff4444', 16, 'center');

        this.renderer.drawText(`FINAL SCORE: ${String(this.finalScore).padStart(8, '0')}`, GAME_WIDTH / 2, 90, '#ffffff', 8, 'center');
        this.renderer.drawText(`STAGE REACHED: ${this.stageReached}`, GAME_WIDTH / 2, 108, '#aaaaaa', 8, 'center');

        // High score
        const highScore = parseInt(localStorage.getItem('snowBrosHighScore') || '0', 10);
        this.renderer.drawText(`HI-SCORE: ${String(highScore).padStart(8, '0')}`, GAME_WIDTH / 2, 130, '#ffcc44', 8, 'center');

        if (this.finalScore >= highScore && this.finalScore > 0) {
            this.renderer.drawText('NEW HIGH SCORE!', GAME_WIDTH / 2, 150, '#ff88ff', 8, 'center');
        }

        if (this.canContinue() && this.timer % 60 < 40) {
            this.renderer.drawText('PRESS ENTER TO CONTINUE', GAME_WIDTH / 2, 185, '#ffff88', 8, 'center');
        }
    }
}
