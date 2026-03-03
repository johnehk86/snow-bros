export function aabb(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

/**
 * Check and resolve platform collisions for an entity.
 * Platforms are one-way: entity can pass through from below,
 * but lands on top when falling.
 */
export function resolvePlatformCollisions(entity, platforms) {
    entity.onGround = false;

    for (const plat of platforms) {
        // Only check if entity is falling or standing
        if (entity.vy < 0) continue;

        // Entity feet position (previous and current)
        const entityBottom = entity.y + entity.h;
        const prevBottom = entityBottom - entity.vy;

        // One-way platform: only collide if entity was above platform top last frame
        if (prevBottom > plat.y + 2) continue;

        // Check horizontal overlap
        if (entity.x + entity.w <= plat.x || entity.x >= plat.x + plat.w) continue;

        // Check vertical overlap
        if (entityBottom >= plat.y && entityBottom <= plat.y + plat.h + entity.vy) {
            entity.y = plat.y - entity.h;
            entity.vy = 0;
            entity.onGround = true;
        }
    }

    return entity.onGround;
}

/**
 * Check and resolve wall collisions (solid blocks).
 */
export function resolveWallCollisions(entity, walls) {
    for (const wall of walls) {
        if (!aabb(entity, wall)) continue;

        // Calculate overlap on each side
        const overlapLeft = (entity.x + entity.w) - wall.x;
        const overlapRight = (wall.x + wall.w) - entity.x;
        const overlapTop = (entity.y + entity.h) - wall.y;
        const overlapBottom = (wall.y + wall.h) - entity.y;

        // Find minimum overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapLeft) {
            entity.x = wall.x - entity.w;
            if (entity.vx > 0) entity.vx = 0;
        } else if (minOverlap === overlapRight) {
            entity.x = wall.x + wall.w;
            if (entity.vx < 0) entity.vx = 0;
        } else if (minOverlap === overlapTop) {
            entity.y = wall.y - entity.h;
            entity.vy = 0;
            entity.onGround = true;
        } else {
            entity.y = wall.y + wall.h;
            if (entity.vy < 0) entity.vy = 0;
        }
    }
}
