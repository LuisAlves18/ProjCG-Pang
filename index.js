canvas = document.getElementById("myCanvas")
context = canvas.getContext("2d")
canvas.height = 620
canvas.width = 1280
canvasWidth = canvas.width
canvasHeight = canvas.height

let x = 0
let y = 0

let srcX
let srcY = 0

let sheetWidth = 320
let sheetHeight = 576

let cols = 5
let rows = 9
let characterX = canvasWidth / 2
let characterY = 400

let width = sheetWidth / cols
let height = sheetHeight / rows
let currFrame = 0
let rightKey = leftKey = false
let gravity = 1
let bounce = 0


let image = {
    level: {
        one: {
            sky: {
                one: new Image(),
                two: new Image()
            },
            layer: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image()
            },
        }
    }
}


class Ball {
    constructor(x, y, r, c, v, d) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement (velocity): d is a direction angle
        this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = 2 * Math.sin(d);
        this.c = c; // color
        this.R = r; // circle radius (constant)
        this.v = v

    }

    draw() {
        context.fillStyle = this.c;
        context.beginPath();
        context.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        context.fill();

    }
    update() {
        if (this.x < this.R || this.x > canvasWidth - this.R)
            this.dX = -this.dX;
        // check Canvas horizontal collisions
        if (this.y < this.R || this.y > 530 - this.R) {
            this.dY = -this.dY;
        } else {
            this.dY += gravity
        }



        this.x += this.dX; // update horizontal position 
        this.y += this.dY; // update vertical position 


    }
}
let b = new Array(); // setup as many balls as wanted


let color = `rgb(213,196,161)`; //ball color
let r = 85;

// random position (inside Canvas)
let xInit = canvasWidth / 2;
let yInit = canvasHeight / 4;

//random velocity
let velocity = 4;
let direction = Math.random() * 2 * Math.PI

b.push(new Ball(xInit, yInit, r, color, velocity, direction))


// let rightKey = leftKey = false
let spriteImage = new Image()
spriteImage.src = "./img/players/imagem1.png"

//level 1
// image.level.one.sky.src = "./img/Background/PNG/Battleground1/sky.png"

image.level.one.layer.one.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.two.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.three.src = "./img/background/1/ground&houses2.png"
image.level.one.layer.four.src = "./img/background/1/postapocalypse1.png"
image.level.one.layer.five.src = "./img/background/1/fence.png"
image.level.one.layer.six.src = "./img/background/1/road.png"





function render() {
    //context.clearRect(0, 0, canvasWidth, canvasHeight)
    for (let i in image.level.one.layer) {
        context.drawImage(image.level.one.layer[i], 0, 0, canvasWidth, canvasHeight)
    }
    currFrame = ++currFrame % cols
    srcX = currFrame * width

    context.drawImage(spriteImage, srcX, srcY, width, height, characterX, characterY, 150, 150)



    // draw & update
    b.forEach(function(ball) {
        ball.draw();
        ball.update();
    });

    //new frame
    window.requestAnimationFrame(render);
}
render(); //start the animation



function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        rightKey = true
        srcY = 128
        if (characterX + 130 < canvas.width) {
            characterX += 10
        }


    }
    if (e.key == 'ArrowLeft') {
        leftKey = true
        srcY = 192
        if (characterX - 130 > -150) {
            characterX -= 10
        }

    }
}

function ArrowReleased(e) {
    if (e.key == 'ArrowRight') {
        rightKey = false
        srcY = 0
    }
    if (e.key == 'ArrowLeft') {
        leftKey = false
        srcY = 64

    }
}
window.addEventListener('keydown', ArrowPressed)
window.addEventListener('keyup', ArrowReleased)