import {
    STATE_TITLE, STATE_PLAYING, STATE_STAGE_CLEAR, STATE_GAME_OVER, STATE_PAUSED,
    SCORE_ENEMY_KILL, SCORE_CHAIN_BONUS, SNOW_HIT_AMOUNT, GAME_WIDTH
} from './utils/constants.js';
import { Player } from './entities/player.js';
import { Enemy } from './entities/enemy.js';
import { Boss } from './entities/boss.js';
import { SnowProjectile } from './entities/snow-projectile.js';
import { Snowball } from './entities/snowball.js';
import { Item, ITEM_TYPES } from './entities/item.js';
import { ParticleSystem } from './entities/particle.js';
import { StageManager } from './stages/stage-manager.js';
import { StageRenderer } from './stages/stage-renderer.js';
import { HUD } from './ui/hud.js';
import { TitleScreen } from './ui/title-screen.js';
import { GameOverScreen } from './ui/game-over-screen.js';
import { AudioManager } from './audio/audio-manager.js';
import { AdManager } from './ui/ad-manager.js';
import { aabb } from './collision.js';
import { SpriteRenderer } from './sprites/sprite-renderer.js';
import { PLAYER_SPRITES } from './sprites/player-sprites.js';
import { ENEMY_SPRITES, FROZEN_SPRITE } from './sprites/enemy-sprites.js';
import { ITEM_SPRITES } from './sprites/item-sprites.js';
import { SNOW_PROJECTILE_SPRITES, SNOWBALL_SPRITES } from './sprites/effects-sprites.js';

export class Game {
    constructor(renderer, input) {
        this.renderer = renderer;
        this.input = input;

        // Subsystems
        this.stageManager = new StageManager();
        this.stageRenderer = new StageRenderer(renderer);
        this.hud = new HUD(renderer);
        this.titleScreen = new TitleScreen(renderer);
        this.gameOverScreen = new GameOverScreen(renderer);
        this.audio = new AudioManager();
        this.adManager = new AdManager();
        this.particles = new ParticleSystem();

        // Sprite system
        this.sprites = new SpriteRenderer();
        this.initSprites();

        // Game state
        this.state = STATE_TITLE;
        this.player = null;
        this.snowProjectiles = [];
        this.snowballs = [];
        this.items = [];
        this.boss = null;

        // High score
        this.highScore = parseInt(localStorage.getItem('snowBrosHighScore') || '0', 10);

        // Stage clear animation
        this.stageClearTimer = 0;

        // Ad interstitial waiting flag
        this.waitingForAd = false;
    }

    initSprites() {
        // Player sprites
        for (const [key, pixels] of Object.entries(PLAYER_SPRITES)) {
            this.sprites.create(`player_${key}`, pixels);
            this.sprites.createFlipped(`player_${key}`);
        }

        // Enemy sprites
        for (const [key, pixels] of Object.entries(ENEMY_SPRITES)) {
            this.sprites.create(`enemy_${key}`, pixels);
            this.sprites.createFlipped(`enemy_${key}`);
        }

        // Frozen sprite
        this.sprites.create('frozen', FROZEN_SPRITE);

        // Item sprites
        for (const [key, pixels] of Object.entries(ITEM_SPRITES)) {
            this.sprites.create(`item_${key}`, pixels);
        }

        // Effect sprites
        for (const [key, pixels] of Object.entries(SNOW_PROJECTILE_SPRITES)) {
            this.sprites.create(`fx_${key}`, pixels);
        }
        for (const [key, pixels] of Object.entries(SNOWBALL_SPRITES)) {
            this.sprites.create(`fx_${key}`, pixels);
        }
    }

    update() {
        switch (this.state) {
            case STATE_TITLE:
                this.updateTitle();
                break;
            case STATE_PLAYING:
                this.updatePlaying();
                break;
            case STATE_STAGE_CLEAR:
                this.updateStageClear();
                break;
            case STATE_GAME_OVER:
                this.updateGameOver();
                break;
            case STATE_PAUSED:
                this.updatePaused();
                break;
        }

        this.input.update();
    }

