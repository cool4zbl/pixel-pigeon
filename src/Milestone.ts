import { backgroundSpeed } from "./consts";

interface IMilestone {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    coins?: number;


    update(deltaTime: number): void;

    draw(): void;
}

export class Milestone implements IMilestone {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    coins: number;

    constructor(
        private ctx: CanvasRenderingContext2D,
        x: number | undefined,
        y: number | undefined,
        width = 50,
        height = 50,
        color = '#4e5',
        coins = 10
    ) {
        this.id = (Math.random() * 10).toString(36) + Date.now().toString(36);

        this.x = typeof x === 'number' ? x : ctx.canvas.width;
        this.y = typeof y === 'number' ? y : ctx.canvas.height / 2 - height / 2
        this.width = width;
        this.height = height;
        this.color = color;

        this.coins = coins;
    }

    update(deltaTime: number) {
        this.x -= backgroundSpeed * deltaTime;

        if (this.x + this.width < 0) {
            this.destroy()
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    destroy() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

}
