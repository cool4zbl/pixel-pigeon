import {Player} from "./Player";

console.log('Hello World From PixelPigeon!');

const canvasWidth = 1200;
const canvasHeight = 300;
const backgroundColor = '#111';
const playerWidth = 50;
const playerHeight = 70;
const playerColor = '#e40';

const container = document.getElementById('game-container');
if (!container) {
    throw new Error('No game-container');
}

const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
container.appendChild(canvas);

const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('2d context not available');
}

const backgroundImage = new Image();
backgroundImage.src = 'assets/bg-new.png';

let backgroundX = 0
const backgroundSpeed = 0.2

const player = new Player(ctx, 30, undefined, playerWidth, playerHeight, playerColor);

window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space') {
        player.jump();
    }
})


function drawBackground(ctx: CanvasRenderingContext2D, deltaTime: number) {
    backgroundX -= backgroundSpeed * deltaTime;

    // reset background position for infinite scrolling
    if (backgroundX < -canvas.width) {
        backgroundX = 0;
    }

    // draw background image twice to fill canvas
    ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
}

function renderGame(ctx: CanvasRenderingContext2D, deltaTime: number) {
    // set background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage.complete) {
        drawBackground(ctx, deltaTime)
    }

    player.draw();
}

function updateGame(deltaTime: number) {
    player.update(deltaTime);

}

let lastTime = 0;

function gameLoop(time: number) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    renderGame(ctx!, deltaTime);

    updateGame(deltaTime);

    requestAnimationFrame(gameLoop);
}

backgroundImage.onload = () => {
    requestAnimationFrame(gameLoop);
}
