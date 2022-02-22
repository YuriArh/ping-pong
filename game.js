
const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let x = canvas.width/2;
let y = canvas.height-30;
let ballRadius = 10;
let dx = 2;
let dy = -2;

function drawPuddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// document.addEventListener("keydown", (event) => {
//     if (event.code == 'ArrowLeft') {
//         puddleLeft();
//     }
// } )

// document.addEventListener("keydown", (event) => {
//     if (event.code == 'ArrowRight') {
//         puddleRight();
//     }
// } )

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPuddle();
    if (y + dy < ballRadius) {
        dy = -dy;
        console.log('верх и низ')
    } else if (y + dy > canvas.height - ballRadius) {
        if (x < paddleX + paddleWidth && x > paddleX) {
            dy = -dy;
            console.log(x)
            console.log(paddleX)
        } else {
            console.log(x)
            console.log(paddleX)
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
        
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        console.log('лево право')
    }

    x += dx;
    y += dy;

    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

const interval = setInterval(draw, 10);











