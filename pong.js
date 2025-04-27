//board
let board;
let boardWidth = 600;
let boardHeight = 600;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
  x: 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
  color: "blue",
};

let player2 = {
  x: boardWidth - playerWidth - 10,
  y: boardHeight / 2 - playerHeight / 2,
  width: playerWidth,
  height: playerHeight,
  velocityY: playerVelocityY,
  color: "blue",
};

let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1,
  velocityY: 2,
};

let player1Score = 0;
let player2Score = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // draw player 1
  context.fillStyle = player1.color;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  //draw the ball

  requestAnimationFrame(gameLoop);
  document.addEventListener("keydown", movePlayer);
  document.addEventListener("keyup", stopPlayer);
};

function gameLoop() {
  requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, boardWidth, boardHeight);

  context.fillStyle = player1.color;
  player1.y += player1.velocityY;
  context.fillRect(player1.x, player1.y, player1.width, player1.height);

  context.fillStyle = player2.color;
  player2.y += player2.velocityY;
  context.fillRect(player2.x, player2.y, player2.width, player2.height);

  // draw the ball
  context.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  if (ball.y == 0 || ball.y + ball.height >= boardHeight) {
    ball.velocityY = -ball.velocityY;
  } else if (detectCollision(ball, player1) || detectCollision(ball, player2)) {
    if (player2.x + player2.width > ball.x) {
      ball.velocityX = -ball.velocityX;
    } else if (player1.x < ball.x + ball.width) {
      ball.velocityX = -ball.velocityX;
    }
  }

  if (ball.x < 0) {
    // player 2 scores
    player2Score++;
    resetGame(1);
  }
  if (ball.x + ball.width > boardWidth) {
    // player 1 scores
    player1Score++;
    resetGame(-1);
  }

  context.font = "20px Arial";
  context.fillStyle = "white";
  context.fillText("Player 1: " + player1Score, 10, 20);
  context.fillText("Player 2: " + player2Score, boardWidth - 100, 20);

  for (let i = 0; i < board.height; i += 20) {
    context.fillStyle = "white";
    context.fillRect(boardWidth / 2, i, 5, 10);
  }
}

function movePlayer(e) {
  if (e.key === "ArrowUp") {
    player1.velocityY -= 1;
  } else if (e.key === "ArrowDown") {
    player1.velocityY += 1;
  }

  if (e.key === "w") {
    player2.velocityY -= 1;
  } else if (e.key === "s") {
    player2.velocityY += 1;
  }

  // Prevent the player from going out of bounds
  if (player1.y < 0) {
    player1.y = 0;
  } else if (player1.y + player1.height > boardHeight) {
    player1.y = boardHeight - player1.height;
  }

  if (player2.y < 0) {
    player2.y = 0;
  } else if (player2.y + player2.height > boardHeight) {
    player2.y = boardHeight - player2.height;
  }
}

function stopPlayer(e) {
  if (["ArrowUp", "ArrowDown"].includes(e.key)) {
    player1.velocityY = 0;
  } else if (["w", "s"].includes(e.key)) {
    player2.velocityY = 0;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function resetGame(dir) {
  ball.x = boardWidth / 2;
  ball.y = boardHeight / 2;
  ball.velocityX = dir;
  ball.velocityY = 2;
}
