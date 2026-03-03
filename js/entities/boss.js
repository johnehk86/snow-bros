import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';
import { applyGravity, applyVelocity } from '../physics.js';
import { resolvePlatformCollisions } from '../collision.js';

const BOSS_PHASES = {
    INTRO: 'INTRO',
    ATTACK: 'ATTACK',
    ENRAGED: 'ENRAGED',
    DYING: 'DYING',
};

export class Boss extends Entity {
    constructor(x, y, bossType = 1) {
        super(x, y, 32, 32);
        this.bossType = bossType; // 1-5 for each boss stage
        this.maxHp = 8 + bossType * 4;
        this.hp = this.maxHp;
        this.phase = BOSS_PHASES.INTRO;
        this.phaseTimer = 120;
        this.attackTimer = 0;
        this.attackPattern = 0;
        this.invulnerable = 0;
        this.snowLevel = 0;
        this.frozen = false;
        this.flashTimer = 0;
        this.isBoss = true;

        // Movement
        this.speed = 1 + bossType * 0.2;
        this.direction = 1;

        // Boss-specific setup
        this.setupBossType();
    }

    setupBossType() {
        switch (this.bossType) {
            case 1: // Ice Golem
                this.color = '#4488aa';
                this.accentColor = '#226688';
                this.name = 'ICE GOLEM';
                this.w = 32;
                this.h = 36;
                break;
            case 2: // Fire Dragon
                this.color = '#ff6622';
                this.accentColor = '#cc4400';
                this.name = 'FIRE DRAGON';
                this.w = 36;
                this.h = 32;
                break;
            case 3: // Thunder Giant
                this.color = '#ffdd44';
                this.accentColor = '#ccaa22';
                this.name = 'THUNDER GIANT';
                this.w = 36;
                this.h = 40;
                break;
            case 4: // Shadow Lord
                this.color = '#8844aa';
                this.accentColor = '#662288';
                this.name = 'SHADOW LORD';
                this.w = 32;
                this.h = 36;
                break;
            case 5: // Snow King
                this.color = '#aaccff';
                this.accentColor = '#6688cc';
                this.name = 'SNOW KING';
                this.w = 40;
                this.h = 44;
                break;
            default:
                this.color = '#ff4444';
                this.accentColor = '#cc2222';
                this.name = 'BOSS';
        }
    }

    hitBySnow(amount = 1) {
        if (this.invulnerable > 0 || this.phase === BOSS_PHASES.DYING) return false;

        this.snowLevel += amount;
        if (this.snowLevel >= 4) {
            this.snowLevel = 0;
            this.frozen = true;
            this.hp -= 1;
            this.invulnerable = 30;
            this.flashTimer = 30;

            if (this.hp <= this.maxHp / 2 && this.phase === BOSS_PHASES.ATTACK) {
                this.phase = BOSS_PHASES.ENRAGED;
                this.speed *= 1.5;
            }

            if (this.hp <= 0) {
                this.phase = BOSS_PHASES.DYING;
                this.phaseTimer = 120;
                this.active = false;
                return true; // boss defeated
            }
            return true; // damage dealt
        }
        return false;
    }

    update(player, platforms, walls) {
        if (!this.active) return;

        if (this.invulnerable > 0) this.invulnerable--;
        if (this.flashTimer > 0) this.flashTimer--;
        if (this.frozen) {
            this.frozen = false; // bosses break free immediately
        }

        // Melt snow
        if (this.snowLevel > 0) {
            this.snowLevel -= 0.005;
            if (this.snowLevel < 0) this.snowLevel = 0;
        }

        switch (this.phase) {
            case BOSS_PHASES.INTRO:
                this.phaseTimer--;
                if (this.phaseTimer <= 0) {
                    this.phase = BOSS_PHASES.ATTACK;
                }
                break;

            case BOSS_PHASES.ATTACK:
                this.updateAttack(player, platforms);
                break;

            case BOSS_PHASES.ENRAGED:
                this.updateAttack(player, platforms);
                break;
        }

        applyGravity(this);
        applyVelocity(this);
        resolvePlatformCollisions(this, platforms);

        // Bounce off walls
        if (this.x <= 0) {
            this.x = 0;
            this.direction = 1;
        } else if (this.x + this.w >= GAME_WIDTH) {
            this.x = GAME_WIDTH - this.w;
            this.direction = -1;
        }
    }

