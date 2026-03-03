import { Entity } from './entity.js';
import {
    ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_SPEED, ENEMY_JUMP_FORCE,
    SNOW_LEVELS, SNOW_MELT_RATE, ENEMY_ATTACK_RANGE, ENEMY_CHASE_RANGE,
    GAME_WIDTH
} from '../utils/constants.js';
import { applyGravity, applyVelocity, wrapVertical } from '../physics.js';
import { resolvePlatformCollisions, resolveWallCollisions } from '../collision.js';

// AI States
const AI_SPAWN = 'SPAWN';
const AI_PATROL = 'PATROL';
const AI_CHASE = 'CHASE';
const AI_ATTACK = 'ATTACK';
const AI_FROZEN = 'FROZEN';

export class Enemy extends Entity {
    constructor(x, y, type = 'goblin') {
        super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT);
        this.type = type;
        this.speed = ENEMY_SPEED;
        this.jumpForce = ENEMY_JUMP_FORCE;
        this.hp = 1;

        // Snow/freeze state
        this.snowLevel = 0; // 0-4
        this.frozen = false;

        // AI state
        this.aiState = AI_SPAWN;
        this.aiTimer = 60; // spawn delay
        this.patrolDir = Math.random() < 0.5 ? -1 : 1;
        this.patrolTimer = 0;
        this.patrolDuration = 60 + Math.random() * 120;

        // Jump AI
        this.jumpTimer = 0;
        this.jumpCooldown = 60;

        // Animation
        this.animFrame = 0;
        this.animTimer = 0;
        this.color = '#ff4444';

