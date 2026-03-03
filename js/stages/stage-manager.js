import { STAGES, generateStage } from './stage-data.js';
import { Enemy } from '../entities/enemy.js';
import { STAGE_CLEAR_DELAY } from '../utils/constants.js';

export class StageManager {
    constructor() {
        this.currentStageNum = 1;
        this.stage = null;
        this.enemies = [];
        this.clearTimer = 0;
        this.isClearing = false;
        this.stageReady = false;
    }

    loadStage(stageNum) {
        this.currentStageNum = stageNum;
        this.stage = generateStage(stageNum);
        this.enemies = [];
        this.isClearing = false;
        this.clearTimer = 0;
        this.stageReady = true;

        // Spawn enemies
        for (const enemyData of this.stage.enemies) {
            const enemy = new Enemy(enemyData.x, enemyData.y, enemyData.type);
            this.enemies.push(enemy);
        }

        return this.stage;
    }

    getPlayerSpawn() {
        return this.stage ? this.stage.playerSpawn : { x: 120, y: 200 };
    }

    getPlatforms() {
        return this.stage ? this.stage.platforms : [];
    }

    getWalls() {
        return this.stage ? this.stage.walls : [];
    }

    getActiveEnemies() {
        return this.enemies.filter(e => e.active);
    }

    checkClear() {
        if (this.isClearing) {
            this.clearTimer--;
            return this.clearTimer <= 0;
        }

        // Check if all enemies are defeated
        const activeEnemies = this.getActiveEnemies();
        if (activeEnemies.length === 0 && this.stageReady) {
            this.isClearing = true;
            this.clearTimer = STAGE_CLEAR_DELAY;
            return false;
        }

        return false;
    }

    nextStage() {
        return this.currentStageNum + 1;
    }
}
