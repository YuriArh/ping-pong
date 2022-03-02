
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

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let live = 3;

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
document.addEventListener('mousemove', mouseMoveHandler);

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

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    
    if (relativeX > 0 && relativeX < canvas.width) {
        console.log(relativeX);
        paddleX = relativeX - paddleWidth/2;
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
    ballObj = {x}
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPuddle();
    drawBricks();
    collision();
    drawScore();
    drawLives();
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x < paddleX + paddleWidth && x > paddleX) {
            dy = -dy;
        } else {
            live--;
            if (!live) {
                alert('Ты проиграл...')
                document.location.reload();
                clearInterval(interval);
            } else {
                x = canvas.width/2;
                y = canvas.height-30;
                paddleX = (canvas.width - paddleWidth) / 2;
                dx = 2;
                dy = -2;
            }
        }
    }
        
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
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

let bricks = [];

for(let i=0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for(let k=0; k<brickRowCount; k++) {
        bricks[i][k] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    
    for(let i=0; i < bricks.length; i++) {
        for(let k = 0; k < bricks[i].length; k++) {
            if (bricks[i][k].status == 1) {
                const brickX =(i*(brickWidth+brickPadding)) + brickOffsetLeft;
                const brickY =(k*(brickHeight+brickPadding)) + brickOffsetTop;
                bricks[i][k].x = brickX;
                bricks[i][k].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                // console.log(bricks[i][k].status);
            }
        }
    }
    // for(var c=0; c<brickColumnCount; c++) {
    //     for(var r=0; r<brickRowCount; r++) {
    //         bricks[c][r].x = 0;
    //         bricks[c][r].y = 0;
    //         console.log(bricks[c][r])
    //     }
    // }
}


function collision() {
    for(let i=0; i < bricks.length; i++) {
        for(let k = 0; k < bricks[i].length; k++) {
            let brickObj = bricks[i][k];
            if (brickObj.status == 1) {
                    if (x > brickObj.x && x < brickObj.x + brickWidth && y > brickObj.y && y < brickObj.y + brickHeight) {
                        dy = -dy;
                        brickObj.status = 0;
                        ctx.clearRect(bricks[i][k].x, bricks[i][k].y, brickWidth, brickHeight)
                        score += 1;
                        if (score == brickColumnCount * brickRowCount) {
                            alert('ТЫ ПОБЕДИЛ, ПОЗДРАВЛЯЮ!!!');
                            document.location.reload();
                            clearInterval(interval);
                        }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Счет: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Жизни: "+live, canvas.width - 75, 20);
}



// function getBricks() {
//     for(let i=0; i < brickColumnCount; i++) {
//         bricks[i] = [];
//         for(let r=0; r<brickRowCount; r++) {
//             bricks[i][r] = { x: 0, y: 0 };
//         }
//     }
    
// }
// getBricks()
// console.log(bricks[1])    






const interval = setInterval(draw, 10);







