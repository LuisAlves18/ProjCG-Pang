let players = []
let upKey = leftKey = rightKey = false
let currFrame = 0
let gravity = 0.5

window.onload = () => {
    canvas = document.getElementById("myCanvas")
    ctx = canvas.getContext("2d")
    canvas.height = 620
    canvas.width = 1280
    players.push(new Player(600, 400))
    render()
}

const canvasWidth = 620
const canvasHeight = 1280



let image = {
    player: {
        one: new Image(),
    },
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


//Images from background
image.level.one.layer.one.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.two.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.three.src = "./img/background/1/ground&houses2.png"
image.level.one.layer.four.src = "./img/background/1/postapocalypse1.png"
image.level.one.layer.five.src = "./img/background/1/fence.png"
image.level.one.layer.six.src = "./img/background/1/road.png"

//player1
image.player.one.src = "./img/players/imagem1.png"






class Ball {
    constructor(x, y, R, color, v, d, squareX, squareY, squareH, collisions) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement (velocity): d is a direction angle
        this.dX = 5 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = 5 * Math.sin(d);
        this.color = color; // color
        this.R = R
        this.v = v
        this.squareX = squareX
        this.squareY = squareY
        this.squareH = squareH
        this.collisons = collisions
    }
    draw() {
        ctx.fillStyle = `rgb(213,196,161)`;
        /* this.x = canvas.width / 2
        this.y = canvas.height / 4 */


        switch (this.R) {
            case 100:
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);
                ctx.fill();
                break;
            case 80:
                this.color = "purple"
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);

                ctx.fill();
                break;
            case 40:
                this.color = "blue"
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);
                ctx.fill();
                break;
            case 20:
                this.color = "red"
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);
                ctx.fill();
                break;
        }
    }
    updateBall() {

        this.x += this.dX; // update horizontal position 
        this.y += this.dY; // update vertical position 
        this.squareX = this.x - this.R
        this.squareY = this.y - this.R



        if (this.x < this.R || this.x > canvas.width - this.R)
            this.dX = -this.dX;
        // check Canvas horizontal collisions
        if (this.y < this.R || this.y > 530 - this.R) {
            this.dY = -this.dY;
        } else {
            this.dY += gravity
        }


    }
}

let color = `rgb(213,196,161)`; //ball color
let R = 100;

// random position (inside Canvas)


//random velocity
let v = 4;
let d = Math.random() * 2 * Math.PI



class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.spriteSheet = {
            img: image.player.one,
            frameSize: {
                x: 64,
                y: 64
            },
            frameAmount: 5

        }
        this.frameSize = {
            x: 150,
            y: 150
        }

        this.initialSpeed = 10
        this.xSpeed = 0

        this.frame = 0
        this.currAnimation = "idleRight"
    }

    draw() {
        switch (this.currAnimation) {
            case "idleRight":
                this.xSpeed = 0
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, 0, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "idleLeft":
                this.xSpeed = 0
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "walkRight":
                this.xSpeed = this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 2, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "walkLeft":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 3, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
        }
        if (currFrame % 3 == 0) {
            this.frame = this.frame < 4 ? this.frame + 1 : 0
        }

    }


}

class Harpoon {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.active = true
    }
    draw() {
        /* ctx.beginPath()
        ctx.fillRect(X, Y, this.w, this.h) */
        ctx.fillRect(this.x, this.y, this.w, this.h)

    }
    update(X, Y) {

        /* let X = this.x
        this.y -= 10
        ctx.fillRect(X, this.y, this.w, this.h) */

        if (this.active) {
            this.x = X
            this.y = Y
        }

    }
}
let harpoon = new Harpoon(-10000, -10000, 50, 50)





function ArrowPressed(e) {
    if (e.keyCode == 39) {
        rightKey = true
    }
    if (e.keyCode == 37) {
        leftKey = true
    }
    if (e.keyCode == 38 && upKey == false) {
        upKey = true
        harpoon.x = players[0].x
        harpoon.y = players[0].y
    }

    e.preventDefault()
}

function ArrowReleased(e) {
    if (e.keyCode == 39) {
        rightKey = false
    }
    if (e.keyCode == 37) {
        leftKey = false
    }


}
let b = new Array(); // setup as many balls as wanted
let ball = new Ball(600, 100, R, color, v, d)
b.push(ball)
let colDet = 0

function render() {
    //Draw Background
    for (let i in image.level.one.layer) {
        ctx.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)
    }


    //Draw Player
    players.forEach(player => {
        player.draw()
    })

    //draw ball

    // b.forEach(function(ball) {
    //     ball.draw();
    //     ball.updateBall();
    // })




    if (currFrame <= 60) {
        currFrame++
    } else {
        currFrame = 0
    }

    if (rightKey && (players[0].x + 125 < canvas.width)) {
        players[0].currAnimation = "walkRight"
        players[0].x += players[0].xSpeed

    }
    if (leftKey && (players[0].x - 125 > -145)) {
        players[0].currAnimation = "walkLeft"
        players[0].x += players[0].xSpeed
    }
    if (upKey && harpoon.y > -1) {

        harpoon.draw(harpoon.x + 100, harpoon.y)
            //harpoon.update(players[0].x, players[0].y)
        harpoon.y -= 10


    }

    if (harpoon.y == 0) {
        upKey = false
        harpoon.x = players[0].x
        harpoon.y = players[0].y
    }


    let colidiu = false
    for (let i = b.length - 1; i >= 0; i--) {
        let ball = b[i]

        if (harpoon.x + 50 < ball.squareX
            //totally to the left: no collision
            ||
            harpoon.x > (ball.squareX + ball.squareH)
            //totally to the right: no collision
            ||
            harpoon.y + 50 < ball.squareY
            //totally above: no collision
            ||
            harpoon.y > (ball.squareY + ball.squareH)) {
            //totally below: no collision

        } else {
            colidiu = true

            upKey = false


            colDet++
            console.log(colDet);

            harpoon.x = -1000
            harpoon.y = -1000

        }
        switch (colDet) {
            case 2:
                //console.log("entrei")
                colidiu = false
                ball.R = 80;
                let ball1 = new Ball(600, 100, 80, color, 4, d)
                b.push(ball1)






                break;
            case 4:

                ball.R = 40;

                colidiu = false


                break;
            case 6:
                ball.R = 20;
                colidiu = false

            default:
                break;
        }

        ball.draw();
        ball.updateBall();





    }


    window.requestAnimationFrame(render)


}
window.addEventListener('keydown', ArrowPressed)
window.addEventListener('keyup', ArrowReleased)