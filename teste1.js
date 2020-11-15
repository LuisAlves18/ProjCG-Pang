let players = []
window.onload = () => {
    canvas = document.getElementById("myCanvas")
    context = canvas.getContext("2d")
    canvas.height = 620
    canvas.width = 1280


    players.push(new Player(500, 300))

    Animate()
}
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
    constructor(x, y, radius, color, v, d, squareX, squareY, squareH) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement (velocity): d is a direction angle
        this.dX = 2 * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = 2 * Math.sin(d);
        this.color = color; // color
        this.R = radius; // circle radius (constant)
        this.v = v
        this.squareX = this.x - this.R
        this.squareY = this.y - this.R
        this.squareH = this.R * 2
    }
    draw() {
        context.fillStyle = this.color;
        switch (this.R) {
            case 100:
                context.fillStyle = this.color;
                context.beginPath()
                context.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
                context.fill();
                break;
            case 80:
                this.color = "purple"
                context.fillStyle = this.color;
                context.beginPath()
                context.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
                context.fill();
                break;
            case 40:
                this.color = "blue"
                context.fillStyle = this.color;
                context.beginPath()
                context.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
                context.fill();
                break;
            case 20:
                this.color = "red"
                context.fillStyle = this.color;
                context.beginPath()
                context.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
                context.fill();
                break;
        }
    }
    updateBall() {
        this.x += this.dX; // update horizontal position 
        this.y += this.dY; // update vertical position 
        this.squareX = this.x - this.R
        this.squareY = this.y - this.R

        if (this.x < this.R || this.x > canvasWidth - this.R)
            this.dX = -this.dX;
        // check Canvas horizontal collisions
        if (this.y < this.R || this.y > 530 - this.R) {
            this.dY = -this.dY;
        } else {
            this.dY += gravity
        }
        if (harpoonX + 50 < this.squareX
            //totally to the left: no collision
            ||
            harpoonX > (this.squareX + this.squareH)
            //totally to the right: no collision
            ||
            harpoonY + 50 < this.squareY
            //totally above: no collision
            ||
            harpoonY > (this.squareY + this.squareH)) {
            //totally below: no collision
            //colidiu = true;
        } else {
            console.log("amsognaosgm")
            upKey = false
            harpoonX = characterX
            harpoonY = characterY
        }

    }
    b = new Array(); // setup as many balls as wanted
}
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
        this.frame = 0
        this.currAnimation = "idleRight"
    }

    draw() {
        switch (this.currAnimation) {
            case "idleRight":
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, 0, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "idleLeft":
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "walkRight":
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 2, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "walkLeft":
                context.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 3, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
        }
    }
}
class Harpoon {

}

/* function render() {


    // draw & update ball
    b.forEach(function(ball) {
        ball.draw();
        ball.update();
    });


    //update background

    //update player 



    if (upKey && harpoonY > -1) {
        context.beginPath()
        context.fillStyle = "blue"
        context.fillRect(harpoonX, harpoonY, 50, 50)
        harpoonY = harpoonY - 10



    }
    if (harpoonY == 0) {
        upKey = false
        harpoonX = characterX
        harpoonY = characterY
    }
    //collisions


    //new frame
    window.requestAnimationFrame(render);
}
render(); //start the animation




function ArrowPressed(e) {
    if (e.key == 'ArrowUp' && upKey == false) {
        upKey = true
        harpoonX = characterX
        harpoonY = characterY


    }

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
} */