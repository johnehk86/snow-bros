import { Entity } from './entity.js';
import { SNOW_SPEED, SNOW_WIDTH, SNOW_HEIGHT, SNOW_LIFETIME } from '../utils/constants.js';

/**
 * Charge levels:
 * 0 = Normal: small, single hit, short range
 * 1 = Medium: slightly bigger, 2 hits, longer range
 * 2 = Large: big, 3 hits, pierces 1 enemy, long range
 * 3 = Blizzard: huge, instant freeze, pierces all, very long range
 */

const CHARGE_CONFIGS = [
    { sizeBonus: 0, hitAmount: 1, speed: 1,   range: 0,  pierce: 0, color: '#ffffff' },
    { sizeBonus: 2, hitAmount: 2, speed: 1.2, range: 15, pierce: 0, color: '#ffdd44' },
    { sizeBonus: 4, hitAmount: 3, speed: 1.4, range: 25, pierce: 1, color: '#44ddff' },
    { sizeBonus: 8, hitAmount: 4, speed: 1.6, range: 40, pierce: 99, color: '#ff44ff' },
];

export class SnowProjectile extends Entity {
    constructor(x, y, direction, power = 0, rangeBoost = 0, chargeLevel = 0) {
        const config = CHARGE_CONFIGS[chargeLevel] || CHARGE_CONFIGS[0];
        const w = SNOW_WIDTH + config.sizeBonus;
        const h = SNOW_HEIGHT + config.sizeBonus;
        super(x - config.sizeBonus / 2, y - config.sizeBonus / 2, w, h);

        this.direction = direction;
        this.chargeLevel = chargeLevel;
        this.config = config;
        this.vx = SNOW_SPEED * direction * config.speed;
        this.lifetime = SNOW_LIFETIME + config.range + (rangeBoost > 0 ? 15 : 0);
        this.power = power;
        this.hitAmount = config.hitAmount + power;
        this.pierceLeft = config.pierce;
        this.timer = 0;
        this.color = config.color;
        this.trailParticles = [];
    }

    update() {
        this.timer++;
        if (this.timer >= this.lifetime) {
            this.active = false;
            return;
        }

        this.x += this.vx;

        // Slight wave motion for charged shots
        if (this.chargeLevel >= 2) {
            this.y += Math.sin(this.timer * 0.3) * 0.5;
        }

        // Deactivate if off screen
        if (this.x < -20 || this.x > 276) {
            this.active = false;
        }
    }

    /**
     * Called when hitting an enemy. Returns true if projectile should be destroyed.
     */
    onHitEnemy() {
        if (this.pierceLeft > 0) {
            this.pierceLeft--;
            return false; // keep going
        }
        return true; // destroy
    }

    render(renderer, spriteRenderer) {
        // Level 0: simple sprite or fallback
        if (this.chargeLevel === 0) {
            if (spriteRenderer) {
                const key = `fx_snow_${this.timer % 10 < 5 ? 0 : 1}`;
                const sprite = this.direction > 0
                    ? spriteRenderer.get(key)
                    : spriteRenderer.getFlipped(key);
                if (sprite) {
                    renderer.drawImage(sprite, this.x, this.y);
                    return;
                }
            }
            renderer.fillRect(this.x, this.y, this.w, this.h, '#ffffff');
            renderer.fillRect(this.x + 2, this.y + 2, 4, 4, '#ddddff');
            return;
        }

        // Charged shots - custom rendering
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2;
        const r = this.w / 2;
        const t = this.timer;

        // Glow aura
        renderer.ctx.globalAlpha = 0.2 + Math.sin(t * 0.4) * 0.1;
        renderer.fillRect(this.x - 3, this.y - 3, this.w + 6, this.h + 6, this.color);
        renderer.ctx.globalAlpha = 1;

        // Main body - rounded look with layered rects
        renderer.fillRect(this.x + 1, this.y, this.w - 2, this.h, this.color);
        renderer.fillRect(this.x, this.y + 1, this.w, this.h - 2, this.color);

        // Inner highlight
        const innerColor = this.chargeLevel >= 3 ? '#ffffff' : '#eeeeff';
        renderer.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4, innerColor);

        // Core glow
        const coreSize = Math.max(2, r - 2);
        renderer.fillRect(cx - coreSize / 2, cy - coreSize / 2, coreSize, coreSize, '#ffffff');

        // Rotating sparkles
        if (this.chargeLevel >= 2) {
            const sparkCount = this.chargeLevel + 1;
            for (let i = 0; i < sparkCount; i++) {
                const angle = (t * 0.2) + (i * Math.PI * 2 / sparkCount);
                const dist = r + 2;
                const sx = cx + Math.cos(angle) * dist;
                const sy = cy + Math.sin(angle) * dist;
                renderer.fillRect(sx, sy, 2, 2, '#ffffff');
            }
        }

        // Trail effect for charged shots
        if (this.chargeLevel >= 1) {
            for (let i = 1; i <= 3; i++) {
                const trailX = this.x - this.direction * i * 4;
                const trailSize = Math.max(1, this.w - i * 3);
                renderer.ctx.globalAlpha = 0.3 - i * 0.08;
                renderer.fillRect(trailX + (this.w - trailSize) / 2, this.y + (this.h - trailSize) / 2, trailSize, trailSize, this.color);
            }
            renderer.ctx.globalAlpha = 1;
        }

        // Level 3 (Blizzard): extra sparkle burst
        if (this.chargeLevel >= 3) {
            for (let i = 0; i < 4; i++) {
                const px = cx + (Math.sin(t * 0.5 + i * 1.5) * (r + 5));
                const py = cy + (Math.cos(t * 0.5 + i * 1.5) * (r + 5));
                renderer.fillRect(px, py, 1, 1, '#ffaaff');
            }
        }
    }
}
