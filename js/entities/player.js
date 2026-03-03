import { Entity } from './entity.js';
import {
    PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_JUMP_FORCE,
    PLAYER_MAX_LIVES, GAME_WIDTH
} from '../utils/constants.js';
import { applyGravity, applyVelocity, wrapVertical } from '../physics.js';
import { resolvePlatformCollisions, resolveWallCollisions } from '../collision.js';

// Charge thresholds (in frames = 1/60 sec)
const CHARGE_LV1 = 30;   // 0.5s → Medium shot
const CHARGE_LV2 = 60;   // 1.0s → Large shot
const CHARGE_LV3 = 100;  // 1.67s → MAX: Blizzard shot
const CHARGE_MAX = CHARGE_LV3;

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.lives = PLAYER_MAX_LIVES;
        this.score = 0;
        this.speed = PLAYER_SPEED;
        this.jumpForce = PLAYER_JUMP_FORCE;

        // Power-up state
        this.speedBoost = 0;
        this.snowPower = 0;
        this.rangeBoost = 0;
        this.invincible = 0;

        // Shooting cooldown
        this.shootCooldown = 0;
        this.shootDelay = 12;

        // Charge shot state
        this.chargeTimer = 0;
        this.charging = false;
        this.chargeLevel = 0;      // 0=normal, 1=medium, 2=large, 3=blizzard
        this.chargeFlash = 0;      // visual flash timer

        // Animation state
        this.animFrame = 0;
        this.animTimer = 0;
        this.state = 'idle'; // idle, walk, jump, shoot, charge, die

        // Invulnerability after being hit
        this.invulnerable = 0;
        this.flickerTimer = 0;

        // Death state
        this.dead = false;
        this.deathTimer = 0;

        // Down key for dropping through platforms
        this.dropThrough = false;
    }

    update(input, platforms, walls) {
        if (this.dead) {
            this.deathTimer--;
            if (this.deathTimer <= 0) {
                this.respawn();
            }
            return;
        }

        // Decrease timers
        if (this.invulnerable > 0) this.invulnerable--;
        if (this.shootCooldown > 0) this.shootCooldown--;
        if (this.speedBoost > 0) this.speedBoost--;
        if (this.snowPower > 0) this.snowPower--;
        if (this.rangeBoost > 0) this.rangeBoost--;
        if (this.invincible > 0) this.invincible--;

        // --- Charge shot logic ---
        this.updateCharge(input);

        // Horizontal movement (slower while charging at high levels)
        const chargeSlowdown = this.chargeLevel >= 2 ? 0.5 : 1;
        const currentSpeed = this.speed * (this.speedBoost > 0 ? 1.5 : 1) * chargeSlowdown;
        if (input.left) {
            this.vx = -currentSpeed;
            this.facing = -1;
        } else if (input.right) {
            this.vx = currentSpeed;
            this.facing = 1;
        } else {
            this.vx = 0;
        }

        // Drop through platform
        this.dropThrough = input.down && this.onGround;

        // Jump
        if (input.jump && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // Physics
        applyGravity(this);
        applyVelocity(this);

        // Collisions
        if (!this.dropThrough) {
            resolvePlatformCollisions(this, platforms);
        } else {
            this.dropThrough = false;
        }
        resolveWallCollisions(this, walls);

        // Screen wrapping
        wrapVertical(this);
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > GAME_WIDTH) this.x = GAME_WIDTH - this.w;

        // Animation state
        this.updateAnimation(input);
    }

    updateCharge(input) {
        if (input.shootHeld && this.shootCooldown <= 0) {
            // Charging
            if (!this.charging) {
                this.charging = true;
                this.chargeTimer = 0;
            }
            this.chargeTimer++;
            this.chargeFlash++;

            // Update charge level
            if (this.chargeTimer >= CHARGE_LV3) {
                this.chargeLevel = 3;
            } else if (this.chargeTimer >= CHARGE_LV2) {
                this.chargeLevel = 2;
            } else if (this.chargeTimer >= CHARGE_LV1) {
                this.chargeLevel = 1;
            } else {
                this.chargeLevel = 0;
            }

            // Cap charge timer
            if (this.chargeTimer > CHARGE_MAX) {
                this.chargeTimer = CHARGE_MAX;
            }
        } else if (this.charging && !input.shootHeld) {
            // Released! Fire is handled by game.js checking shootReleased
            // Reset charging state (game.js will read chargeLevel before reset)
        }

        if (!input.shootHeld && !this.charging) {
            this.chargeFlash = 0;
        }
    }

    /**
     * Called by game.js after firing the charged shot.
     */
    fireCharged() {
        const level = this.chargeLevel;
        this.charging = false;
        this.chargeTimer = 0;
        this.chargeLevel = 0;
        this.chargeFlash = 0;
        // Cooldown scales with charge level
        this.shootCooldown = this.shootDelay + level * 6;
        this.state = 'shoot';
        return level;
    }

    updateAnimation(input) {
        if (this.dead) {
            this.state = 'die';
            return;
        }

        if (this.charging && this.chargeLevel >= 1) {
            this.state = 'charge';
            return;
        }

        if (!this.onGround) {
            this.state = 'jump';
        } else if (input.left || input.right) {
            this.state = 'walk';
            this.animTimer++;
            if (this.animTimer >= 8) {
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 4;
            }
        } else {
            this.state = 'idle';
            this.animFrame = 0;
            this.animTimer = 0;
        }
    }

    canShoot() {
        return !this.dead && this.shootCooldown <= 0;
    }

    onShoot() {
        this.shootCooldown = this.shootDelay;
        this.state = 'shoot';
    }

    hit() {
        if (this.invulnerable > 0 || this.invincible > 0 || this.dead) return false;
        // Cancel charge on hit
        this.charging = false;
        this.chargeTimer = 0;
        this.chargeLevel = 0;

        this.lives--;
        if (this.lives <= 0) {
            this.dead = true;
            this.deathTimer = 120;
            return true;
        }
        this.dead = true;
        this.deathTimer = 90;
        this.vy = -4;
        return false;
    }

    respawn() {
        this.dead = false;
        this.invulnerable = 120;
        this.vx = 0;
        this.vy = 0;
        this.charging = false;
        this.chargeTimer = 0;
        this.chargeLevel = 0;
    }

    render(renderer, spriteRenderer) {
        if (this.dead && this.state === 'die') {
            this.flickerTimer++;
            if (this.flickerTimer % 4 < 2) return;
        }

        if (this.invulnerable > 0) {
            this.flickerTimer++;
            if (this.flickerTimer % 4 < 2) return;
        }

        // Try sprite rendering first
        if (spriteRenderer) {
            let spriteKey;
            if (this.state === 'shoot' || this.state === 'charge') {
                spriteKey = 'player_shoot_0';
            } else if (this.state === 'jump') {
                spriteKey = 'player_jump_0';
            } else if (this.state === 'walk') {
                spriteKey = `player_walk_${this.animFrame % 2}`;
            } else {
                spriteKey = 'player_idle_0';
            }

            const sprite = this.facing > 0
                ? spriteRenderer.get(spriteKey)
                : spriteRenderer.getFlipped(spriteKey);

            if (sprite) {
                if (this.invincible > 0) {
                    renderer.ctx.globalAlpha = 0.7 + Math.sin(this.invincible * 0.3) * 0.3;
                }
                renderer.drawImage(sprite, this.x, this.y);
                renderer.ctx.globalAlpha = 1;

                // Draw charge effects
                this.renderChargeEffect(renderer);
                return;
            }
        }

        // Fallback rectangle rendering
        const color = this.invincible > 0 ? '#ffff88' : '#4488ff';
        renderer.fillRect(this.x, this.y, this.w, this.h, color);

        const eyeX = this.facing > 0 ? this.x + 10 : this.x + 3;
        renderer.fillRect(eyeX, this.y + 6, 3, 3, '#fff');
        renderer.fillRect(eyeX + 1, this.y + 7, 1, 1, '#000');

        if (this.state === 'walk') {
            const offset = this.animFrame % 2 === 0 ? 1 : -1;
            renderer.fillRect(this.x + 3, this.y + this.h - 3, 4, 3, '#3366cc');
            renderer.fillRect(this.x + 9 + offset, this.y + this.h - 3, 4, 3, '#3366cc');
        }

        this.renderChargeEffect(renderer);
    }

    renderChargeEffect(renderer) {
        if (!this.charging || this.chargeTimer < 5) return;

        const cx = this.centerX;
        const cy = this.centerY;

        // --- Charge gauge bar (above head) ---
        const barW = 20;
        const barH = 3;
        const barX = this.x - 2;
        const barY = this.y - 8;
        const fillRatio = Math.min(this.chargeTimer / CHARGE_MAX, 1);

        // Background
        renderer.fillRect(barX - 1, barY - 1, barW + 2, barH + 2, '#000000');
        renderer.fillRect(barX, barY, barW, barH, '#222233');

        // Fill with color based on level
        let barColor;
        if (this.chargeLevel >= 3) barColor = '#ff44ff';
        else if (this.chargeLevel >= 2) barColor = '#44ddff';
        else if (this.chargeLevel >= 1) barColor = '#ffdd44';
        else barColor = '#88aacc';

        const fillW = Math.floor(fillRatio * barW);
        renderer.fillRect(barX, barY, fillW, barH, barColor);

        // Highlight on bar
        renderer.ctx.globalAlpha = 0.4;
        renderer.fillRect(barX, barY, fillW, 1, '#ffffff');
        renderer.ctx.globalAlpha = 1;

        // Level markers on bar
        renderer.fillRect(barX + Math.floor((CHARGE_LV1 / CHARGE_MAX) * barW), barY, 1, barH, '#ffffff44');
        renderer.fillRect(barX + Math.floor((CHARGE_LV2 / CHARGE_MAX) * barW), barY, 1, barH, '#ffffff44');

        // --- Glowing orb at hand position ---
        const orbX = this.facing > 0 ? this.x + this.w + 2 : this.x - 6;
        const orbY = this.y + 6;
        const pulse = Math.sin(this.chargeFlash * 0.3) * 0.3 + 0.7;

        if (this.chargeLevel >= 1) {
            const orbSize = 2 + this.chargeLevel * 2;
            const orbColors = ['#88aacc', '#ffdd44', '#44ddff', '#ff44ff'];
            const col = orbColors[this.chargeLevel];

            // Glow aura
            renderer.ctx.globalAlpha = 0.2 * pulse;
            renderer.fillRect(orbX - 2, orbY - 2, orbSize + 4, orbSize + 4, col);
            renderer.ctx.globalAlpha = 0.4 * pulse;
            renderer.fillRect(orbX - 1, orbY - 1, orbSize + 2, orbSize + 2, col);
            renderer.ctx.globalAlpha = 1;

            // Core orb
            renderer.fillRect(orbX, orbY, orbSize, orbSize, col);
            renderer.fillRect(orbX + 1, orbY + 1, orbSize - 2, orbSize - 2, '#ffffff');

            // Sparkle particles around orb
            if (this.chargeLevel >= 2) {
                const t = this.chargeFlash;
                for (let i = 0; i < this.chargeLevel; i++) {
                    const angle = (t * 0.15) + (i * Math.PI * 2 / this.chargeLevel);
                    const dist = 4 + this.chargeLevel * 2;
                    const sx = orbX + orbSize / 2 + Math.cos(angle) * dist;
                    const sy = orbY + orbSize / 2 + Math.sin(angle) * dist;
                    renderer.fillRect(sx, sy, 1, 1, '#ffffff');
                }
            }
        }

        // MAX flash effect
        if (this.chargeLevel >= 3 && this.chargeFlash % 10 < 5) {
            renderer.ctx.globalAlpha = 0.12;
            renderer.fillRect(this.x - 4, this.y - 4, this.w + 8, this.h + 8, '#ff88ff');
            renderer.ctx.globalAlpha = 1;
        }
    }
}
