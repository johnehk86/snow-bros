// Enemy sprite definitions - 16x20 pixel art with proper shading
const _ = null;

// ============== GOBLIN (Red/Pink round creature) ==============
const gr = '#ff4444'; // goblin red
const gd = '#cc2222'; // goblin dark
const gl = '#ff6666'; // goblin light
const gx = '#ff8888'; // goblin highlight
const go = '#991111'; // goblin outline
const gw = '#ffffff'; // white
const gk = '#111111'; // black
const ge = '#ffee44'; // goblin eye yellow

export const ENEMY_SPRITES = {
    goblin_0: [
        [_, _, _, _, _, go, gd, gd, gd, go, _, _, _, _, _, _],
        [_, _, _, _, go, gl, gr, gr, gl, gd, go, _, _, _, _, _],
        [_, _, _, go, gx, gl, gl, gl, gl, gr, gd, go, _, _, _, _],
        [_, _, go, gl, gx, gx, gl, gl, gx, gl, gr, gd, go, _, _, _],
        [_, _, go, gr, gr, gr, gr, gr, gr, gr, gr, gr, go, _, _, _],
        [_, go, gr, gw, gw, gw, gr, gr, gw, gw, gw, gr, gr, go, _, _],
        [_, go, gr, gw, gw, ge, gr, gr, gw, gw, ge, gr, gr, go, _, _],
        [_, go, gr, gw, ge, gk, gr, gr, gw, ge, gk, gr, gr, go, _, _],
        [_, go, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, go, _, _],
        [_, _, go, gr, gr, gk, gk, gk, gk, gr, gr, go, _, _, _, _],
        [_, _, _, go, gr, gr, gr, gr, gr, gr, go, _, _, _, _, _],
        [_, _, go, gd, gr, gr, gr, gr, gr, gr, gd, go, _, _, _, _],
        [_, _, go, gd, gl, gr, gr, gr, gr, gl, gd, go, _, _, _, _],
        [_, _, go, gd, gr, gr, gr, gr, gr, gr, gd, go, _, _, _, _],
        [_, _, _, go, gd, gr, gr, gr, gr, gd, go, _, _, _, _, _],
        [_, _, _, go, go, gd, gr, gr, gd, go, go, _, _, _, _, _],
        [_, _, _, _, go, gd, gd, gd, gd, go, _, _, _, _, _, _],
        [_, _, _, _, go, gd, _, _, gd, go, _, _, _, _, _, _],
        [_, _, _, gk, gk, go, _, _, gk, gk, go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, gk, gk, _, _, _, _, _, _],
    ],

    goblin_1: [
        [_, _, _, _, _, go, gd, gd, gd, go, _, _, _, _, _, _],
        [_, _, _, _, go, gl, gr, gr, gl, gd, go, _, _, _, _, _],
        [_, _, _, go, gx, gl, gl, gl, gl, gr, gd, go, _, _, _, _],
        [_, _, go, gl, gx, gx, gl, gl, gx, gl, gr, gd, go, _, _, _],
        [_, _, go, gr, gr, gr, gr, gr, gr, gr, gr, gr, go, _, _, _],
        [_, go, gr, gw, gw, gw, gr, gr, gw, gw, gw, gr, gr, go, _, _],
        [_, go, gr, gw, gw, ge, gr, gr, gw, gw, ge, gr, gr, go, _, _],
        [_, go, gr, gw, ge, gk, gr, gr, gw, ge, gk, gr, gr, go, _, _],
        [_, go, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, gr, go, _, _],
        [_, _, go, gr, gr, gk, gk, gk, gk, gr, gr, go, _, _, _, _],
        [_, _, _, go, gr, gr, gr, gr, gr, gr, go, _, _, _, _, _],
        [_, _, go, gd, gr, gr, gr, gr, gr, gr, gd, go, _, _, _, _],
        [_, _, go, gd, gl, gr, gr, gr, gr, gl, gd, go, _, _, _, _],
        [_, _, go, gd, gr, gr, gr, gr, gr, gr, gd, go, _, _, _, _],
        [_, _, _, go, gd, gr, gr, gr, gr, gd, go, _, _, _, _, _],
        [_, _, _, go, go, gd, gr, gr, gd, go, go, _, _, _, _, _],
        [_, _, _, _, go, gd, gd, gd, gd, go, _, _, _, _, _, _],
        [_, _, _, go, gd, _, _, _, _, gd, go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, _, _, gk, gk, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],

    // ============== DEMON (Purple with horns) ==============
    demon_0: [
        [_, _, go, _, _, _, _, _, _, _, _, go, _, _, _, _],
        [_, _, '#8822dd', go, _, _, _, _, _, go, '#8822dd', _, _, _, _, _],
        [_, _, '#8822dd', '#aa44ff', go, go, go, go, go, '#aa44ff', '#8822dd', _, _, _, _, _],
        [_, _, go, '#cc66ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#cc66ff', go, _, _, _, _, _],
        [_, _, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _, _, _],
        [_, go, '#aa44ff', gw, gw, gw, '#aa44ff', '#aa44ff', gw, gw, gw, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', gw, '#ff4444', gk, '#aa44ff', '#aa44ff', gw, '#ff4444', gk, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', gw, '#ff4444', gk, '#aa44ff', '#aa44ff', gw, '#ff4444', gk, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _],
        [_, _, go, '#aa44ff', gk, gk, gk, gk, gk, gk, '#aa44ff', go, _, _, _, _],
        [_, _, _, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _, _, _, _],
        [_, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _],
        [_, _, go, '#8822dd', '#cc66ff', '#aa44ff', '#aa44ff', '#aa44ff', '#cc66ff', '#8822dd', go, _, _, _, _, _],
        [_, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _],
        [_, _, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _, _],
        [_, _, _, go, go, '#8822dd', '#aa44ff', '#aa44ff', '#8822dd', go, go, _, _, _, _, _],
        [_, _, _, _, go, '#8822dd', '#8822dd', '#8822dd', '#8822dd', go, _, _, _, _, _, _],
        [_, _, _, _, go, '#8822dd', _, _, '#8822dd', go, _, _, _, _, _, _],
        [_, _, _, gk, gk, go, _, _, gk, gk, go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, gk, gk, _, _, _, _, _, _],
    ],

    demon_1: [
        [_, _, go, _, _, _, _, _, _, _, _, go, _, _, _, _],
        [_, _, '#8822dd', go, _, _, _, _, _, go, '#8822dd', _, _, _, _, _],
        [_, _, '#8822dd', '#aa44ff', go, go, go, go, go, '#aa44ff', '#8822dd', _, _, _, _, _],
        [_, _, go, '#cc66ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#cc66ff', go, _, _, _, _, _],
        [_, _, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _, _, _],
        [_, go, '#aa44ff', gw, gw, gw, '#aa44ff', '#aa44ff', gw, gw, gw, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', gw, '#ff4444', gk, '#aa44ff', '#aa44ff', gw, '#ff4444', gk, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', gw, '#ff4444', gk, '#aa44ff', '#aa44ff', gw, '#ff4444', gk, '#aa44ff', go, _, _, _],
        [_, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _],
        [_, _, go, '#aa44ff', gk, gk, gk, gk, gk, gk, '#aa44ff', go, _, _, _, _],
        [_, _, _, go, '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', go, _, _, _, _, _, _],
        [_, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _],
        [_, _, go, '#8822dd', '#cc66ff', '#aa44ff', '#aa44ff', '#aa44ff', '#cc66ff', '#8822dd', go, _, _, _, _, _],
        [_, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _],
        [_, _, _, go, '#8822dd', '#aa44ff', '#aa44ff', '#aa44ff', '#8822dd', go, _, _, _, _, _, _],
        [_, _, _, go, go, '#8822dd', '#aa44ff', '#aa44ff', '#8822dd', go, go, _, _, _, _, _],
        [_, _, _, _, go, '#8822dd', '#8822dd', '#8822dd', '#8822dd', go, _, _, _, _, _, _],
        [_, _, _, go, '#8822dd', _, _, _, _, '#8822dd', go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, _, _, gk, gk, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],

    // ============== FLAME (Orange fire creature) ==============
    flame_0: [
        [_, _, _, _, '#ffcc44', _, '#ffdd66', _, _, '#ffcc44', _, _, _, _, _, _],
        [_, _, _, '#ffcc44', '#ff8800', '#ffaa44', '#ff8800', '#ffaa44', '#ffcc44', _, _, _, _, _, _, _],
        [_, _, '#dd6600', '#ff8800', '#ffaa44', '#ffcc44', '#ffaa44', '#ff8800', '#ff8800', '#dd6600', _, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ff8800', '#ffaa44', '#ffaa44', '#ff8800', '#dd6600', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _],
        [_, go, '#ff8800', gw, gw, gw, '#ff8800', '#ff8800', gw, gw, gw, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', gw, '#ff4444', gk, '#ff8800', '#ff8800', gw, '#ff4444', gk, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', gw, '#ff4444', gk, '#ff8800', '#ff8800', gw, '#ff4444', gk, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _],
        [_, _, go, '#ff8800', '#ff8800', gk, gk, '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _],
        [_, _, _, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ff8800', '#ffaa44', '#ff8800', '#ffaa44', '#ff8800', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ffaa44', '#ff8800', '#ff8800', '#ff8800', '#ffaa44', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#dd6600', go, _, _, _, _, _],
        [_, _, _, go, '#dd6600', '#ff8800', '#ff8800', '#ff8800', '#dd6600', go, _, _, _, _, _, _],
        [_, _, _, go, go, '#dd6600', '#ff8800', '#ff8800', '#dd6600', go, go, _, _, _, _, _],
        [_, _, _, _, go, '#dd6600', '#dd6600', '#dd6600', '#dd6600', go, _, _, _, _, _, _],
        [_, _, _, _, go, '#dd6600', _, _, '#dd6600', go, _, _, _, _, _, _],
        [_, _, _, gk, gk, go, _, _, gk, gk, go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, gk, gk, _, _, _, _, _, _],
    ],

    flame_1: [
        [_, _, _, '#ffdd66', _, '#ffcc44', _, '#ffdd66', _, _, _, _, _, _, _, _],
        [_, _, _, '#ffcc44', '#ffaa44', '#ff8800', '#ffaa44', '#ff8800', '#ffcc44', _, _, _, _, _, _, _],
        [_, _, '#dd6600', '#ff8800', '#ffcc44', '#ffaa44', '#ffcc44', '#ffaa44', '#ff8800', '#dd6600', _, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ffaa44', '#ff8800', '#ffaa44', '#ff8800', '#dd6600', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _],
        [_, go, '#ff8800', gw, gw, gw, '#ff8800', '#ff8800', gw, gw, gw, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', gw, '#ff4444', gk, '#ff8800', '#ff8800', gw, '#ff4444', gk, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', gw, '#ff4444', gk, '#ff8800', '#ff8800', gw, '#ff4444', gk, '#ff8800', go, _, _, _],
        [_, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _],
        [_, _, go, '#ff8800', '#ff8800', gk, gk, '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _],
        [_, _, _, go, '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', go, _, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ff8800', '#ffaa44', '#ff8800', '#ffaa44', '#ff8800', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ffaa44', '#ff8800', '#ff8800', '#ff8800', '#ffaa44', '#dd6600', go, _, _, _, _, _],
        [_, _, go, '#dd6600', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#ff8800', '#dd6600', go, _, _, _, _, _],
        [_, _, _, go, '#dd6600', '#ff8800', '#ff8800', '#ff8800', '#dd6600', go, _, _, _, _, _, _],
        [_, _, _, go, go, '#dd6600', '#ff8800', '#ff8800', '#dd6600', go, go, _, _, _, _, _],
        [_, _, _, _, go, '#dd6600', '#dd6600', '#dd6600', '#dd6600', go, _, _, _, _, _, _],
        [_, _, _, go, '#dd6600', _, _, _, _, '#dd6600', go, _, _, _, _, _],
        [_, _, gk, gk, _, _, _, _, _, _, gk, gk, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],
};

// Frozen sprite overlay - icy snowball look
const si = '#c0ddff'; // ice light
const sm = '#90bbee'; // ice mid
const sd2 = '#6899cc'; // ice dark
const sw = '#ffffff'; // snow white
const sk = '#000000'; // black

export const FROZEN_SPRITE = [
    [_, _, _, _, _, sm, sm, sm, sm, sm, sm, _, _, _, _, _],
    [_, _, _, sm, si, si, sw, sw, si, si, si, sm, _, _, _, _],
    [_, _, sm, si, sw, sw, sw, sw, sw, sw, si, si, sm, _, _, _],
    [_, sm, si, sw, sw, sw, sw, sw, sw, sw, sw, si, sm, _, _, _],
    [_, sm, si, sw, sw, sw, sw, sw, sw, sw, sw, si, sm, _, _, _],
    [_, sm, si, sw, sk, sk, sw, sw, sk, sk, sw, si, sm, _, _, _],
    [_, sm, si, sw, sk, sk, sw, sw, sk, sk, sw, si, sm, _, _, _],
    [_, sm, si, sw, sw, sw, sw, sw, sw, sw, sw, si, sm, _, _, _],
    [_, sm, si, si, sw, sw, sw, sw, sw, sw, si, si, sm, _, _, _],
    [_, _, sm, si, si, si, sw, sw, si, si, si, sm, _, _, _, _],
    [_, _, sm, si, si, si, si, si, si, si, si, sm, _, _, _, _],
    [_, _, _, sm, si, si, si, si, si, si, sm, _, _, _, _, _],
    [_, _, _, sm, sm, si, si, si, si, sm, sm, _, _, _, _, _],
    [_, _, _, _, sm, sm, sm, sm, sm, sm, _, _, _, _, _, _],
    [_, _, _, _, _, sm, sm, sm, sm, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];
