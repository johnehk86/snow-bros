import { GRAVITY, MAX_FALL_SPEED, GAME_HEIGHT, GAME_WIDTH } from './utils/constants.js';

export function applyGravity(entity) {
    entity.vy += entity.gravity ?? GRAVITY;
    if (entity.vy > MAX_FALL_SPEED) {
        entity.vy = MAX_FALL_SPEED;
    }
}

export function applyVelocity(entity) {
    entity.x += entity.vx;
    entity.y += entity.vy;
}

export function wrapVertical(entity) {
    // Wrap around: fall off bottom → appear at top
    if (entity.y > GAME_HEIGHT + entity.h) {
        entity.y = -entity.h;
    }
    // Wrap around: jump off top → appear at bottom
    if (entity.y < -entity.h - 8) {
        entity.y = GAME_HEIGHT + entity.h - 8;
    }
}

export function wrapHorizontal(entity) {
    // Wrap around left/right edges
    if (entity.x + entity.w < 0) {
        entity.x = GAME_WIDTH;
    } else if (entity.x > GAME_WIDTH) {
        entity.x = -entity.w;
    }
}
