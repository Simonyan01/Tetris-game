import { getRandomTetromino } from 'utils'

export class Board {
    constructor(context) {
        this.grid = []
        this.blockSize = 25
        this.context = context
        this.activeTetromino = getRandomTetromino(this.blockSize)
    }

    draw() {
        const { canvas } = this.context

        this.context.clearRect(0, 0, canvas.width, canvas.height)
        this.drawGrid()
        this.drawTetromino()
        this.drawBlocks()
    }

    drawGrid() {
        const { width, height } = this.context.canvas

        const cols = Math.floor(width / this.blockSize)
        const rows = Math.floor(height / this.blockSize)
        this.context.strokeStyle = "#4e4f51"

        for (let x = 0; x <= cols; x++) {
            this.context.beginPath()
            this.context.moveTo(x * this.blockSize, 0)
            this.context.lineTo(x * this.blockSize, height)
            this.context.stroke()
        }

        for (let y = 0; y <= rows; y++) {
            this.context.beginPath()
            this.context.moveTo(0, y * this.blockSize)
            this.context.lineTo(width, y * this.blockSize)
            this.context.stroke()
        }
    }

    drawTetromino() {
        const { shape, x, y } = this.activeTetromino

        shape.forEach((row, rowIdx) =>
            row.forEach((cell, colIdx) => {
                if (cell) {
                    this.context.fillStyle = 'rgb(152, 22, 50)'
                    this.context.fillRect(
                        (x + colIdx) * this.blockSize,
                        (y + rowIdx) * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    )
                }
            })
        )
    }

    drawBlocks() {
        this.grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    this.context.fillStyle = 'green'
                    this.context.fillRect(
                        x * this.blockSize,
                        y * this.blockSize,
                        this.blockSize,
                        this.blockSize
                    )
                }
            })
        })
    }

    moveActiveTetrominoDown() {
        const { x, y } = this.activeTetromino

        if (this.canMove(x, y + 1)) {
            this.activeTetromino.moveDown()
            return true
        }
        return false
    }

    moveTetrominoLeft() {
        const { x, y } = this.activeTetromino

        if (this.canMove(x - 1, y)) {
            this.activeTetromino.moveLeft()
        }
    }

    moveTetrominoRight() {
        const { x, y } = this.activeTetromino

        if (this.canMove(x + 1, y)) {
            this.activeTetromino.moveRight()
        }
    }

    canMove(newX, newY) {
        const { width, height } = this.context.canvas
        const { shape } = this.activeTetromino

        return shape.every((row, rowIdx) => {
            return row.every((cell, colIdx) => {
                if (cell === 0) return true

                const x = newX + colIdx
                const y = newY + rowIdx

                return (
                    x >= 0 &&
                    x < Math.floor(width / this.blockSize) &&
                    y >= 0 &&
                    y < Math.floor(height / this.blockSize) &&
                    this.grid[y] && this.grid[y][x] === 0
                )
            })
        })
    }

    lockTetromino() {
        const { shape, x, y } = this.activeTetromino

        shape.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                if (cell) {
                    if (!this.grid[y + rowIdx]) {
                        this.grid[y + rowIdx] = []
                    }
                    this.grid[y + rowIdx][x + colIdx] = cell
                }
            })
        })
    }

    clearFullRows() {
        const { width, height } = this.context.canvas

        this.grid = this.grid.filter(row => !row.every(cell => cell !== 0))
        while (this.grid.length < Math.floor(height / this.blockSize)) {
            this.grid
                .unshift(Array(Math.floor(width / this.blockSize))
                    .fill(0))
        }
    }

    spawnNewTetromino() {
        const { width } = this.context.canvas

        this.activeTetromino = getRandomTetromino(this.blockSize, width);
    }

    rotateTetromino() {
        const { shape } = this.activeTetromino;

        this.activeTetromino.shape = shape[0].map((_, idx) => {
            return shape.map(row => row[idx]).reverse()
        })
    }
}
