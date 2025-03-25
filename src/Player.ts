import { playerAvatar, playerColor, playerName } from "./consts";

interface IPlayer {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
    avatar?: string;
    name?: string;

    score: number;

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
    name: string;

    score: number;

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
        color: string | undefined = playerColor,
        avatar: string | undefined = playerAvatar,
        name: string | undefined = playerName
    ) {
        this.x = x;
        this.y = typeof y === 'number' ? y : ctx.canvas.height - height - 30;
        this.width = width;
        this.height = height;
        this.color = color;

        this.avatar = avatar;
        this.name = name;
        this.score = 0;

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

    addCoins(coins: number) {
        this.score += coins
        console.log(`Score: ${this.score}`)

        this.ctx.fillStyle = '#fff'
        this.ctx.font = '20px Arial'
        this.ctx.textAlign = 'right'

        this.ctx.fillText(`Score: ${this.score}`, this.ctx.canvas.width - 10, 30)

        // remove coins from canvas
        // coins.forEach(coin => {
        //     coin.destroy()
        // })
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // draw image
        const avatar = new Image()
        avatar.src = this.avatar
        this.ctx.drawImage(avatar, this.x, this.y, this.width, this.height)

        // draw name
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = '#eee'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this.name, this.x + 30, this.y - 10)

        this.ctx.fillStyle = '#fff'
        this.ctx.font = '20px Arial'
        this.ctx.textAlign = 'right'

        this.ctx.fillText(`Score: ${this.score}`, this.ctx.canvas.width - 10, 30)
    }
}
