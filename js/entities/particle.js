export class Particle {
    constructor(x, y, vx, vy, color, life = 30, size = 2) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.size = size;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life--;
        if (this.life <= 0) this.active = false;
    }

    render(renderer) {
        if (!this.active) return;
        const alpha = this.life / this.maxLife;
        renderer.fillRect(this.x, this.y, this.size, this.size, this.color);
    }
}

export class ScorePopup {
    constructor(x, y, score) {
        this.x = x;
        this.y = y;
        this.score = score;
        this.life = 60;
        this.active = true;
    }

    update() {
        this.y -= 0.5;
        this.life--;
        if (this.life <= 0) this.active = false;
    }

    render(renderer) {
        if (!this.active) return;
        if (this.life < 20 && this.life % 4 < 2) return;
        renderer.drawText(String(this.score), this.x, this.y, '#ffff44', 8, 'center');
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
        this.popups = [];
    }

    emit(x, y, count, color, speed = 2, life = 30, size = 2) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const spd = speed * (0.5 + Math.random() * 0.5);
            this.particles.push(new Particle(
                x, y,
                Math.cos(angle) * spd,
                Math.sin(angle) * spd - 1,
                color, life, size
            ));
        }
    }

    addScorePopup(x, y, score) {
        this.popups.push(new ScorePopup(x, y, score));
    }

    update() {
        this.particles = this.particles.filter(p => { p.update(); return p.active; });
        this.popups = this.popups.filter(p => { p.update(); return p.active; });
    }

    render(renderer) {
        for (const p of this.particles) p.render(renderer);
        for (const p of this.popups) p.render(renderer);
    }

    clear() {
        this.particles = [];
        this.popups = [];
    }
}
