/**
 * SpriteRenderer - Prebakes pixel art arrays into OffscreenCanvas images.
 * Each sprite is defined as a 2D array of color codes (or null for transparent).
 */
export class SpriteRenderer {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Create a sprite image from pixel data.
     * @param {string} key - Cache key
     * @param {Array<Array<string|null>>} pixels - 2D array of hex colors (null = transparent)
     * @param {number} scale - Pixel scale (1 = native)
     * @returns {HTMLCanvasElement}
     */
    create(key, pixels, scale = 1) {
        if (this.cache.has(key)) return this.cache.get(key);

        const h = pixels.length;
        const w = pixels[0].length;
        const canvas = document.createElement('canvas');
        canvas.width = w * scale;
        canvas.height = h * scale;
        const ctx = canvas.getContext('2d');

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const color = pixels[y][x];
                if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }

        this.cache.set(key, canvas);
        return canvas;
    }

    /**
     * Create a horizontally flipped version of a cached sprite.
     */
    createFlipped(key) {
        const flipKey = key + '_flip';
        if (this.cache.has(flipKey)) return this.cache.get(flipKey);

        const src = this.cache.get(key);
        if (!src) return null;

        const canvas = document.createElement('canvas');
        canvas.width = src.width;
        canvas.height = src.height;
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(src, 0, 0);

        this.cache.set(flipKey, canvas);
        return canvas;
    }

    get(key) {
        return this.cache.get(key) || null;
    }

    getFlipped(key) {
        return this.cache.get(key + '_flip') || this.createFlipped(key);
    }
}
