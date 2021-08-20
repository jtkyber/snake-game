import { changeDirection, move, moveBody, gameOver, setGameOver } from './move.js';
import { setFood, foodEaten } from './food.js';
import { body, addBodyPart, bodyCollision } from './body.js';

const snakeHead = document.querySelector('.snakeHead');
const food = document.querySelector('.food');
const game = document.querySelector('.game');
const gameOverText = document.querySelector('.gameOver');

export const lastHeadDirection = () => {
    if (body.length > 1) {
        return body[body.length-2].moves[0].direction;
    } else {
        if (snakeHead.classList.contains('left')) {
            return 'left';
        }

        if (snakeHead.classList.contains('right')) {
            return 'right';
        }

        if (snakeHead.classList.contains('up')) {
            return 'up';
        }

        if (snakeHead.classList.contains('down')) {
            return 'down';
        }
    }
}

let lastRenderTime = 0;
const frameRate = 70;

const main = (currentTime) => {
    if (bodyCollision()) {
        setGameOver();
    }

    if (!gameOver) {
        window.requestAnimationFrame(main);
    } else {
        gameOverText.style.zIndex = 100;
    }

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / frameRate) return;
    lastRenderTime = currentTime;

    move();
    if (foodEaten(snakeHead, food)) {
        setFood();
        addBodyPart();
        if (body.length > 1) {
            if (body[body.length-2].moves[1]) {
                body[body.length-1].moves.push({left: null, top: null, direction: body[body.length-2].moves[0].direction});
                for (let i = 1; i < body[body.length-2].moves.length; i++) {
                    body[body.length-1].moves.push(body[body.length-2].moves[i]);
                }
            } else {
                body[body.length-1].moves.push({left: null, top: null, direction: lastHeadDirection()});
            }
        } else body[body.length-1].moves.push({left: null, top: null, direction: lastHeadDirection()});
    }
    moveBody();
}

window.requestAnimationFrame(main);

document.addEventListener('keydown', e => {
    if ((e.keyCode === 37 || e.keyCode === 65) && !snakeHead.classList.contains('left')) {
        changeDirection('left');
    }

    if ((e.keyCode === 39 || e.keyCode === 68) && !snakeHead.classList.contains('right')) {
        changeDirection('right');
    }

    if ((e.keyCode === 38 || e.keyCode === 87) && !snakeHead.classList.contains('up')) {
        changeDirection('up');
    }

    if ((e.keyCode === 40 || e.keyCode === 83) && !snakeHead.classList.contains('down')) {
        changeDirection('down');
    }
})
