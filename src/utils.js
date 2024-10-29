import { Tetromino } from 'tetromino';
import { canvas } from 'main';

export function getRandomTetromino(blockSize) {
    const tetrominos = [
        [[1]],
        [[1, 1]],
        [[1, 1, 1]],
        [[1, 1, 1, 1]],
        [
            [1, 1],
            [1, 1]
        ],
        [
            [1, 0],
            [1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 1]
        ],
        [
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 0, 1],
            [1, 1, 1]
        ],
        [
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 1],
            [1, 0, 0],
            [1, 0, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
    ]

    const randomTetrominoIdx = Math.floor(Math.random() * tetrominos.length)

    return new Tetromino(tetrominos[randomTetrominoIdx], blockSize, canvas.width)
}
