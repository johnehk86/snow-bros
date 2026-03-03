import { Entity } from './entity.js';
import { SNOWBALL_SPEED, SNOWBALL_WIDTH, SNOWBALL_HEIGHT, GAME_WIDTH } from '../utils/constants.js';
import { applyGravity, applyVelocity } from '../physics.js';
import { resolvePlatformCollisions, resolveWallCollisions } from '../collision.js';

export class Snowball extends Entity {
    constructor(x, y, direction) {
        super(x, y, SNOWBALL_WIDTH, SNOWBALL_HEIGHT);
        this.direction = direction;
        this.vx = SNOWBALL_SPEED * direction;
        this.rolling = false;
        this.killCount = 0; // enemies killed in this roll
        this.bounceCount = 0;
        this.maxBounces = 3;

        // The snowball can be kicked or will start rolling on its own after a moment
        this.kickTimer = 180; // 3 seconds before auto-breaking if not kicked
        this.kicked = false;
    }

    kick(direction) {
        this.kicked = true;
        this.rolling = true;
        this.direction = direction;
        this.vx = (SNOWBALL_SPEED + 1) * direction;
        this.vy = -2; // slight hop
    }

    update(platforms, walls) {
        if (!this.kicked) {
            // Sitting still, waiting to be kicked
            this.kickTimer--;
            if (this.kickTimer <= 0) {
                // Break free! Enemy escapes
                this.active = false;
                return 'break';
            }
            // Apply gravity so it sits on platforms
            applyGravity(this);
            applyVelocity(this);
            resolvePlatformCollisions(this, platforms);
            return null;
        }

        // Rolling
        applyGravity(this);
        this.vx = (SNOWBALL_SPEED + 1) * this.direction;
        applyVelocity(this);

        resolvePlatformCollisions(this, platforms);

        // Wall bouncing
        if (this.x <= 0) {
            this.x = 0;
            this.direction = 1;
            this.bounceCount++;
        } else if (this.x + this.w >= GAME_WIDTH) {
            this.x = GAME_WIDTH - this.w;
            this.direction = -1;
            this.bounceCount++;
        }

        if (this.bounceCount >= this.maxBounces) {
            this.active = false;
            return 'destroy';
        }

        return null;
    }

    render(renderer, spriteRenderer) {
        if (spriteRenderer) {
            const sprite = spriteRenderer.get('fx_ball_0');
            if (sprite) {
                renderer.drawImage(sprite, this.x, this.y);
                return;
            }
        }
        renderer.fillRect(this.x, this.y, this.w, this.h, '#ddddff');
        renderer.fillRect(this.x + 2, this.y + 2, this.w - 4, this.h - 4, '#ffffff');
        renderer.fillRect(this.x + 4, this.y + 5, 2, 2, '#000');
        renderer.fillRect(this.x + 10, this.y + 5, 2, 2, '#000');
    }
}
