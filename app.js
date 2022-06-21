const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
var my_gradient= context.createLinearGradient(0, 0, 800, 700);
my_gradient.addColorStop(0, 'rgb(46, 36, 28)');
// my_gradient.addColorStop(0.5, "red");
my_gradient.addColorStop(1, "rgb(152, 80, 26)");

let mouse;
let frog;
// let snakeHead;
let tail = [];


function drawItems() {
  context.fillStyle = my_gradient;
  context.fillRect (0, 0, 800, 700);

  context.fillStyle = 'rgb(105, 145, 23)';
  context.fillRect(snakeHead.x * 25, snakeHead.y * 25, 25, 25);

  for (let i = 0; i < tail.length; i++) {
      context.fillStyle = 'rgb(124, 173, 29)';
      context.fillRect(tail[i].x * 25, tail[i].y * 25, 25, 25);
  }

  context.fillStyle = 'rgb(177, 165, 156)';
  context.fillRect(mouse.x * 25, mouse.y * 25, 25, 25);

  context.fillStyle = 'rgb(25, 72, 172)';
  context.fillRect(frog.x * 25, frog.y * 25, 25, 25);
}

let direction;
let speed = 18;
let score = 0;
let gameLoop;

window.onload = function(){
snakeHead = {
        x: 16,
        y: 13
    }

mouse = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
    }

frog = {
        x: Math.floor(Math.random() * 75),
        y: Math.floor(Math.random() * 75),
    }


if (mouse.x === snakeHead.x && mouse.y === snakeHead.y){
    mouse = {
        x: Math.floor(Math.random() * 15),
         y: Math.floor(Math.random() * 15),
     }
 }

if (frog.x === snakeHead.x && frog.y === snakeHead.y){
    frog = {
        x: Math.floor(Math.random() * 75),
        y: Math.floor(Math.random() * 75),
     }
}

controls();

gameLoop = setInterval(tick, 1000/speed);
}

let previousX;
let previousY;
function tick() {
if (tail.length === 0) {
     previousX = snakeHead.x;
     previousY = snakeHead.y;
} else {
    previousX = [tail.length - 1].x;
    previousY = [tail.length - 1].y;
    }

for (let i = tail.length - 1 ; i > 0; i--) {
    tail[i].x = tail[i - 1].x;
    tail[i].y = tail[i - 1].y;
}
    if (tail.length !== 0) {
        tail[0].x = snakeHead.x;
        tail[0].y = snakeHead.y;
    }

if (direction === 0) {
    snakeHead.y --;
} else if (direction === 1) {
SnakeHead.x ++;
} else if (direction === 2) {
    snakeHead.y ++;
    } else if (direction === 3) {
    snakeHead.x --;
    }

if (snakeHead.x === 32) {
    snakeHead.x = 0;
} else if (snakeHead.x === -1) {
    snakeHead.x = 31;
}

if (snakeHead.y === 29) {
    snakeHead.y = 0;
} else if (snakeHead.y === -1) {
    snakeHead.y = 28;
}

let addToTail = {
    x: previousX,
    y: previousY,
}
if (snakeHead.x === mouse.x && snakeHead.y === mouse.y) {
    mouse.x = Math.floor(Math.random() * 25);
    mouse.y = Math.floor(Math.random() * 25);
    frog.x = Math.floor(Math.random() * 50);
    frog.y = Math.floor(Math.random() * 50);
    tail.push(addToTail)
    score++;
    speed++;
}

if (snakeHead.x === frog.x && snakeHead.y === frog.y) {
    frog.x = Math.floor(Math.random() * 60);
    frog.y = Math.floor(Math.random() * 60);
    mouse.x = Math.floor(Math.random() * 25);
    mouse.y = Math.floor(Math.random() * 25);
    tail.shift(addToTail)
    score--;
    speed--;
}


for (let i = 0; i < tail.length; i++) {
    if (tail[i].x === snakeHead.x && tail[i].y === snakeHead.y) {
        clearTimeout(gameLoop);
    }
}
 
drawItems();
drawScore();
}

function drawScore(){
context.fillStyle = 'white';
context.font = '25px Impact';
context.fillText('Score: ' + score, canvas.width - 425, 30)
}

function controls() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp'){
            if (!(body.length > 1 && direction === 2)) {
                direction = 0;
            }
        } else if (event.key === 'a' || event.key === 'ArrowRight') {
            if (!(body.length > 1 && direction === 3)) {
                direction = 1;
            }
        } else if (event.key === 's' || event.key === 'ArrowDown') {
            if (!(body.length > 1 && direction === 0)) {
                direction = 2;
            }
        } else if (event.key === 'd' || event.key === 'ArrowLeft') {
            if (!(body.length > 1 && direction === 1)) {
                direction = 3;
            }
        }
    });
}

