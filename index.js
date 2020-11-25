let players = []
let upKey = leftKey = rightKey = enterKey = false
let currFrame = 0
let gravity = 0.5
let lives = 3
let levelGame = 1
let start = false

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
    life: {
        one: new Image()
    },
    player: {
        one: new Image(),
    },
    harpoon: {
        sprite: new Image()
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
        },
        two: {
            layer: {
                one: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image(),
                seven: new Image(),
            },
        }
    }
}



//Background 1
image.level.one.layer.one.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.two.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.three.src = "./img/background/1/ground&houses2.png"
image.level.one.layer.four.src = "./img/background/1/postapocalypse1.png"
image.level.one.layer.five.src = "./img/background/1/fence.png"
image.level.one.layer.six.src = "./img/background/1/road.png"

//Background 2
image.level.two.layer.one.src = "./img/background/2/sky.png"
image.level.two.layer.two.src = "./img/background/2/houses.png"
image.level.two.layer.three.src = "./img/background/2/houses&trees_bg.png"
image.level.two.layer.four.src = "./img/background/2/fence.png"
image.level.two.layer.five.src = "./img/background/2/car_trees_etc.png"
image.level.two.layer.six.src = "./img/background/2/postapocalypse2.png"
image.level.two.layer.seven.src = "./img/background/2/road.png"

//Player 1 Image
image.player.one.src = "./img/players/imagem1.png"

//harpoon Image
image.harpoon.sprite.src = "./img/harpoon.png"
    //Life Image
image.life.one.src = "./img/vida.png"





class Ball {
    constructor(x, y, R, color, v, d, dX, dY, squareX, squareY, squareH, collisions) { // CONSTRUCTOR
        //initial x position
        this.x = x;
        // initial Y position
        this.y = y;

        // (constant) horizontal displacement (velocity): d is a direction angle
        this.dX = dX

        //(constant) vertical displacement (velocity): d is a direction angle
        this.dY = dY;
        this.d = d
        this.color = color;
        this.R = R
        this.v = v
        this.squareX = squareX
        this.squareY = squareY
        this.squareH = squareH
        this.collisons = collisions
    }
    draw() {
        ctx.fillStyle = `rgb(213,196,161)`;

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
            case 50:
                this.color = "purple"
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);

                ctx.fill();
                break;
            case 25:
                this.color = "blue"
                ctx.fillStyle = this.color;
                ctx.beginPath()
                this.squareX = this.x - this.R
                this.squareY = this.y - this.R
                this.squareH = this.R * 2
                ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, this.squareX, this.squareY, this.squareH);
                ctx.fill();
                break;
            case 12.5:
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

        // update horizontal position 
        this.x += this.dX;
        // update vertical position 
        this.y += this.dY;
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
//ball color
let color = `rgb(213,196,161)`;

//initial ball radius
let R = 100;

//random velocity
let v = 4;
let d = Math.random() * 2 * Math.PI



class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.spriteSheet = {
            img: image.player.one,
            //size of each image on sprite sheet
            frameSize: {
                x: 64,
                y: 64
            },
            //amout of horizontal frames
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
            case "hurtRight":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 4, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "hurtLeft":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 5, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "dieRight":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 6, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "dieLeft":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 7, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
            case "cast":
                this.xSpeed = -this.initialSpeed
                ctx.drawImage(this.spriteSheet.img, this.frame * this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y * 8, this.spriteSheet.frameSize.x, this.spriteSheet.frameSize.y, this.x, this.y, this.frameSize.x, this.frameSize.y)
                break
        }

        //defines the time that each frame has before going to the next
        if (currFrame % 10 == 0) {
            this.frame = this.frame < 4 ? this.frame + 1 : 0
        }
    }
}

class Harpoon {
    constructor(img, x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.active = true
        this.img = img
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
            //ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    update(X, Y) {
        if (this.active) {
            this.x = X
            this.y = Y
        }
    }
}
let harpoon = new Harpoon(image.harpoon.sprite, -10000, -10000, 50, 450)