    updateAttack(player, platforms) {
        this.attackTimer++;

        const dx = player.centerX - this.centerX;
        this.facing = dx > 0 ? 1 : -1;

        // Movement pattern based on boss type
        switch (this.bossType) {
            case 1: // Ice Golem - slow charge
                if (this.attackTimer % 180 < 120) {
                    this.vx = this.direction * this.speed;
                } else {
                    // Charge at player
                    this.vx = this.facing * this.speed * 2.5;
                }
                // Jump periodically
                if (this.attackTimer % 90 === 0 && this.onGround) {
                    this.vy = -6;
                }
                break;

            case 2: // Fire Dragon - jump + swoop
                this.vx = this.facing * this.speed;
                if (this.attackTimer % 120 === 0 && this.onGround) {
                    this.vy = -8;
                }
                break;

            case 3: // Thunder Giant - stomp
                if (this.attackTimer % 150 < 100) {
                    this.vx = this.facing * this.speed * 0.5;
                } else {
                    // Stomp (fast fall)
                    if (this.onGround && this.attackTimer % 150 === 100) {
                        this.vy = -9;
                    }
                }
                break;

            case 4: // Shadow Lord - teleport-like dashes
                if (this.attackTimer % 100 < 60) {
                    this.vx = this.facing * this.speed;
                } else {
                    this.vx = this.facing * this.speed * 4;
                }
                if (this.attackTimer % 80 === 0 && this.onGround) {
                    this.vy = -7;
                }
                break;

            case 5: // Snow King - combines all patterns
                const subPattern = Math.floor(this.attackTimer / 200) % 4;
                switch (subPattern) {
                    case 0: this.vx = this.facing * this.speed * 2; break;
                    case 1:
                        if (this.attackTimer % 60 === 0 && this.onGround) this.vy = -9;
                        this.vx = this.facing * this.speed;
                        break;
                    case 2: this.vx = this.direction * this.speed * 3; break;
                    case 3: this.vx = this.facing * this.speed * 0.5; break;
                }
                break;

            default:
                this.vx = this.facing * this.speed;
                if (this.attackTimer % 120 === 0 && this.onGround) {
                    this.vy = -6;
                }
        }

        // Direction change at walls
        if (this.attackTimer % 200 === 0) {
            this.direction *= -1;
        }
    }

