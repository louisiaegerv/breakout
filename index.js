let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// BALL INFO
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 4;
var dy = -4;
var rx = 5;
var ballRadius = 25;

// PADDLE INFO
var paddleHeight = 10;
var paddleWidth = 175;
var paddleSpeed = 10;
var paddleX = (canvas.width-paddleWidth)/2;

// BRICK INFO
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

var colors = ["red", "green", "blue", "yellow", "black", "white"];
var color = colors[1];

var gameOver = false;

//--------------
//Controls
//--------------
var rightPressed = false;
var leftPressed = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  checkCollision();
  drawBall();
  drawPaddle();
  moveBall();
  movePaddle();
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
  ctx.fillStyle = "black";
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
          if(!gameOver){
            alert("Game Over");
            gameOver = true;
            document.location.reload();
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
                    dy = -dy;
                    b.active = false;
                    changeColor();
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
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 30);