    render() {
        switch (this.state) {
            case STATE_TITLE:
                this.titleScreen.render();
                break;
            case STATE_PLAYING:
            case STATE_PAUSED:
                this.renderPlaying();
                if (this.state === STATE_PAUSED) {
                    this.renderer.drawText('PAUSED', 128, 110, '#ffff44', 16, 'center');
                }
                break;
            case STATE_STAGE_CLEAR:
                this.renderPlaying();
                this.renderStageClear();
                break;
            case STATE_GAME_OVER:
                this.gameOverScreen.render();
                break;
        }
    }

    // --- Title ---
    updateTitle() {
        this.titleScreen.update();
        if (this.input.start) {
            this.startGame();
        }
    }

    // --- Start game ---
    startGame() {
        this.audio.init();
        this.state = STATE_PLAYING;
        this.player = new Player(0, 0);
        this.snowProjectiles = [];
        this.snowballs = [];
        this.items = [];
        this.particles.clear();
        this.loadStage(1);
    }

    loadStage(num) {
        const stage = this.stageManager.loadStage(num);
        const spawn = this.stageManager.getPlayerSpawn();
        this.player.x = spawn.x;
        this.player.y = spawn.y;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.dead = false;
        this.snowProjectiles = [];
        this.snowballs = [];
        this.items = [];
        this.particles.clear();
        this.boss = null;

        // Spawn boss on boss stages
        if (stage.isBoss) {
            const bossNum = Math.floor(num / 10);
            this.boss = new Boss(GAME_WIDTH / 2 - 16, 80, bossNum);
        }
    }

    // --- Playing ---
    updatePlaying() {
        const platforms = this.stageManager.getPlatforms();
        const walls = this.stageManager.getWalls();

        // Pause
        if (this.input.start) {
            this.state = STATE_PAUSED;
            return;
        }

        // Update player
        const wasDead = this.player.dead;
        this.player.update(this.input, platforms, walls);

        // Reposition on respawn
        if (wasDead && !this.player.dead) {
            const spawn = this.stageManager.getPlayerSpawn();
            this.player.x = spawn.x;
            this.player.y = spawn.y;
        }

        // Shooting: X released → fire (charge level depends on hold duration)
        if (this.input.shootReleased && this.player.charging) {
            const level = this.player.chargeLevel;
            this.shootSnow(level);
            this.player.fireCharged();
        }

        // Update snow projectiles
        this.updateSnowProjectiles(platforms);

        // Update enemies
        this.updateEnemies(platforms, walls);

        // Update boss
        this.updateBoss(platforms, walls);

        // Update snowballs
        this.updateSnowballs(platforms, walls);

        // Update items
        this.updateItems(platforms);

        // Update particles
        this.particles.update();

        // Player-enemy collision
        this.checkPlayerEnemyCollision();

        // Player-boss collision
        this.checkPlayerBossCollision();

        // Player-snowball kick
        this.checkPlayerSnowballKick();

        // Player-item pickup
        this.checkPlayerItemPickup();

        // Check stage clear (boss stages: boss must be dead too)
        const bossAlive = this.boss && this.boss.active;
        if (!bossAlive && this.stageManager.checkClear()) {
            this.state = STATE_STAGE_CLEAR;
            this.stageClearTimer = 0;
            this.audio.stageClear();
        }

        // Check game over
        if (this.player.lives <= 0 && this.player.deathTimer <= 0) {
            this.gameOver();
        }
    }

