export class Tetromino {
    constructor(shape, blockSize, canvasWidth, y = 0) {
        this.shape = shape
        this.blockSize = blockSize
        this.x = Math.floor((canvasWidth / 2) / blockSize - 1)
        this.y = y
    }

    moveDown() {
        this.y += 1
    }

    moveLeft() {
        this.x -= 1
    }

    moveRight() {
        this.x += 1
    }

    isWithinBounds(grid) {
        return this.shape.every((row, rowIdx) => {
            return row.every((cell, colIdx) => {
                const x = this.x + colIdx
                const y = this.y + rowIdx

                return cell === 0 ||
                    (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] === 0)
            })
        })
    }
}
