interface IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    update(deltaTime: number): void;

    draw(): void;
}

export class Player implements IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(
        private ctx: CanvasRenderingContext2D,
        x: number | undefined = 30,
        y: number | undefined,
        width = 50,
        height = 70,
        color = '#e40'
    ) {
        this.x = x;
        this.y = typeof y === 'number' ? y : ctx.canvas.height - height - 30;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    update(deltaTime: number) {
        // TODO: move player based on input

    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
