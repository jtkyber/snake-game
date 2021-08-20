import { lastHeadDirection } from './index.js';

export const body = [];

const snakeHead = document.querySelector('.snakeHead');

const newPartPositionX = (part, dir) => {
    const pieceWidth = part.getBoundingClientRect().width*2;
    switch (dir) {
        case 'left':
            return `${part.offsetLeft + pieceWidth}px`
            break;
        case 'right':
            return `${part.offsetLeft - pieceWidth}px`
            break;
        default:
            return `${part.offsetLeft}px`;
    }
}

const newPartPositionY = (part, dir) => {
    const pieceHeight = part.getBoundingClientRect().height*2;
    switch (dir) {
        case 'up':
            return `${part.offsetTop + pieceHeight}px`
            break;
        case 'down':
            return `${part.offsetTop - pieceHeight}px`
            break;
        default:
            return `${part.offsetTop}px`;
    }
}

export const addBodyPart = () => {
    let lastPart = '';
    let lastPartDir = '';

    if (body.length < 1) {
        lastPart = snakeHead;
        lastPartDir = lastHeadDirection();
    } else {
        lastPart = body[body.length-1].part;
        lastPartDir = body[body.length-1].moves[0].direction;
    }

    const snake = document.querySelector('.snake');
    const newPart = document.createElement('li');
    newPart.classList.add('bodyPart');
    newPart.style.left = newPartPositionX(lastPart, lastPartDir);
    newPart.style.top = newPartPositionY(lastPart, lastPartDir);
    snake.appendChild(newPart);
    body.push({part: newPart, moves: []});
}

export const bodyCollision = () => {
    for (let piece of body) {
        const part = piece.part;
        let d1Offset = $(snakeHead).offset();
        let d1Height = $(snakeHead).outerHeight(true);
        let d1Width = $(snakeHead).outerWidth(true);
        let d1Top = d1Offset.top + d1Height;
        let d1Left = d1Offset.left + d1Width;
        let d2Offset = $(part).offset();
        let d2Height = $(part).outerHeight(true);
        let d2Width = $(part).outerWidth(true);
        let d2Top = d2Offset.top + d2Height;
        let d2Left = d2Offset.left + d2Width;

        const colliding = !(d1Top <= d2Offset.top + 2 || d1Offset.top >= d2Top - 2 || d1Left <= d2Offset.left + 2 || d1Offset.left >= d2Left - 2);
        if (colliding) {
            return colliding;
        }
    }
}