function ArrowPressed(e) {

    //right arrow pressed
    if (e.keyCode == 39) {
        rightKey = true
        leftKey = false
    }
    //left arrow pressed
    if (e.keyCode == 37) {
        leftKey = true
        rightKey = false
    }
    //up arrow pressed
    if (e.keyCode == 38 && upKey == false) {
        upKey = true
        harpoon.x = players[0].x + 50
        harpoon.y = players[0].y - 300
        harpoon.active = true
        start = true
    }
    if (e.keyCode == 13) {
        enterKey = true
    }

    e.preventDefault()
}

function ArrowReleased(e) {

    //right arrow released
    if (e.keyCode == 39) {
        rightKey = false
        players[0].currAnimation = "idleRight"
    }
    //left arrow released
    if (e.keyCode == 37) {
        leftKey = false
        players[0].currAnimation = "idleLeft"
    }
}

let dX = 10 * Math.cos(d)
let dY = 10 * Math.sin(d)

//balls array
let b = new Array();
let ball = new Ball(600, 100, R, color, v, d, dX, dY)

//push the ball into the array
b.push(ball)


function render() {

    if (levelGame == 1) {
        //Draw First Background
        for (let i in image.level.one.layer) {
            ctx.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)
        }

        if (lives > 0 && b.length != 0) {


            //Draw Player
            players.forEach(player => {
                player.draw()
            })

            if (currFrame <= 60) {
                currFrame++
            } else {
                currFrame = 0
            }


            //set the animation and the player velocity
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
                harpoon.y -= 5
            }

            if (harpoon.y == 0) {
                upKey = false
                harpoon.x = players[0].x
                harpoon.y = players[0].y
            }


            let colidiu = false

            for (let i = b.length - 1; i >= 0; i--) {

                let ball = b[i]


                if (players[0].currAnimation == "idleRight" || players[0].currAnimation == "idleLeft") {
                    if (ball.R <= 25) {
                        if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R + 50) {
                            ball.dX = -ball.dX
                            ball.dY = -ball.dY
                            players[0].currAnimation = "hurtRight"
                            players[0].x = 10
                            lives--
                        }
                    } else {
                        if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R) {
                            ball.dX = -ball.dX
                            ball.dY = -ball.dY
                            players[0].currAnimation = "hurtRight"
                            players[0].x = 10
                            lives--
                        }
                    }

                }
                if (players[0].currAnimation == "walkRight" || players[0].currAnimation == "walkLeft") {
                    if (ball.R <= 25) {
                        if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R + 50) {
                            ball.dX = -ball.dX
                            ball.dY = -ball.dY
                            players[0].currAnimation = "hurtRight"
                            players[0].x = 10
                            lives--
                        }
                    } else {
                        if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R) {
                            ball.dX = -ball.dX
                            ball.dY = -ball.dY
                            players[0].currAnimation = "hurtRight"
                            players[0].x = 10
                            lives--
                        }
                    }
                }





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

                } else if (harpoon.active && upKey) {
                    colidiu = true
                    harpoon.active = false
                    upKey = false
                    harpoon.x = -1000
                    harpoon.y = -1000
                } else {}
                if (colidiu) {

                    colidiu = false
                    if (ball.R > 12.5) {
                        const pos = {
                            x: ball.x,
                            y: ball.y
                        }
                        const radius = ball.R / 2
                        b.splice(i, 1)
                        b.push(new Ball(pos.x + radius / 2, pos.y, radius, color, 4, d, dX, dY))
                        b.push(new Ball(pos.x - radius / 2, pos.y, radius, color, 4, d, -dX, -dY))

                    } else {
                        b.splice(i, 1)

                    }
                }

                ball.draw();
                if (start) {
                    ball.updateBall();
                }



            }
            let spaceCont = 20
            for (let i = 0; i < lives; i++) {
                ctx.drawImage(image.life.one, 1230 - spaceCont, 20, 50, 50)
                spaceCont += 60
            }

        } else if (lives === 0) {



            for (let i in image.level.one.layer) {
                ctx.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)
            }
            ctx.fillStyle = "black";
            ctx.fillRect(0, canvas.height - 50, canvas.width, canvas.height - 450);
            ctx.fillStyle = 'white'
            ctx.font = 'bold 65px Arial';
            let text = "GAME OVER";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 50);
            ctx.fillStyle = 'white'
            let info = "Press Enter to Menu"
            ctx.font = "bold 20px Arial"
            ctx.textAlign = "center";


            ctx.fillText(info, canvas.width / 2, canvas.height / 2);

            setTimeout(function(e) {
                if (enterKey)
                    window.location.href = './homePang.html';
            }, 3000);




        } else if (lives > 0 && b.length == 0) {


            b.push(new Ball(700, 100, R, color, v, d, dX, dY))
            b.push(new Ball(500, 100, R, color, v, d, dX, dY))
            start = false
            levelGame = 2
            console.log(levelGame)

        }
    }


    if (levelGame == 2) {
        for (let i in image.level.two.layer) {
            ctx.drawImage(image.level.two.layer[i], 0, 0, canvas.width, canvas.height)
        }











        if (lives > 0 && b.length != 0) {


            //Draw Player
            players.forEach(player => {
                player.draw()
            })

            if (currFrame <= 60) {
                currFrame++
            } else {
                currFrame = 0
            }


            //set the animation and the player velocity
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


                if (players[0].currAnimation == "idleRight" || players[0].currAnimation == "idleLeft") {
                    if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R + 5) {
                        ball.dX = -ball.dX
                        ball.dY = -ball.dY
                        players[0].currAnimation = "hurtRight"
                        players[0].x = 10
                        lives--
                    }
                } else if (players[0].currAnimation == "walkRight" || players[0].currAnimation == "walkLeft") {
                    if (getDistanceBetweenPoints(ball.x, ball.y, players[0].x, players[0].y) <= ball.R + 5) {

                        ball.dX = -ball.dX
                        ball.dY = -ball.dY
                        players[0].currAnimation = "hurtLeft"
                        players[0].x = 10
                        lives--
                    }
                }





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

                } else if (harpoon.active && upKey) {
                    colidiu = true
                    harpoon.active = false
                    upKey = false
                    harpoon.x = -1000
                    harpoon.y = -1000
                } else {}
                if (colidiu) {

                    colidiu = false
                    if (ball.R > 12.5) {
                        const pos = {
                            x: ball.x,
                            y: ball.y
                        }
                        const radius = ball.R / 2
                        b.splice(i, 1)
                        b.push(new Ball(pos.x + radius / 2, pos.y, radius, color, 4, d, dX, dY))
                        b.push(new Ball(pos.x - radius / 2, pos.y, radius, color, 4, d, -dX, -dY))

                    } else {
                        b.splice(i, 1)

                    }
                }

                ball.draw();
                if (start) {
                    ball.updateBall();
                }



            }
            let spaceCont = 20
            for (let i = 0; i < lives; i++) {
                ctx.drawImage(image.life.one, 1230 - spaceCont, 20, 50, 50)
                spaceCont += 60
            }

        } else {
            console.log("entrei");


            for (let i in image.level.one.layer) {
                ctx.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)
            }
            ctx.fillText(text, 300, 300);
            ctx.fillStyle = 'black'
            let info = "Press Enter to Menu"
            ctx.font = "bold 20px Arial"
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillRect(0, canvas.height - 50, canvas.width, canvas.height - 450);
            ctx.fillStyle = 'white'
            ctx.font = 'bold 65px Arial';
            let text = "GAME OVER";



            ctx.fillText(info, 300, 300);

            setTimeout(function(e) {
                if (enterKey)
                    window.location.href = './homePanghtml';
            }, 3000);



        }












    }



    window.requestAnimationFrame(render)
    window.addEventListener('keydown', ArrowPressed)
    window.addEventListener('keyup', ArrowReleased)
}



function getDistanceBetweenPoints(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
}