interface IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
    avatar?: string;

    jump(): void;

    update(deltaTime: number): void;

    draw(): void;
}

export class Player implements IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    avatar: string;

    #isJumping = false;
    #velocityY = 0;
    #gravity = 1700;
    #jumpForce = -600;
    readonly #groundY: number;

    constructor(
        private ctx: CanvasRenderingContext2D,
        x: number | undefined = 30,
        y: number | undefined,
        width = 80,
        height = 80,
        color: string | undefined = '#e40',
        avatar: string | undefined = './assets/player.png'
    ) {
        this.x = x;
        this.y = typeof y === 'number' ? y : ctx.canvas.height - height - 30;
        this.width = width;
        this.height = height;
        this.color = color;

        this.avatar = avatar;

        this.#groundY = this.y;
    }

    jump() {
        // comment out the following line to allow multiple jumps
        // if (this.#isJumping) return

        this.#isJumping = true
        this.#velocityY = this.#jumpForce
    }

    update(deltaTime: number) {
        const dt = deltaTime / 1000

        if (this.#isJumping) {
            this.#velocityY += this.#gravity * dt
            this.y += this.#velocityY * dt

            // check if player is on the ground
            if (this.y >= this.#groundY) {
                this.y = this.#groundY
                this.#isJumping = false
                this.#velocityY = 0
            }
            if (this.y <= 0) {
                this.y = 0
                this.#velocityY = 0
            }
        }

    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw image
        const avatar = new Image()
        avatar.src = this.avatar
        this.ctx.drawImage(avatar, this.x, this.y, this.width, this.height)
    }
}
