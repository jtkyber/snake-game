import { body } from './body.js';

const snakeHead = document.querySelector('.snakeHead');
const gameBoard = document.querySelector('.game');

export let gameOver = false;
export const setGameOver = () => {
    gameOver = !gameOver;
}
const moveSpeed = 6;

export const changeDirection = (dir) => {
    for (let part of body) {
        part.moves.push({left: snakeHead.offsetLeft, top: snakeHead.offsetTop, direction: dir});
    }

    if (snakeHead.classList.contains('left')) {snakeHead.classList.remove('left')}
    if (snakeHead.classList.contains('right')) {snakeHead.classList.remove('right')}
    if (snakeHead.classList.contains('up')) {snakeHead.classList.remove('up')}
    if (snakeHead.classList.contains('down')) {snakeHead.classList.remove('down')}

    snakeHead.classList.add(dir);
    // if (body[body.length-2]) {
    //     console.log(body[body.length-2].moves[0], body[body.length-2].moves[1]);
    // }

}

export const move = () => {
    if ((snakeHead.offsetLeft > 0) && snakeHead.classList.contains('left')) {
        snakeHead.style.left = `${snakeHead.offsetLeft - moveSpeed}px`;
    } else if ((snakeHead.offsetLeft < gameBoard.getBoundingClientRect().width - snakeHead.getBoundingClientRect().width) && snakeHead.classList.contains('right')) {
        snakeHead.style.left = `${snakeHead.offsetLeft + moveSpeed}px`;
    } else if ((snakeHead.offsetTop > 0) && snakeHead.classList.contains('up')) {
        snakeHead.style.top = `${snakeHead.offsetTop - moveSpeed}px`;
    } else if ((snakeHead.offsetTop < gameBoard.getBoundingClientRect().height - snakeHead.getBoundingClientRect().height) && snakeHead.classList.contains('down')) {
        snakeHead.style.top = `${snakeHead.offsetTop + moveSpeed}px`;
    }

    if ((snakeHead.offsetLeft <= 0) || (snakeHead.offsetLeft >= gameBoard.getBoundingClientRect().width - snakeHead.getBoundingClientRect().width) || (snakeHead.offsetTop <= 0) || (snakeHead.offsetTop >= gameBoard.getBoundingClientRect().height - snakeHead.getBoundingClientRect().height)) {
        gameOver = true;
    }
}

export const moveBody = () => {
    for (let piece of body) {
        const part = piece.part;
        let moveLeft;
        let moveTop;
        if (piece.moves[1]) {
            moveLeft = piece.moves[1].left;
            moveTop = piece.moves[1].top;
        } else {
            moveLeft = piece.moves[0].left;
            moveTop = piece.moves[0].top;
        }
        const moveDir = piece.moves[0].direction;
        if (move !== undefined) {
            switch (moveDir) {
                case 'left':
                    part.style.left = `${part.offsetLeft - moveSpeed}px`;
                    break;
                case 'right':
                    part.style.left = `${part.offsetLeft + moveSpeed}px`;
                    break;
                case 'up':
                    part.style.top = `${part.offsetTop - moveSpeed}px`;
                    break;
                case 'down':
                    part.style.top = `${part.offsetTop + moveSpeed}px`;
                    break;
                default: null;
            }
            if ((part.offsetLeft === moveLeft) && (part.offsetTop === moveTop)) {
                piece.moves.shift();
            }
        }
    }
}
