let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 4;
var dy = 4;
var rx = 5;
var ballRadius = 25;
var colors = ["red", "green", "blue", "yellow", "black", "white"];
var color = colors[1];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  moveBall();
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function moveBall() {
  if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
    changeColor();
  }
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
    dy = -dy;
    changeColor();
  }

  x += dx;
  y += dy;
}
function changeColor() {
  if(ballRadius > 100) {
    rx = -rx;
  } else if (ballRadius < 10){
    rx = -rx;
  }
  ballRadius = rx + ballRadius
  console.log(ballRadius);
  color =  colors[Math.floor(Math.random() * colors.length)+1];
}
setInterval(draw, 30);
