export class Input {
    constructor() {
        this.keys = {};
        this.previousKeys = {};
        this.touchKeys = {};
        this.previousTouchKeys = {};

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);

        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);

        this.setupTouchControls();
    }

    _onKeyDown(e) {
        e.preventDefault();
        this.keys[e.code] = true;
    }

    _onKeyUp(e) {
        e.preventDefault();
        this.keys[e.code] = false;
    }

    setupTouchControls() {
        const keyMap = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            down: 'ArrowDown',
            jump: 'KeyZ',
            shoot: 'KeyX',
        };

        const buttons = document.querySelectorAll('.touch-btn');
        buttons.forEach(btn => {
            const action = btn.dataset.key;
            const code = keyMap[action];
            if (!code) return;

            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchKeys[code] = true;
            }, { passive: false });

            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchKeys[code] = false;
            }, { passive: false });

            btn.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                this.touchKeys[code] = false;
            }, { passive: false });
        });

        // Canvas touch = Enter (for title/game-over screens)
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchKeys['Enter'] = true;
            }, { passive: false });

            canvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.touchKeys['Enter'] = false;
            }, { passive: false });
        }

        // Prevent default on the entire document to block scrolling/zooming
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    isDown(code) {
        return !!this.keys[code] || !!this.touchKeys[code];
    }

    isPressed(code) {
        const current = !!this.keys[code] || !!this.touchKeys[code];
        const previous = !!this.previousKeys[code] || !!this.previousTouchKeys[code];
        return current && !previous;
    }

    isReleased(code) {
        const current = !!this.keys[code] || !!this.touchKeys[code];
        const previous = !!this.previousKeys[code] || !!this.previousTouchKeys[code];
        return !current && previous;
    }

    update() {
        this.previousKeys = { ...this.keys };
        this.previousTouchKeys = { ...this.touchKeys };
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
