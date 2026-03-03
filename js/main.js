import { Renderer } from './renderer.js';
import { Input } from './input.js';
import { GameLoop } from './loop.js';
import { Game } from './game.js';

// Initialize
const canvas = document.getElementById('game-canvas');
const renderer = new Renderer(canvas);
const input = new Input();
const game = new Game(renderer, input);

// Game loop
const loop = new GameLoop(
    () => game.update(),
    () => game.render()
);

// Start
loop.start();

// Log for debugging
console.log('Snow Bros initialized!');
