//Necessary in EVERY Canvas project
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// JavaScript code goes here
// Code that gives position
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var colors = ["blue", "green", "red", "yellow"]
//Paddle to control, bounce ball off of
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
//Defined the number of rows and columns of bricks , their width and height, the padding between the bricks so they won't touch each other
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var bricks = [];
//loop through the rows and columns and create the new bricks
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}


//Since keys aren't pressed at first, start with false, then as pressed, change to true in function
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Adds functionality to mouse controlling the paddle
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Using b.(rick)status from drawbricks(), if ball has touched brick, it sets it value to 0, therefore erasing it
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}


//Sets score for the game
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

//Gives players live for game
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


//gives random colors, from the array of colors that I have given above
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// randomColor(colors);
console.log(randomColor(colors));

function drawBall() {
    ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//Draws bricks, without coordinate such as (0,0), delete if ball has touched them
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function draw() {
    //clears the ball line, so it doesn't leave a trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    // x += dx;
    // y += dy;
    //Controls the bouncing effect of the balls from all edges of the canvas, from the edge of the circumf.
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        // ctx.fillStyle = randomColor(colors);
        //trying to change color of ball every time it hits wall
        // Math.floor(Math.random() * colors.length)
        dx = -dx;
    }
    //Instead of ball being able to hit all 4 corners, now if it hits bottom, without radius of ball touching panel, it will alert, "GAME OVER"
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
        requestAnimationFrame(draw);
    }

//Controls paddles, goes left and right
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}
var interval = setInterval(draw, 10);