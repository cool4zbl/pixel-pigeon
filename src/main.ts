import {Player} from "./Player";

console.log('Hello World From PixelPigeon!');

const canvasWidth = 1200;
const canvasHeight = 400;
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


const player = new Player(ctx, 30, undefined, playerWidth, playerHeight, playerColor);

let lastTime = 0;

function renderGame(ctx: CanvasRenderingContext2D) {
    // set background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();
}

function updateGame(deltaTime: number) {
    // console.log('updateGame', deltaTime);
    player.update(deltaTime);

}

function gameLoop(time: number) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    // TODO: 更新游戏状态（例如玩家位置、障碍物等）
    updateGame(deltaTime);

    // TODO: 渲染游戏画面（绘制背景、角色、障碍物等）
    renderGame(ctx!);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
