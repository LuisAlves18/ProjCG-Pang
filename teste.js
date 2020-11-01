let players = []

window.onload = () => {
    canvas = document.getElementById("myCanvas")
    context = canvas.getContext("2d")
    canvas.height = 620
    canvas.width = 1280


    players.push(new Player(500, 300))

    Animate()
}

function Animate() {

    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i in image.level.one.layer) {
        context.drawImage(image.level.one.layer[i], 0, 0, canvas.width, canvas.height)

    }
    players.forEach(player => {
        player.draw()
    })
    window.requestAnimationFrame(Animate)
}


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





//level 1
// image.level.one.sky.src = "./img/Background/PNG/Battleground1/sky.png"

image.level.one.layer.one.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.two.src = "./img/background/1/ground&houses_bg.png"
image.level.one.layer.three.src = "./img/background/1/ground&houses2.png"
image.level.one.layer.four.src = "./img/background/1/postapocalypse1.png"
image.level.one.layer.five.src = "./img/background/1/fence.png"
image.level.one.layer.six.src = "./img/background/1/road.png"

//player1
image.player.one.src = "./img/players/imagem1.png"


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
            x: 100,
            y: 100
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