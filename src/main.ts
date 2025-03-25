import { Player } from "./Player";
import { Milestone } from "./Milestone";
import { backgroundColor, backgroundSpeed, canvasHeight, playerHeight, playerWidth } from "./consts";
import { isColliding } from "./utils";

console.log('Hello World From PixelPigeon!');

const canvasWidth = 1200;

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

const player = new Player(ctx, 30, undefined, playerWidth, playerHeight);

window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space') {
        player.jump();
    }
})

// milestones
const milestones: Milestone[] = []
const milestone = new Milestone(ctx, undefined, undefined, 50, 50, '#4e5', 10)
milestones.push(milestone);

setTimeout(() => {
    const milestone = new Milestone(ctx, undefined, undefined, 50, 50, '#45e', 20)
    milestones.push(milestone);
}, 5000)

setTimeout(() => {
    const milestone = new Milestone(ctx, undefined, undefined, 50, 50, '#5f4', 30)
    milestones.push(milestone);
}, 10000)

let lastTime = 0;

function gameLoop(time: number) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    // set background color
    ctx!.fillStyle = backgroundColor;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    // Draw scrolling background here if applicable
    if (backgroundImage.complete) {
        drawBackground(ctx!, deltaTime)
    }

    // Update and draw player
    player.update(deltaTime);
    player.draw();

    for (let i = 0; i < milestones.length; i++) {
        milestones[i].update(deltaTime);
        milestones[i].draw();

        if (isColliding(player, milestones[i])) {
            player.addCoins(milestones[i].coins);
            milestones[i].destroy();
            milestones.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(gameLoop);
}

backgroundImage.onload = () => {
    requestAnimationFrame(gameLoop);
}
