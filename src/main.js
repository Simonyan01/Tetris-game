import { Game } from 'game'

export const canvas = document.getElementById('game-board')
canvas.width = 700
canvas.height = window.innerHeight

const game = new Game(canvas)

game.start()
