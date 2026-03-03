// Nick sprite definitions - 16x20 pixel art
// High quality with proper shading

const _ = null;

// Cap/hat colors (cyan snowman hat)
const c1 = '#60f0f0'; // cap highlight
const c2 = '#00d0d0'; // cap main
const c3 = '#00a0a0'; // cap shadow
const c4 = '#007878'; // cap outline

// Face colors (warm cream tones)
const f1 = '#ffffff'; // face highlight
const f2 = '#fff0e0'; // face main
const f3 = '#eed8c0'; // face shadow
const f4 = '#d0b898'; // face outline/edge

// Eye colors
const ew = '#ffffff'; // eye white
const ei = '#2244cc'; // eye blue iris
const ep = '#111144'; // eye pupil
const eg = '#aaddff'; // eye glint/highlight

// Cheek and mouth
const pk = '#ff8888'; // pink cheek
const mo = '#cc3333'; // mouth red
const ms = '#881111'; // mouth shadow

// Body colors (blue outfit)
const b1 = '#7090ff'; // body highlight
const b2 = '#4466ee'; // body main
const b3 = '#3350cc'; // body shadow
const b4 = '#2840aa'; // body outline
const b5 = '#5878ff'; // body mid-light

// Belt
const yl = '#ffd800'; // belt yellow
const yd = '#cc9900'; // belt dark

// Shoes
const sh = '#3350cc'; // shoe
const sd = '#2240aa'; // shoe dark

// Snow accent
const sw = '#e8f4ff'; // snow white accent

