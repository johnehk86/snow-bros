export class AudioManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            this.enabled = false;
        }
    }

    playTone(freq, duration, type = 'square', volume = 0.15) {
        if (!this.enabled || !this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
    }

    jump() {
        this.playTone(400, 0.1, 'square', 0.1);
        setTimeout(() => this.playTone(600, 0.1, 'square', 0.08), 50);
    }

    shoot() {
        this.playTone(800, 0.08, 'square', 0.08);
        this.playTone(600, 0.06, 'noise', 0.05);
    }

    hit() {
        this.playTone(200, 0.15, 'sawtooth', 0.12);
    }

    freeze() {
        this.playTone(1200, 0.1, 'sine', 0.08);
        setTimeout(() => this.playTone(1500, 0.15, 'sine', 0.06), 80);
    }

    kick() {
        this.playTone(150, 0.12, 'square', 0.15);
        this.playTone(300, 0.08, 'sawtooth', 0.1);
    }

    kill() {
        this.playTone(500, 0.08, 'square', 0.1);
        setTimeout(() => this.playTone(700, 0.08, 'square', 0.08), 60);
        setTimeout(() => this.playTone(900, 0.12, 'square', 0.06), 120);
    }

    item() {
        this.playTone(800, 0.06, 'sine', 0.1);
        setTimeout(() => this.playTone(1000, 0.06, 'sine', 0.08), 60);
        setTimeout(() => this.playTone(1200, 0.1, 'sine', 0.06), 120);
    }

    stageClear() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2, 'square', 0.1), i * 150);
        });
    }

    gameOver() {
        const notes = [400, 350, 300, 200];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'sawtooth', 0.1), i * 200);
        });
    }

    playerDeath() {
        this.playTone(400, 0.2, 'sawtooth', 0.15);
        setTimeout(() => this.playTone(200, 0.4, 'sawtooth', 0.12), 150);
    }

    noise(duration = 0.1, volume = 0.05) {
        if (!this.enabled || !this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
    }
}
