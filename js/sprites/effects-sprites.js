// Effect sprite definitions - improved visuals
const _ = null;
const W = '#ffffff';
const S = '#ddeeff';
const L = '#aaccee';
const I = '#88aadd';
const B = '#6688bb';

// Snow projectile frames - sparkly snow cluster
export const SNOW_PROJECTILE_SPRITES = {
    snow_0: [
        [_, _, W, S, _, _, _, _],
        [_, W, S, L, W, _, _, _],
        [W, S, W, S, S, W, _, _],
        [S, L, S, W, L, S, _, _],
        [_, W, S, S, W, _, _, _],
        [_, _, W, S, _, _, _, _],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
    ],
    snow_1: [
        [_, _, _, W, S, _, _, _],
        [_, _, W, S, L, W, _, _],
        [_, W, L, W, S, S, W, _],
        [_, S, S, L, W, L, S, _],
        [_, _, W, S, S, W, _, _],
        [_, _, _, W, S, _, _, _],
        [_, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _],
    ],
};

// Snowball sprite (rolling) - detailed icy ball
export const SNOWBALL_SPRITES = {
    ball_0: [
        [_, _, _, _, _, B, B, B, B, B, _, _, _, _, _, _],
        [_, _, _, B, I, L, L, S, S, L, I, B, _, _, _, _],
        [_, _, B, I, L, S, S, W, W, S, L, I, B, _, _, _],
        [_, B, I, L, S, W, W, W, W, S, S, L, I, B, _, _],
        [_, B, I, S, W, '#111', '#111', W, W, '#111', '#111', S, I, B, _, _],
        [_, B, L, S, W, '#111', '#111', W, W, '#111', '#111', S, L, B, _, _],
        [_, B, L, S, W, W, W, W, W, W, W, S, L, B, _, _],
        [_, B, I, S, S, W, W, W, W, S, S, S, I, B, _, _],
        [_, B, I, L, S, S, S, S, S, S, S, L, I, B, _, _],
        [_, _, B, I, L, S, S, S, S, L, L, I, B, _, _, _],
        [_, _, B, I, I, L, L, L, L, I, I, B, B, _, _, _],
        [_, _, _, B, I, I, I, I, I, I, B, _, _, _, _, _],
        [_, _, _, _, B, B, B, B, B, B, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],
};