    shootSnow(chargeLevel = 0) {
        const proj = new SnowProjectile(
            this.player.centerX - 4,
            this.player.centerY - 4,
            this.player.facing,
            this.player.snowPower > 0 ? 1 : 0,
            this.player.rangeBoost,
            chargeLevel
        );
        this.snowProjectiles.push(proj);

        // Sound varies by charge level
        if (chargeLevel >= 3) {
            this.audio.playTone(300, 0.15, 'sawtooth', 0.15);
            this.audio.playTone(600, 0.2, 'square', 0.1);
            this.audio.playTone(900, 0.15, 'sine', 0.08);
        } else if (chargeLevel >= 2) {
            this.audio.playTone(400, 0.12, 'square', 0.12);
            this.audio.playTone(700, 0.1, 'sine', 0.08);
        } else if (chargeLevel >= 1) {
            this.audio.playTone(500, 0.1, 'square', 0.1);
            this.audio.shoot();
        } else {
            this.audio.shoot();
        }

        // Screen shake for high-level charge
        if (chargeLevel >= 3) {
            this.particles.emit(
                this.player.centerX, this.player.centerY,
                12, '#ff88ff', 3, 20, 2
            );
        } else if (chargeLevel >= 2) {
            this.particles.emit(
                this.player.centerX, this.player.centerY,
                6, '#88ddff', 2, 15, 2
            );
        }
    }

    updateSnowProjectiles(platforms) {
        for (const proj of this.snowProjectiles) {
            proj.update();
        }
        this.snowProjectiles = this.snowProjectiles.filter(p => p.active);

        // Check snow-enemy collisions
        const enemies = this.stageManager.getActiveEnemies();
        for (const proj of this.snowProjectiles) {
            if (!proj.active) continue;
            for (const enemy of enemies) {
                if (enemy.frozen) continue;
                if (!aabb(proj, enemy)) continue;

                // Apply snow damage (charged shots hit harder)
                const amount = proj.hitAmount || (SNOW_HIT_AMOUNT + proj.power);
                enemy.hitBySnow(amount);

                // Check if projectile should be destroyed or pierce through
                const shouldDestroy = proj.onHitEnemy();
                if (shouldDestroy) {
                    proj.active = false;
                }

                if (enemy.frozen) {
                    this.createSnowball(enemy);
                    this.audio.freeze();
                } else {
                    this.audio.hit();
                }

                // Particles scale with charge level
                const particleCount = 4 + (proj.chargeLevel || 0) * 3;
                const particleColor = proj.color || '#ffffff';
                this.particles.emit(enemy.centerX, enemy.centerY, particleCount, particleColor, 2, 18, 2);

                if (!proj.active) break; // destroyed, stop checking enemies
            }

            // Check snow-boss collision
            if (proj.active && this.boss && this.boss.active) {
                if (aabb(proj, this.boss)) {
                    const amount = proj.hitAmount || (SNOW_HIT_AMOUNT + proj.power);
                    const defeated = this.boss.hitBySnow(amount);
                    const shouldDestroy = proj.onHitEnemy();
                    if (shouldDestroy) proj.active = false;
                    const pCount = 6 + (proj.chargeLevel || 0) * 4;
                    this.particles.emit(this.boss.centerX, this.boss.centerY, pCount, proj.color || '#ffffff', 2.5, 22, 2);

                    if (defeated) {
                        this.onBossDefeated();
                    } else {
                        this.audio.hit();
                    }
                }
            }
        }
    }

    createSnowball(enemy) {
        enemy.active = false;
        const sb = new Snowball(enemy.x, enemy.y, 0);
        sb.enemyType = enemy.type;
        this.snowballs.push(sb);
    }

    updateBoss(platforms, walls) {
        if (!this.boss || !this.boss.active) return;
        this.boss.update(this.player, platforms, walls);
    }

    checkPlayerBossCollision() {
        if (!this.boss || !this.boss.active) return;
        if (this.player.dead || this.player.invulnerable > 0 || this.player.invincible > 0) return;
        if (aabb(this.player, this.boss)) {
            this.player.hit();
            this.audio.playerDeath();
            this.particles.emit(this.player.centerX, this.player.centerY, 15, '#4488ff', 3, 40, 3);
        }
    }

    onBossDefeated() {
        this.particles.emit(this.boss.centerX, this.boss.centerY, 30, '#ffaa44', 5, 60, 4);
        this.particles.emit(this.boss.centerX, this.boss.centerY, 20, '#ffffff', 4, 50, 3);
        this.particles.addScorePopup(this.boss.centerX, this.boss.y - 10, 10000);
        this.player.score += 10000;
        this.audio.kill();

        // Spawn many items
        for (let i = 0; i < 5; i++) {
            const itemKeys = Object.keys(ITEM_TYPES);
            const type = itemKeys[Math.floor(Math.random() * itemKeys.length)];
            const item = new Item(
                this.boss.x + Math.random() * this.boss.w,
                this.boss.y,
                type
            );
            this.items.push(item);
        }
    }

