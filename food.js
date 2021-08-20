const food = document.querySelector('.food');
const gameBoard = document.querySelector('.game');

export const setFood = () => {
    food.style.left = `${Math.floor(Math.random() * ((gameBoard.getBoundingClientRect().width - 25) - 25) + 25)}px`;
    food.style.top = `${Math.floor(Math.random() * ((gameBoard.getBoundingClientRect().height - 25) - 25) + 25)}px`;
}

export const foodEaten = (snake, food) => {
    let d1Offset = $(snake).offset();
    let d1Height = $(snake).outerHeight(true);
    let d1Width = $(snake).outerWidth(true);
    let d1Top = d1Offset.top + d1Height;
    let d1Left = d1Offset.left + d1Width;
    let d2Offset = $(food).offset();
    let d2Height = $(food).outerHeight(true);
    let d2Width = $(food).outerWidth(true);
    let d2Top = d2Offset.top + d2Height;
    let d2Left = d2Offset.left + d2Width;

    const colliding = !(d1Top <= d2Offset.top + 2 || d1Offset.top >= d2Top - 2 || d1Left <= d2Offset.left + 2 || d1Offset.left >= d2Left - 2);

    return colliding;
}