        this.applyTypeProperties();
    }

    applyTypeProperties() {
        switch (this.type) {
            case 'goblin':
                this.color = '#ff4444';
                this.speed = ENEMY_SPEED;
                break;
            case 'demon':
                this.color = '#aa44ff';
                this.speed = ENEMY_SPEED * 1.2;
                break;
            case 'flame':
                this.color = '#ff8800';
                this.speed = ENEMY_SPEED * 0.8;
                break;
            case 'sumo':
                this.color = '#ffcc44';
                this.speed = ENEMY_SPEED * 0.6;
                this.w = 20;
                this.h = 22;
                break;
            case 'tornado':
                this.color = '#44ffff';
                this.speed = ENEMY_SPEED * 1.5;
                break;
        }
    }

    hitBySnow(amount = 1) {
        if (this.frozen) return;
        this.snowLevel += amount;
        if (this.snowLevel >= SNOW_LEVELS - 1) {
            this.snowLevel = SNOW_LEVELS - 1;
            this.frozen = true;
            this.aiState = AI_FROZEN;
            this.vx = 0;
        }
    }

    update(player, platforms, walls) {
        if (!this.active) return;

        // Melt snow over time (if not fully frozen)
        if (!this.frozen && this.snowLevel > 0) {
            this.snowLevel -= SNOW_MELT_RATE;
            if (this.snowLevel < 0) this.snowLevel = 0;
        }

        // If frozen, slowly melt
        if (this.frozen) {
            this.snowLevel -= SNOW_MELT_RATE * 0.5;
            if (this.snowLevel <= 0) {
                this.snowLevel = 0;
                this.frozen = false;
                this.aiState = AI_PATROL;
            }
            // Don't move while frozen
            applyGravity(this);
            applyVelocity(this);
            resolvePlatformCollisions(this, platforms);
            return;
        }

        // Speed reduction based on snow
        const slowFactor = 1 - (this.snowLevel / SNOW_LEVELS) * 0.6;

        // AI state machine
        this.updateAI(player, slowFactor);

        // Physics
        applyGravity(this);
        applyVelocity(this);
        resolvePlatformCollisions(this, platforms);
        resolveWallCollisions(this, walls);
        wrapVertical(this);

        // Screen bounds
        if (this.x <= 0) {
            this.x = 0;
            this.patrolDir = 1;
        } else if (this.x + this.w >= GAME_WIDTH) {
            this.x = GAME_WIDTH - this.w;
            this.patrolDir = -1;
        }

        // Animation
        this.animTimer++;
        if (this.animTimer >= 10) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 2;
        }
    }

    updateAI(player, slowFactor) {
        const dx = player.centerX - this.centerX;
        const dy = player.centerY - this.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        switch (this.aiState) {
            case AI_SPAWN:
                this.aiTimer--;
                if (this.aiTimer <= 0) {
                    this.aiState = AI_PATROL;
                }
                break;

            case AI_PATROL:
                this.vx = this.patrolDir * this.speed * slowFactor;
                this.facing = this.patrolDir;

                this.patrolTimer++;
                if (this.patrolTimer >= this.patrolDuration) {
                    this.patrolTimer = 0;
                    this.patrolDir *= -1;
                    this.patrolDuration = 60 + Math.random() * 120;
                }

                // Random jump while patrolling
                this.jumpTimer++;
                if (this.jumpTimer >= this.jumpCooldown && this.onGround && Math.random() < 0.02) {
                    this.vy = this.jumpForce;
                    this.onGround = false;
                    this.jumpTimer = 0;
                }

                // Switch to chase if player is close
                if (dist < ENEMY_CHASE_RANGE && !player.dead) {
                    this.aiState = AI_CHASE;
                }
                break;

            case AI_CHASE:
                this.facing = dx > 0 ? 1 : -1;
                this.vx = this.facing * this.speed * 1.3 * slowFactor;

                // Jump to reach player if they're above
                if (dy < -30 && this.onGround && this.jumpTimer >= this.jumpCooldown) {
                    this.vy = this.jumpForce;
                    this.onGround = false;
                    this.jumpTimer = 0;
                }
                this.jumpTimer++;

                // Attack if close enough
                if (dist < ENEMY_ATTACK_RANGE) {
                    this.aiState = AI_ATTACK;
                    this.aiTimer = 30;
                }

                // Lose interest if player is far
                if (dist > ENEMY_CHASE_RANGE * 2 || player.dead) {
                    this.aiState = AI_PATROL;
                }
                break;

            case AI_ATTACK:
                this.vx = this.facing * this.speed * 1.5 * slowFactor;
                this.aiTimer--;
                if (this.aiTimer <= 0) {
                    this.aiState = AI_CHASE;
                }
                break;
        }
    }

    render(renderer, spriteRenderer) {
        if (!this.active) return;

        // Try sprite rendering
        if (spriteRenderer && !this.frozen) {
            const spriteKey = `enemy_${this.type}_${this.animFrame % 2}`;
            const sprite = this.facing > 0
                ? spriteRenderer.get(spriteKey)
                : spriteRenderer.getFlipped(spriteKey);

            if (sprite) {
                renderer.drawImage(sprite, this.x, this.y);
                // Snow overlay
                if (this.snowLevel > 0) {
                    const snowH = (this.snowLevel / (SNOW_LEVELS - 1)) * this.h;
                    renderer.ctx.globalAlpha = 0.5;
                    renderer.fillRect(this.x, this.y + this.h - snowH, this.w, snowH, '#ffffff');
                    renderer.ctx.globalAlpha = 1;
                }
                return;
            }
        }

        // Frozen: use snowball sprite or fallback
        if (this.frozen && spriteRenderer) {
            const frozenSprite = spriteRenderer.get('frozen');
            if (frozenSprite) {
                renderer.drawImage(frozenSprite, this.x - 1, this.y + 2);
                return;
            }
        }

        // Fallback rectangle rendering
        let color = this.color;
        if (this.frozen) {
            color = '#aaccff';
        } else if (this.snowLevel > 0) {
            const ratio = this.snowLevel / (SNOW_LEVELS - 1);
            color = this.blendColor(this.color, '#ffffff', ratio * 0.7);
        }

        renderer.fillRect(this.x, this.y, this.w, this.h, color);

        if (this.snowLevel > 0 && !this.frozen) {
            const snowH = (this.snowLevel / (SNOW_LEVELS - 1)) * this.h;
            renderer.ctx.globalAlpha = 0.5;
            renderer.fillRect(this.x, this.y + this.h - snowH, this.w, snowH, '#ffffff');
            renderer.ctx.globalAlpha = 1;
        }

        if (!this.frozen) {
            const eyeX = this.facing > 0 ? this.x + 9 : this.x + 3;
            renderer.fillRect(eyeX, this.y + 6, 3, 3, '#fff');
            renderer.fillRect(eyeX + 1, this.y + 7, 1, 1, '#000');
        } else {
            renderer.fillRect(this.x + 4, this.y + 6, 2, 2, '#000');
            renderer.fillRect(this.x + 10, this.y + 6, 2, 2, '#000');
        }

        if (this.animFrame === 1 && !this.frozen) {
            renderer.fillRect(this.x + 2, this.y + this.h - 2, 4, 2, '#aa2222');
            renderer.fillRect(this.x + 10, this.y + this.h - 2, 4, 2, '#aa2222');
        }
    }

    blendColor(c1, c2, ratio) {
        const parse = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b];
        };
        const [r1, g1, b1] = parse(c1);
        const [r2, g2, b2] = parse(c2);
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        return `rgb(${r},${g},${b})`;
    }
}
