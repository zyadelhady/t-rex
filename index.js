"use strict";
const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const yourScore = document.getElementById('score');
let playerScore = 0;
let speed = 2;
let score = 0;
let gameOver = false;
let baseImage1X = 0;
let baseImage1Y = 0;
let newTrap = 0;
let trap2X;
let baseImage2X = canvas.width;
let baseImage2Y = 0;
let dinoX = 0;
let dinoY = canvas.height - 75;
let isJump = false;
let isLand = false;
let traps = [
    { x: 800, y: canvas.height - 61 },
    { x: 1200, y: canvas.height - 61 },
    { x: 1600, y: canvas.height - 61 },
];
const draw = (color, x, y, width, height) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};
const jump = () => {
    if (isJump) {
        dinoY -= 2;
    }
    if (dinoY <= 435) {
        isLand = true;
        isJump = false;
    }
};
const land = () => {
    if (isLand) {
        dinoY += 2;
    }
    if (dinoY >= canvas.height - 75) {
        dinoY = canvas.height - 75;
        isLand = false;
    }
};
const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * Math.floor(max)) + min;
};
window.onload = () => {
    const gameLoop = () => {
        draw('white', 0, 0, canvas.width, canvas.height);
        if (gameOver) {
            canvasContext.fillStyle = 'grey';
            canvasContext.font = '50px VT323';
            canvasContext.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
            canvasContext.fillText('CLICK TO CONTINUE', canvas.width / 2 - 170, canvas.height / 2 + 70);
            traps = [
                { x: 800, y: canvas.height - 61 },
                { x: 1200, y: canvas.height - 61 },
                { x: 1600, y: canvas.height - 61 },
            ];
            score = 0;
            canvas.addEventListener('click', () => {
                gameOver = false;
                console.log(gameOver);
            });
        }
        else {
            score++;
            let baseImage = new Image();
            baseImage.src = './dinobackground.png';
            canvasContext.drawImage(baseImage, baseImage1X, baseImage1Y, canvas.width, canvas.height);
            canvasContext.drawImage(baseImage, baseImage2X, baseImage2Y, canvas.width, canvas.height);
            baseImage1X -= speed;
            baseImage2X -= speed;
            if (baseImage1X <= -800) {
                baseImage1X = canvas.width;
            }
            if (baseImage2X <= -800) {
                baseImage2X = canvas.width;
            }
            document.addEventListener('keydown', (e) => {
                if ((e.keyCode === 32 || e.keyCode === 38) &&
                    isJump === false &&
                    isLand === false) {
                    isJump = true;
                }
            }, {
                once: true,
            });
            jump();
            land();
            let dinoImage = new Image();
            dinoImage.src = './dinosaur.png';
            canvasContext.drawImage(dinoImage, dinoX, dinoY);
            let cactusImage = new Image();
            cactusImage.src = './cactus.png';
            let cactusImage2 = new Image();
            cactusImage2.src = './cactus2.png';
            if (traps[0].x < -50) {
                traps[0].x = getRandomInt(1000, 800);
            }
            if (traps[1].x < -50) {
                traps[1].x = getRandomInt(1400, 1150);
            }
            if (traps[2].x < -50) {
                traps[2].x = getRandomInt(1800, 1550);
            }
            canvasContext.drawImage(cactusImage, traps[0].x, traps[0].y);
            canvasContext.drawImage(cactusImage2, traps[1].x, traps[1].y);
            canvasContext.drawImage(cactusImage2, traps[2].x, traps[2].y);
            traps[0].x -= speed;
            traps[1].x -= speed;
            traps[2].x -= speed;
            canvasContext.fillStyle = 'grey';
            canvasContext.font = '20px VT323';
            canvasContext.fillText('SCORE', 650, 400);
            canvasContext.fillText(`${score}`, 750, 400);
            for (let i = 0; i < traps.length; i++) {
                if (dinoX >= traps[i].x - 20 &&
                    dinoX <= traps[i].x + 40 &&
                    dinoY >= traps[i].y - 40) {
                    gameOver = true;
                }
            }
        }
        return requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
};
