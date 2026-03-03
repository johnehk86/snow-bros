import { Entity } from './entity.js';
import { ITEM_WIDTH, ITEM_HEIGHT, ITEM_GRAVITY, ITEM_LIFETIME, GAME_WIDTH } from '../utils/constants.js';
import { resolvePlatformCollisions } from '../collision.js';

export const ITEM_TYPES = {
    RED_POTION: { color: '#ff4444', name: 'speed', duration: 600 },
    BLUE_POTION: { color: '#4444ff', name: 'snowPower', duration: 600 },
    YELLOW_POTION: { color: '#ffff44', name: 'range', duration: 600 },
    GREEN_POTION: { color: '#44ff44', name: 'invincible', duration: 300 },
    SUSHI: { color: '#ff8888', name: 'score', points: 1000 },
    CAKE: { color: '#ffaacc', name: 'score', points: 2000 },
    MONEY_BAG: { color: '#ffdd00', name: 'score', points: 5000 },
};

export class Item extends Entity {
    constructor(x, y, type) {
        super(x, y, ITEM_WIDTH, ITEM_HEIGHT);
        this.type = type;
        this.itemData = ITEM_TYPES[type];
        this.gravity = ITEM_GRAVITY;
        this.lifetime = ITEM_LIFETIME;
        this.timer = 0;
        this.bounceVy = -3;
        this.vy = this.bounceVy;
        this.vx = (Math.random() - 0.5) * 2;
    }

    update(platforms) {
        this.timer++;
        if (this.timer >= this.lifetime) {
            // Flash before disappearing
            if (this.timer >= this.lifetime + 60) {
                this.active = false;
                return;
            }
        }

        // Gravity
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        // Friction on ground
        resolvePlatformCollisions(this, platforms);
        if (this.onGround) {
            this.vx *= 0.8;
            if (Math.abs(this.vx) < 0.1) this.vx = 0;
        }

        // Screen bounds
        if (this.x < 0) { this.x = 0; this.vx = Math.abs(this.vx); }
        if (this.x + this.w > GAME_WIDTH) { this.x = GAME_WIDTH - this.w; this.vx = -Math.abs(this.vx); }
    }

    applyToPlayer(player) {
        if (!this.itemData) return;

        switch (this.itemData.name) {
            case 'speed':
                player.speedBoost = this.itemData.duration;
                break;
            case 'snowPower':
                player.snowPower = this.itemData.duration;
                break;
            case 'range':
                player.rangeBoost = this.itemData.duration;
                break;
            case 'invincible':
                player.invincible = this.itemData.duration;
                break;
            case 'score':
                player.score += this.itemData.points;
                break;
        }
    }

    render(renderer, spriteRenderer) {
        if (!this.active) return;
        if (this.timer >= this.lifetime && this.timer % 4 < 2) return;

        if (spriteRenderer) {
            const sprite = spriteRenderer.get(`item_${this.type}`);
            if (sprite) {
                renderer.drawImage(sprite, this.x, this.y);
                return;
            }
        }

        const color = this.itemData?.color || '#fff';
        renderer.fillRect(this.x, this.y, this.w, this.h, color);
        renderer.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4, '#fff');
        renderer.fillRect(this.x + 3, this.y + 3, this.w - 6, this.h - 6, color);
    }
}