    updateEnemies(platforms, walls) {
        const enemies = this.stageManager.getActiveEnemies();
        for (const enemy of enemies) {
            enemy.update(this.player, platforms, walls);
        }
    }

    updateSnowballs(platforms, walls) {
        for (const sb of this.snowballs) {
            const result = sb.update(platforms, walls);
            if (result === 'break') {
                // Enemy breaks free from snowball - respawn enemy
                this.particles.emit(sb.x + 8, sb.y + 8, 8, '#ccddff', 2, 20, 2);
                const respawned = new Enemy(sb.x, sb.y, sb.enemyType || 'goblin');
                this.stageManager.enemies.push(respawned);
            }
            if (result === 'destroy' || !sb.active) {
                this.particles.emit(sb.x + 8, sb.y + 8, 10, '#ffffff', 3, 25, 3);
            }
        }

        // Snowball-enemy collision (chain kills)
        const enemies = this.stageManager.getActiveEnemies();
        for (const sb of this.snowballs) {
            if (!sb.kicked || !sb.active) continue;
            for (const enemy of enemies) {
                if (!enemy.active) continue;
                if (aabb(sb, enemy)) {
                    enemy.active = false;
                    sb.killCount++;
                    this.onEnemyKilled(enemy, sb.killCount);
                }
            }
        }

        // Also destroy other snowballs on collision
        for (let i = 0; i < this.snowballs.length; i++) {
            for (let j = i + 1; j < this.snowballs.length; j++) {
                const a = this.snowballs[i];
                const b = this.snowballs[j];
                if (a.active && b.active && a.kicked && aabb(a, b)) {
                    if (!b.kicked) {
                        // Kicked snowball destroys stationary one
                        b.active = false;
                        a.killCount++;
                        this.onEnemyKilled({ x: b.x, y: b.y, type: b.enemyType }, a.killCount);
                        this.particles.emit(b.x + 8, b.y + 8, 8, '#ffffff', 3, 20, 3);
                    }
                }
            }
        }

        this.snowballs = this.snowballs.filter(sb => sb.active);
    }

    onEnemyKilled(enemy, chainCount) {
        const baseScore = SCORE_ENEMY_KILL;
        const chainBonus = SCORE_CHAIN_BONUS[Math.min(chainCount, SCORE_CHAIN_BONUS.length - 1)];
        const totalScore = baseScore + chainBonus;
        this.player.score += totalScore;

        // Kill particles
        this.particles.emit(enemy.x + 8, enemy.y + 10, 12, '#ffaa44', 3, 30, 3);
        this.particles.addScorePopup(enemy.x + 8, enemy.y - 5, totalScore);

        this.audio.kill();

        // Drop item on chain kills
        if (chainCount >= 2) {
            this.spawnItem(enemy.x, enemy.y, chainCount);
        }
    }

    spawnItem(x, y, chainCount) {
        const itemKeys = Object.keys(ITEM_TYPES);
        let type;
        if (chainCount >= 5) {
            type = 'MONEY_BAG';
        } else if (chainCount >= 3) {
            type = itemKeys[Math.floor(Math.random() * 4)]; // potions
        } else {
            type = Math.random() < 0.5 ? 'SUSHI' : itemKeys[Math.floor(Math.random() * 4)];
        }
        const item = new Item(x, y, type);
        this.items.push(item);
    }

    updateItems(platforms) {
        for (const item of this.items) {
            item.update(platforms);
        }
        this.items = this.items.filter(i => i.active);
    }

