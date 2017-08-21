let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

//--------------
// BALL INFO
//--------------
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 4;
var dy = -4;
var rx = 5;
var ballRadius = 25;

//--------------
// PADDLE INFO
//--------------
var paddleHeight = 10;
var paddleWidth = 175;
var paddleSpeed = 10;
var paddleX = (canvas.width-paddleWidth)/2;

//--------------
// BRICK INFO
//--------------
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 20;
var brickOffsetLeft = 30;
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, active: true };
    }
}

var colors = ["#FF4136", "#0074D9", "#7FDBFF", "#01FF70", "#FFDC00", "#FF851B", "#B10DC9", "#3D9970"];
var color = colors[1];

//--------------
// GAME INFO
//--------------
var gameOver = false;
var score = 0;
var lives = 3;

//--------------
// CONTROLS
//--------------
var rightPressed = false;
var leftPressed = false;

//--------------
// DRAW FUNCTIONS
//--------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  checkCollision();
  drawScore();
  drawLives();
  drawBall();
  drawPaddle();
  moveBall();
  movePaddle();
  requestAnimationFrame(draw);
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight * 2, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].active) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, 15);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  var lifeIcon = "+";
  ctx.fillText("Lives: " + lifeIcon.repeat(lives), canvas.width - 80, 15);
}

function moveBall() {
  if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius-paddleHeight) {
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          dy-=1;
      } else if(y > canvas.height-ballRadius){
          lives--;
          if(lives < 1 && !gameOver){
            alert("Game Over.\nScore: " + score);
            gameOver = true;
            document.location.reload();
          } else {
            dy = -dy;
          }
      }
  }

  x += dx;
  y += dy;
}
function movePaddle() {
  if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
}
function checkCollision() {
  for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.active) {
                if(x+ballRadius > b.x && x-ballRadius < b.x+brickWidth && y + ballRadius > b.y && y - ballRadius< b.y+brickHeight) {
                    changeColor();
                    dy = -dy;
                    b.active = false;
                    score+=100;
                    if(score == 1500) {
                      alert("Congratulations! You won with a score of " + score);
                      document.location.reload();
                    }
                }
            }
        }
    }
}
function changeColor() {
  color =  colors[Math.floor(Math.random() * colors.length)+1];
}
function changeBallSize() {
  if(ballRadius > 100) {
    rx = -rx;
  } else if (ballRadius < 10){
    rx = -rx;
  }
  ballRadius = rx + ballRadius
}

function keyDownHandler(e) {
  // Getting practice with switches and if's
  // I changed it up on purpose
  switch(e.keyCode){
    case 37:
      leftPressed = true;
      break;
    case 39:
      rightPressed = true;
      break;
  }

}
function keyUpHandler(e) {
  if(e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX + paddleX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();
