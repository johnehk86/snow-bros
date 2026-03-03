export class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.active = true;
        this.onGround = false;
        this.facing = 1; // 1 = right, -1 = left
    }

    get centerX() { return this.x + this.w / 2; }
    get centerY() { return this.y + this.h / 2; }
    get bottom() { return this.y + this.h; }
    get right() { return this.x + this.w; }

    getBounds() {
        return { x: this.x, y: this.y, w: this.w, h: this.h };
    }
}