export const PLAYER_SPRITES = {
    // Standing idle - facing right
    idle_0: [
        [_, _, _, _, _, c3, c2, c2, c2, c3, _, _, _, _, _, _],
        [_, _, _, _, c3, c1, c2, c2, c1, c2, c3, _, _, _, _, _],
        [_, _, _, c4, c2, c1, c1, c2, c2, c2, c2, c4, _, _, _, _],
        [_, _, c4, c3, c3, c3, c3, c3, c3, c3, c3, c3, c4, _, _, _],
        [_, _, f4, f1, f2, f2, f1, f1, f2, f2, f2, f2, f4, _, _, _],
        [_, f4, f2, ew, ew, ei, f2, f2, ew, ew, ei, f2, f2, f4, _, _],
        [_, f4, f2, eg, ew, ep, f2, f2, eg, ew, ep, f2, f2, f4, _, _],
        [_, f4, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f4, _, _],
        [_, _, f4, pk, f2, f2, f2, f2, f2, f2, f2, pk, f4, _, _, _],
        [_, _, _, f4, f3, f2, mo, mo, f2, f3, f4, _, _, _, _, _],
        [_, _, _, _, f4, f4, f3, f3, f4, f4, _, _, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, b4, b3, b5, yl, yl, yl, yl, b5, b3, b4, _, _, _, _],
        [_, _, b4, b2, b1, b5, b2, b2, b5, b1, b2, b4, _, _, _, _],
        [_, _, b4, b3, b2, b2, b2, b2, b2, b2, b3, b4, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, _, b4, b4, b3, b2, b2, b3, b4, b4, _, _, _, _, _],
        [_, _, _, _, b4, b3, _, _, b3, b4, _, _, _, _, _, _],
        [_, _, _, sh, sd, b4, _, _, sh, sd, b4, _, _, _, _, _],
        [_, _, sh, sh, _, _, _, _, sh, sh, _, _, _, _, _, _],
    ],

    // Walking frame 1 - left foot forward
    walk_0: [
        [_, _, _, _, _, c3, c2, c2, c2, c3, _, _, _, _, _, _],
        [_, _, _, _, c3, c1, c2, c2, c1, c2, c3, _, _, _, _, _],
        [_, _, _, c4, c2, c1, c1, c2, c2, c2, c2, c4, _, _, _, _],
        [_, _, c4, c3, c3, c3, c3, c3, c3, c3, c3, c3, c4, _, _, _],
        [_, _, f4, f1, f2, f2, f1, f1, f2, f2, f2, f2, f4, _, _, _],
        [_, f4, f2, ew, ew, ei, f2, f2, ew, ew, ei, f2, f2, f4, _, _],
        [_, f4, f2, eg, ew, ep, f2, f2, eg, ew, ep, f2, f2, f4, _, _],
        [_, f4, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f4, _, _],
        [_, _, f4, pk, f2, f2, f2, f2, f2, f2, f2, pk, f4, _, _, _],
        [_, _, _, f4, f3, f2, mo, mo, f2, f3, f4, _, _, _, _, _],
        [_, _, _, _, f4, f4, f3, f3, f4, f4, _, _, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, b4, b3, b5, yl, yl, yl, yl, b5, b3, b4, _, _, _, _],
        [_, _, b4, b2, b1, b5, b2, b2, b5, b1, b2, b4, _, _, _, _],
        [_, _, b4, b3, b2, b2, b2, b2, b2, b2, b3, b4, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, _, _, b4, b3, b3, b3, b3, b4, _, _, _, _, _, _],
        [_, _, _, sh, sd, _, _, _, _, b4, b3, _, _, _, _, _],
        [_, _, sh, sh, _, _, _, _, _, _, sh, sh, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],

    // Walking frame 2 - right foot forward
    walk_1: [
        [_, _, _, _, _, c3, c2, c2, c2, c3, _, _, _, _, _, _],
        [_, _, _, _, c3, c1, c2, c2, c1, c2, c3, _, _, _, _, _],
        [_, _, _, c4, c2, c1, c1, c2, c2, c2, c2, c4, _, _, _, _],
        [_, _, c4, c3, c3, c3, c3, c3, c3, c3, c3, c3, c4, _, _, _],
        [_, _, f4, f1, f2, f2, f1, f1, f2, f2, f2, f2, f4, _, _, _],
        [_, f4, f2, ew, ew, ei, f2, f2, ew, ew, ei, f2, f2, f4, _, _],
        [_, f4, f2, eg, ew, ep, f2, f2, eg, ew, ep, f2, f2, f4, _, _],
        [_, f4, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f4, _, _],
        [_, _, f4, pk, f2, f2, f2, f2, f2, f2, f2, pk, f4, _, _, _],
        [_, _, _, f4, f3, f2, mo, mo, f2, f3, f4, _, _, _, _, _],
        [_, _, _, _, f4, f4, f3, f3, f4, f4, _, _, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, b4, b3, b5, yl, yl, yl, yl, b5, b3, b4, _, _, _, _],
        [_, _, b4, b2, b1, b5, b2, b2, b5, b1, b2, b4, _, _, _, _],
        [_, _, b4, b3, b2, b2, b2, b2, b2, b2, b3, b4, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, _, _, b4, b3, b3, b3, b3, b4, _, _, _, _, _, _],
        [_, _, _, b4, b3, _, _, _, _, sh, sd, _, _, _, _, _],
        [_, _, sh, sh, _, _, _, _, _, sh, sh, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],

    // Jumping - squished body, arms out
    jump_0: [
        [_, _, _, _, _, c3, c2, c2, c2, c3, _, _, _, _, _, _],
        [_, _, _, _, c3, c1, c2, c2, c1, c2, c3, _, _, _, _, _],
        [_, _, _, c4, c2, c1, c1, c2, c2, c2, c2, c4, _, _, _, _],
        [_, _, c4, c3, c3, c3, c3, c3, c3, c3, c3, c3, c4, _, _, _],
        [_, _, f4, f1, f2, f2, f1, f1, f2, f2, f2, f2, f4, _, _, _],
        [_, f4, f2, ew, ew, ei, f2, f2, ew, ew, ei, f2, f2, f4, _, _],
        [_, f4, f2, eg, ew, ep, f2, f2, eg, ew, ep, f2, f2, f4, _, _],
        [_, f4, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f4, _, _],
        [_, _, f4, pk, f2, f2, f2, f2, f2, f2, f2, pk, f4, _, _, _],
        [_, _, _, f4, f3, f3, f3, f3, f3, f3, f4, _, _, _, _, _],
        [_, _, _, _, f4, f4, f4, f4, f4, f4, _, _, _, _, _, _],
        [_, b4, b3, b3, b2, b2, b2, b2, b2, b2, b3, b3, b4, _, _, _],
        [b4, b3, b5, b2, b1, yl, yl, yl, yl, b1, b2, b5, b3, b4, _, _],
        [b4, b2, b1, b5, b2, b2, b2, b2, b2, b2, b5, b1, b2, b4, _, _],
        [_, b4, b3, b2, b2, b2, b2, b2, b2, b2, b2, b3, b4, _, _, _],
        [_, _, b4, b3, b3, b2, b2, b2, b2, b3, b3, b4, _, _, _, _],
        [_, _, _, b4, b4, b3, b2, b2, b3, b4, b4, _, _, _, _, _],
        [_, _, sh, sd, _, b4, _, _, b4, _, sh, sd, _, _, _, _],
        [_, sh, sh, _, _, _, _, _, _, _, _, sh, sh, _, _, _],
        [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
    ],

    // Shooting - arm extended with snow
    shoot_0: [
        [_, _, _, _, _, c3, c2, c2, c2, c3, _, _, _, _, _, _],
        [_, _, _, _, c3, c1, c2, c2, c1, c2, c3, _, _, _, _, _],
        [_, _, _, c4, c2, c1, c1, c2, c2, c2, c2, c4, _, _, _, _],
        [_, _, c4, c3, c3, c3, c3, c3, c3, c3, c3, c3, c4, _, _, _],
        [_, _, f4, f1, f2, f2, f1, f1, f2, f2, f2, f2, f4, _, _, _],
        [_, f4, f2, ew, ew, ei, f2, f2, ew, ew, ei, f2, f2, f4, _, _],
        [_, f4, f2, eg, ew, ep, f2, f2, eg, ew, ep, f2, f2, f4, _, _],
        [_, f4, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f2, f4, _, _],
        [_, _, f4, pk, f2, f2, mo, mo, mo, f2, f2, pk, f4, _, _, _],
        [_, _, _, f4, f3, f3, f3, f3, f3, f3, f4, _, _, _, _, _],
        [_, _, _, _, f4, f4, f3, f3, f4, f4, _, _, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, sw, sw, _, _, _],
        [_, _, b4, b3, b5, yl, yl, yl, b5, b3, b4, sw, f1, sw, _, _],
        [_, _, b4, b2, b1, b5, b2, b2, b5, b1, b2, b4, sw, sw, _, _],
        [_, _, b4, b3, b2, b2, b2, b2, b2, b2, b3, b4, _, _, _, _],
        [_, _, _, b4, b3, b2, b2, b2, b2, b3, b4, _, _, _, _, _],
        [_, _, _, b4, b4, b3, b2, b2, b3, b4, b4, _, _, _, _, _],
        [_, _, _, _, b4, b3, _, _, b3, b4, _, _, _, _, _, _],
        [_, _, _, sh, sd, b4, _, _, sh, sd, b4, _, _, _, _, _],
        [_, _, sh, sh, _, _, _, _, sh, sh, _, _, _, _, _, _],
    ],
};
