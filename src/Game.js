import { Board } from 'board'

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.board = new Board(this.context)
        this.isGameOver = false
        this.setupControls()
    }

    start() {
        this.update()
    }

    update() {
        if (this.isGameOver) {
            this.showGameOver()
            return
        }

        if (!this.board.moveActiveTetrominoDown()) {
            this.board.lockTetromino()
            this.board.clearFullRows()
            this.board.spawnNewTetromino()

            const { activeTetromino, grid } = this.board

            if (!activeTetromino.isWithinBounds(grid)) {
                this.isGameOver = true
            }
        }

        this.board.draw()
        setTimeout(() => requestAnimationFrame(() => this.update()), 700)
    }

    showGameOver() {
        const gameOver = document.getElementById('game-over')
        gameOver.classList.remove('hidden')
    }

    setupControls() {
        window.addEventListener('keydown', (event) => {
            if (this.isGameOver) return

            switch (event.key) {
                case 'ArrowLeft':
                    this.board.moveTetrominoLeft()
                    break
                case 'ArrowRight':
                    this.board.moveTetrominoRight()
                    break
                case 'ArrowDown':
                    this.board.moveActiveTetrominoDown()
                    break
                case ' ':
                    this.board.rotateTetromino()
                    break;
            }
            this.board.draw()
        })
    }
}
