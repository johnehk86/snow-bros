import { FRAME_TIME } from './utils/constants.js';

export class GameLoop {
    constructor(updateFn, renderFn) {
        this.updateFn = updateFn;
        this.renderFn = renderFn;
        this.running = false;
        this.accumulator = 0;
        this.lastTime = 0;
        this._tick = this._tick.bind(this);
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.accumulator = 0;
        requestAnimationFrame(this._tick);
    }

    stop() {
        this.running = false;
    }

    _tick(currentTime) {
        if (!this.running) return;

        let delta = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Clamp delta to prevent spiral of death
        if (delta > 200) delta = 200;

        this.accumulator += delta;

        // Fixed timestep updates
        while (this.accumulator >= FRAME_TIME) {
            this.updateFn();
            this.accumulator -= FRAME_TIME;
        }

        // Render once per frame
        this.renderFn();

        requestAnimationFrame(this._tick);
    }
}
