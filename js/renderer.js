import { GAME_WIDTH, GAME_HEIGHT } from './utils/constants.js';

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Set native resolution
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        // Disable smoothing for pixel art
        this.ctx.imageSmoothingEnabled = false;

        // Scale canvas to fit window
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const maxW = window.innerWidth;
        const maxH = window.innerHeight;

        // On mobile (touch controls visible), reserve space for controls
        const touchControls = document.getElementById('touch-controls');
        const isMobile = touchControls && touchControls.offsetHeight > 0;
        const controlsHeight = isMobile ? touchControls.offsetHeight : 0;
        const availableH = maxH - controlsHeight;

        let scale;
        if (isMobile) {
            // Allow fractional scale on mobile to fill the screen better
            scale = Math.min(maxW / GAME_WIDTH, availableH / GAME_HEIGHT);
        } else {
            // Integer scale on desktop for crisp pixels
            scale = Math.min(
                Math.floor(maxW / GAME_WIDTH),
                Math.floor(maxH / GAME_HEIGHT)
            ) || 1;
        }

        this.canvas.style.width = `${GAME_WIDTH * scale}px`;
        this.canvas.style.height = `${GAME_HEIGHT * scale}px`;
        this.scale = scale;
    }

    clear(color = '#000') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    fillRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(Math.round(x), Math.round(y), w, h);
    }

    strokeRect(x, y, w, h, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(Math.round(x), Math.round(y), w, h);
    }

    drawImage(img, x, y, w, h) {
        this.ctx.drawImage(img, Math.round(x), Math.round(y), w || img.width, h || img.height);
    }

    drawImageFlipped(img, x, y, w, h) {
        w = w || img.width;
        h = h || img.height;
        this.ctx.save();
        this.ctx.translate(Math.round(x) + w, Math.round(y));
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(img, 0, 0, w, h);
        this.ctx.restore();
    }

    drawText(text, x, y, color = '#fff', size = 8, align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px monospace`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(text, Math.round(x), Math.round(y));
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(Math.round(x), Math.round(y), radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