    render(renderer) {
        if (!this.active && this.phase !== BOSS_PHASES.DYING) return;

        // Flash when hit
        if (this.flashTimer > 0 && this.flashTimer % 4 < 2) return;

        const x = Math.round(this.x);
        const y = Math.round(this.y);
        const w = this.w;
        const h = this.h;

        // Drop shadow
        renderer.ctx.globalAlpha = 0.3;
        renderer.fillRect(x + 4, y + h, w - 8, 3, '#000000');
        renderer.ctx.globalAlpha = 1;

        // Body outline
        renderer.fillRect(x - 1, y - 1, w + 2, h + 2, '#000000');

        // Body gradient (3 layers)
        renderer.fillRect(x, y, w, h, this.accentColor);
        renderer.fillRect(x + 2, y + 2, w - 4, h - 4, this.color);

        // Highlight on top-left
        renderer.ctx.globalAlpha = 0.3;
        renderer.fillRect(x + 3, y + 3, w - 10, h / 3, '#ffffff');
        renderer.ctx.globalAlpha = 1;

        // Dark bottom
        renderer.ctx.globalAlpha = 0.25;
        renderer.fillRect(x + 2, y + h * 0.6, w - 4, h * 0.35, '#000000');
        renderer.ctx.globalAlpha = 1;

        // Crown/horn details based on boss type
        if (this.bossType === 1) {
            // Ice Golem - crystal on head
            renderer.fillRect(x + w/2 - 3, y - 6, 6, 8, '#88ddff');
            renderer.fillRect(x + w/2 - 2, y - 5, 4, 6, '#aaeeff');
            renderer.fillRect(x + w/2 - 1, y - 4, 2, 4, '#ffffff');
        } else if (this.bossType === 2) {
            // Fire Dragon - flame horns
            renderer.fillRect(x + 4, y - 5, 3, 6, '#ff6600');
            renderer.fillRect(x + 5, y - 7, 2, 3, '#ffaa00');
            renderer.fillRect(x + w - 7, y - 5, 3, 6, '#ff6600');
            renderer.fillRect(x + w - 6, y - 7, 2, 3, '#ffaa00');
        } else if (this.bossType >= 3) {
            // Crown
            for (let cx = 0; cx < 3; cx++) {
                const crownX = x + 6 + cx * 7;
                renderer.fillRect(crownX, y - 4, 4, 5, '#ffd700');
                renderer.fillRect(crownX + 1, y - 6, 2, 3, '#ffd700');
            }
        }

        // Eyes
        const eyeY = y + Math.floor(h * 0.25);
        const eyeSize = 6;
        const eyeGap = Math.floor(w * 0.35);
        const ex1 = x + Math.floor(w / 2) - eyeGap / 2 - eyeSize / 2;
        const ex2 = x + Math.floor(w / 2) + eyeGap / 2 - eyeSize / 2;

        // Eye whites
        renderer.fillRect(ex1, eyeY, eyeSize, eyeSize, '#ffffff');
        renderer.fillRect(ex2, eyeY, eyeSize, eyeSize, '#ffffff');

        // Pupils (red for bosses, track toward player direction)
        const pupilOff = this.facing > 0 ? 2 : 0;
        renderer.fillRect(ex1 + pupilOff + 1, eyeY + 2, 3, 3, '#ff2222');
        renderer.fillRect(ex2 + pupilOff + 1, eyeY + 2, 3, 3, '#ff2222');

        // Eye highlight
        renderer.fillRect(ex1 + 1, eyeY + 1, 2, 1, '#ffffff');
        renderer.fillRect(ex2 + 1, eyeY + 1, 2, 1, '#ffffff');

        // Mouth - angry/menacing
        const mouthY = eyeY + eyeSize + 4;
        const mouthW = Math.floor(w * 0.5);
        const mouthX = x + Math.floor(w / 2) - mouthW / 2;
        renderer.fillRect(mouthX, mouthY, mouthW, 3, '#000000');
        // Teeth
        for (let tx = mouthX + 1; tx < mouthX + mouthW - 1; tx += 3) {
            renderer.fillRect(tx, mouthY, 2, 1, '#ffffff');
            renderer.fillRect(tx, mouthY + 2, 2, 1, '#ffffff');
        }

        // Snow coverage
        if (this.snowLevel > 0) {
            const snowH = (this.snowLevel / 4) * h;
            renderer.ctx.globalAlpha = 0.55;
            renderer.fillRect(x, y + h - snowH, w, snowH, '#ddeeff');
            renderer.ctx.globalAlpha = 0.3;
            renderer.fillRect(x, y + h - snowH, w, 2, '#ffffff');
            renderer.ctx.globalAlpha = 1;
        }

        // Enraged glow
        if (this.phase === BOSS_PHASES.ENRAGED) {
            const glowAlpha = 0.15 + Math.sin(this.attackTimer * 0.2) * 0.1;
            renderer.ctx.globalAlpha = glowAlpha;
            renderer.fillRect(x - 2, y - 2, w + 4, h + 4, '#ff4444');
            renderer.ctx.globalAlpha = 1;
        }

        // HP bar (bigger, more detailed)
        const hpBarWidth = w + 12;
        const hpBarX = x - 6;
        const hpBarY = y - 12;

        renderer.fillRect(hpBarX - 1, hpBarY - 1, hpBarWidth + 2, 7, '#000000');
        renderer.fillRect(hpBarX, hpBarY, hpBarWidth, 5, '#222222');

        const hpWidth = Math.max(0, Math.floor((this.hp / this.maxHp) * hpBarWidth));
        const hpRatio = this.hp / this.maxHp;
        let hpColor;
        if (hpRatio > 0.6) hpColor = '#44dd44';
        else if (hpRatio > 0.3) hpColor = '#dddd44';
        else hpColor = '#dd4444';

        renderer.fillRect(hpBarX, hpBarY, hpWidth, 5, hpColor);
        // HP bar highlight
        renderer.ctx.globalAlpha = 0.3;
        renderer.fillRect(hpBarX, hpBarY, hpWidth, 2, '#ffffff');
        renderer.ctx.globalAlpha = 1;

        renderer.strokeRect(hpBarX, hpBarY, hpBarWidth, 5, '#888888');
    }
}