    checkPlayerEnemyCollision() {
        if (this.player.dead || this.player.invulnerable > 0 || this.player.invincible > 0) return;
        const enemies = this.stageManager.getActiveEnemies();
        for (const enemy of enemies) {
            if (enemy.frozen || !enemy.active) continue;
            if (aabb(this.player, enemy)) {
                const gameOver = this.player.hit();
                this.audio.playerDeath();
                this.particles.emit(this.player.centerX, this.player.centerY, 15, '#4488ff', 3, 40, 3);
                if (gameOver) {
                    // Will be caught in the game over check
                }
                break;
            }
        }
    }

    checkPlayerSnowballKick() {
        if (this.player.dead) return;
        for (const sb of this.snowballs) {
            if (sb.kicked || !sb.active) continue;
            if (aabb(this.player, sb)) {
                // Determine kick direction based on player position
                const dir = this.player.centerX < sb.centerX ? 1 : -1;
                sb.kick(dir);
                this.audio.kick();
                this.particles.emit(sb.x + 8, sb.y + 8, 6, '#ccddff', 2, 15, 2);
            }
        }
    }

    checkPlayerItemPickup() {
        if (this.player.dead) return;
        for (const item of this.items) {
            if (!item.active) continue;
            if (aabb(this.player, item)) {
                item.applyToPlayer(this.player);
                item.active = false;
                this.audio.item();
                this.particles.emit(item.x + 6, item.y + 6, 6, item.itemData?.color || '#fff', 2, 20, 2);
            }
        }
    }

    // --- Stage Clear ---
    updateStageClear() {
        // If waiting for interstitial ad to close, do nothing
        if (this.waitingForAd) return;

        this.stageClearTimer++;
        this.particles.update();

        if (this.stageClearTimer > 120 || this.input.start) {
            const nextStage = this.stageManager.nextStage();
            if (nextStage > 50) {
                // Game complete!
                this.gameOver(true);
            } else {
                // Try showing an interstitial ad before next stage
                const adShown = this.adManager.onStageClear(() => {
                    // Ad closed — proceed to next stage
                    this.waitingForAd = false;
                    this.state = STATE_PLAYING;
                    this.loadStage(nextStage);
                });

                if (adShown) {
                    this.waitingForAd = true;
                } else {
                    this.state = STATE_PLAYING;
                    this.loadStage(nextStage);
                }
            }
        }
    }

    renderStageClear() {
        const alpha = Math.min(this.stageClearTimer / 30, 1);
        if (alpha > 0.5) {
            this.renderer.drawText('STAGE CLEAR!', 128, 100, '#ffff44', 16, 'center');
        }
    }

    // --- Game Over ---
    gameOver(victory = false) {
        this.state = STATE_GAME_OVER;
        this.gameOverScreen.show(this.player.score, this.stageManager.currentStageNum);

        // Update high score
        if (this.player.score > this.highScore) {
            this.highScore = this.player.score;
            localStorage.setItem('snowBrosHighScore', String(this.highScore));
        }

        if (!victory) {
            this.audio.gameOver();
        }
    }

    updateGameOver() {
        this.gameOverScreen.update();
        if (this.input.start && this.gameOverScreen.canContinue()) {
            this.state = STATE_TITLE;
        }
    }

    // --- Paused ---
    updatePaused() {
        if (this.input.start) {
            this.state = STATE_PLAYING;
        }
    }

    // --- Render playing state ---
    renderPlaying() {
        // Stage background + platforms
        this.stageRenderer.render(this.stageManager.stage);

        // Items
        for (const item of this.items) {
            item.render(this.renderer, this.sprites);
        }

        // Snowballs
        for (const sb of this.snowballs) {
            sb.render(this.renderer, this.sprites);
        }

        // Enemies
        const enemies = this.stageManager.enemies;
        for (const enemy of enemies) {
            enemy.render(this.renderer, this.sprites);
        }

        // Boss
        if (this.boss && this.boss.active) {
            this.boss.render(this.renderer);
        }

        // Snow projectiles
        for (const proj of this.snowProjectiles) {
            proj.render(this.renderer, this.sprites);
        }

        // Player
        this.player.render(this.renderer, this.sprites);

        // Particles
        this.particles.render(this.renderer);

        // HUD
        this.hud.render(this.player, this.stageManager.currentStageNum, this.boss);
    }
}
