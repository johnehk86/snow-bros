export class Input {
    constructor() {
        this.keys = {};
        this.previousKeys = {};

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);

        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyDown(e) {
        e.preventDefault();
        this.keys[e.code] = true;
    }

    _onKeyUp(e) {
        e.preventDefault();
        this.keys[e.code] = false;
    }

    isDown(code) {
        return !!this.keys[code];
    }

    isPressed(code) {
        return !!this.keys[code] && !this.previousKeys[code];
    }

    isReleased(code) {
        return !this.keys[code] && !!this.previousKeys[code];
    }

    update() {
        this.previousKeys = { ...this.keys };
    }

    // Convenience accessors
    get left() { return this.isDown('ArrowLeft'); }
    get right() { return this.isDown('ArrowRight'); }
    get up() { return this.isDown('ArrowUp'); }
    get down() { return this.isDown('ArrowDown'); }
    get jump() { return this.isPressed('KeyZ'); }
    get shoot() { return this.isPressed('KeyX'); }
    get shootHeld() { return this.isDown('KeyX'); }
    get shootReleased() { return this.isReleased('KeyX'); }
    get start() { return this.isPressed('Enter'); }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
    }
}
