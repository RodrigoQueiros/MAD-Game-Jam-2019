// global variables

let canvas = null
let context = null
const width = 800
const height = 600

let currentLevel = -1
let clicks = 0
let background = ""

let playerRadius = 64 / 2
let gap = 10
let players = []
let keyPressed = {
    up: false,
    left: false,
    right: false,
    space: false,
    last: "right"
}
let sceneLimits = {
    left: 0,
    right: 800
}
let pause = false
let frame = 0
let platforms = []
let finalBoss = []
let balls = []
let kamehamehaa = false
let atk2 = 0
let timer = 0
let ground
let keyBlocked = {
    right: false,
    left: false,
    up: false
}

let Engine, World, Composites, Composite, Bodies, engine



//OnLoad
window.onload = function () {

    canvas = document.getElementById("my_canvas");
    context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    context.clearRect(0, 0, width, height); //clears everything

    if (localStorage.getItem('currentLevel') != null) {
        currentLevel = localStorage.getItem('currentLevel')
    } else {
        localStorage.setItem('currentLevel', currentLevel)
    }
    
    if (currentLevel == 1) {

        background = images.levels_background.one

    }
    if (currentLevel == 2) {

        background = images.levels_background.two

    }
    if (currentLevel == 3) {
        background = images.levels_background.three

    }


    // module aliases
    Engine = Matter.Engine
    World = Matter.World
    Composites = Matter.Composites
    Composite = Matter.Composite
    Bodies = Matter.Bodies

    // create an engine
    engine = Engine.create()

    // create a renderer
    render = Render.create({
        element: canvas,
        engine: engine
    })

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);


    
    engine = Engine.create();
    //engine.world.gravity.scale = 0; //turn off gravity (it's added back in later)

    ground = Bodies.rectangle(0, canvas.height / 2, 4800, 1)
    World.add(engine.world, ground);
    game()
}

//Preload, mouse events
function game() {
    window.addEventListener("keyup", keyUp)
    window.addEventListener("keydown", keyDown)

    players.push(new Player(playerRadius, canvas.height / 2 - playerRadius - 1, false))
    //players[0].body.label = "lightCharacter"
    players.push(new Player(playerRadius, canvas.height / 2 + playerRadius, true))
    //players[1].body.label = "darkCharacter"

    if (currentLevel == 0) {
        platforms.push(new Platform(0, 1200, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(0, 1250, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(0, 1300, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(0, 1350, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(0, 1500, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(0, 1850, (canvas.height / 2) - 100, 6, true))
    }

    //Level 1
    if (currentLevel == 1) {
        platforms.push(new Platform(1, 400, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 450, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 500, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 550, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 600, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 550, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 600, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 550, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(1, 600, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(1, 650, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 700, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 750, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 800, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 750, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 800, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 750, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(1, 800, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(1, 850, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 900, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 950, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 950, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 950, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(1, 1000, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 1000, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 1050, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 1200, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 1250, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 1650, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 1700, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 1750, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 1750, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 1800, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 1850, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 1900, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 2300, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 2350, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 2350, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 2550, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 2550, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 2600, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(1, 2750, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 2750, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 2800, (canvas.height / 2) - 100, 5, true))
        platforms.push(new Platform(1, 2950, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 3000, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(1, 3350, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(1, 3350, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(1, 3850, (canvas.height / 2) - 100, 6, true))

        //Downside
        platforms.push(new Platform(1, 400, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 450, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 500, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 550, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 600, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 550, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 600, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 550, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(1, 600, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(1, 750, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 750, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 800, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 800, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 750, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(1, 800, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(1, 650, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 700, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 850, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 900, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 950, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 950, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 950, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(1, 1000, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 1000, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 1050, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 1400, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 1450, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 1650, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 1700, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 1700, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 1750, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(1, 1800, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(1, 1850, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(1, 1800, (canvas.height / 2) + 100, 5, false))
        platforms.push(new Platform(1, 1900, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(1, 1900, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 2300, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 2350, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 2400, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 2450, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 2700, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 2750, (canvas.height / 2), 1, false))
        platforms.push(new Platform(1, 2800, (canvas.height / 2) + 50, 5, false))
        platforms.push(new Platform(1, 3100, (canvas.height / 2) + 100, 5, false))
        platforms.push(new Platform(1, 3300, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 3350, (canvas.height / 2), 3, false))
        platforms.push(new Platform(1, 3850, (canvas.height / 2), 6, false))
    }

    //Level 2
    if (currentLevel == 2) {
        //up 
        platforms.push(new Platform(2, 450, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 600, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 750, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 900, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 1050, (canvas.height / 2) - 100, 5, true)) //type 8
        platforms.push(new Platform(2, 1300, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 1350, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 1350, (canvas.height / 2) - 100, 1, true))
        platforms.push(new Platform(2, 1350, (canvas.height / 2) - 150, 1, true))
        platforms.push(new Platform(2, 1700, (canvas.height / 2) - 100, 6, true)) //type 9

        //up second
        platforms.push(new Platform(2, 2800, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(2, 2800, (canvas.height / 2) - 100, 5, true))
        platforms.push(new Platform(2, 2800, (canvas.height / 2) - 50, 5, true))
        platforms.push(new Platform(2, 3050, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(2, 3050, (canvas.height / 2) - 100, 5, true))
        platforms.push(new Platform(2, 3050, (canvas.height / 2) - 50, 5, true))

        platforms.push(new Platform(2, 3400, (canvas.height / 2) - 100, 6, true)) //type 10

        //down
        platforms.push(new Platform(2, 550, (canvas.height / 2), 1, false))
        platforms.push(new Platform(2, 600, (canvas.height / 2) + 50, 5, false)) //type 8
        platforms.push(new Platform(2, 850, (canvas.height / 2), 1, false))
        platforms.push(new Platform(2, 850, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(2, 900, (canvas.height / 2) + 100, 5, false))
        platforms.push(new Platform(2, 900, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(2, 950, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(2, 1000, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(2, 1050, (canvas.height / 2) + 50, 4, false))
        platforms.push(new Platform(2, 1100, (canvas.height / 2), 1, false))
        platforms.push(new Platform(2, 1100, (canvas.height / 2) + 50, 2, false))
        platforms.push(new Platform(2, 1150, (canvas.height / 2) + 100, 5, false))
        platforms.push(new Platform(2, 1400, (canvas.height / 2), 3, false))
        platforms.push(new Platform(2, 1450, (canvas.height / 2), 1, false))
        platforms.push(new Platform(2, 1700, (canvas.height / 2), 6, false))

        //down second
        platforms.push(new Platform(2, 4000, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(2, 4050, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(2, 4100, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(2, 4150, (canvas.height / 2) - 50, 3, true))
        platforms.push(new Platform(2, 4200, (canvas.height / 2) - 50, 1, true))

        platforms.push(new Platform(2, 4500, (canvas.height / 2) - 100, 6, true)) //type 10
    }

    //Level 3
    if (currentLevel == 3) {
        //Up
        platforms.push(new Platform(3, 550, (canvas.height / 2) - 50, 5, true))
        platforms.push(new Platform(3, 550, (canvas.height / 2) - 100, 5, true))
        platforms.push(new Platform(3, 950, (canvas.height / 2) - 50, 5, true))
        platforms.push(new Platform(3, 1000, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(3, 1000, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(3, 1050, (canvas.height / 2) - 100, 4, true))
        platforms.push(new Platform(3, 1100, (canvas.height / 2) - 100, 4, true))
        platforms.push(new Platform(3, 1150, (canvas.height / 2) - 100, 4, true))
        platforms.push(new Platform(3, 1200, (canvas.height / 2) - 100, 4, true))
        platforms.push(new Platform(3, 1250, (canvas.height / 2) - 100, 4, true))
        platforms.push(new Platform(3, 1300, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(3, 1300, (canvas.height / 2) - 50, 2, true))
        platforms.push(new Platform(3, 1050, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(3, 1200, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(3, 1450, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(3, 1450, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(3, 1500, (canvas.height / 2) - 150, 5, true))
        platforms.push(new Platform(3, 1950, (canvas.height / 2) - 50, 1, true))
        platforms.push(new Platform(3, 2050, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(3, 2100, (canvas.height / 2) - 150, 2, true))
        platforms.push(new Platform(3, 2100, (canvas.height / 2) - 100, 5, true))
        platforms.push(new Platform(3, 2100, (canvas.height / 2) - 50, 5, true))

        //Down
        platforms.push(new Platform(3, 700, (canvas.height / 2), 5, false))
        platforms.push(new Platform(3, 700, (canvas.height / 2) + 50, 5, false))
        platforms.push(new Platform(3, 1050, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 1100, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 1150, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 1200, (canvas.height / 2) + 50, 5, false))
        platforms.push(new Platform(3, 1250, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 1300, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 1350, (canvas.height / 2), 3, false))
        platforms.push(new Platform(3, 1400, (canvas.height / 2), 3, false))
        platforms.push(new Platform(3, 1550, (canvas.height / 2) + 50, 5, false))
        platforms.push(new Platform(3, 1900, (canvas.height / 2), 1, false))
        platforms.push(new Platform(3, 2000, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(3, 2050, (canvas.height / 2) + 100, 2, false))
        platforms.push(new Platform(3, 2050, (canvas.height / 2) + 150, 5, false))
        platforms.push(new Platform(3, 2050, (canvas.height / 2) + 200, 5, false))
        platforms.push(new Platform(3, 2050, (canvas.height / 2) + 250, 5, false))


        //Boss Fight
        platforms.push(new Platform(3, 3000, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3050, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3100, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3000, (canvas.height / 2) - 50, 2, true))
        platforms.push(new Platform(3, 3000, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(3, 3200, (canvas.height / 2) + 150, 1, true))

        platforms.push(new Platform(3, 3700, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3650, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3600, (canvas.height / 2), 2, true))
        platforms.push(new Platform(3, 3700, (canvas.height / 2) - 50, 2, true))
        platforms.push(new Platform(3, 3700, (canvas.height / 2) - 100, 2, true))
        platforms.push(new Platform(3, 3500, (canvas.height / 2) + 150, 1, true))
    }

    animate()

}


//Update, draw ...
function animate() {

    if (currentLevel == 3 && sceneLimits.right > 3500 && finalBoss.length < 1) {
        finalBoss.push(new FinalBoss(3275, 100))
    }


    if (keyPressed.space && !pause) {
        pause = true
    } else if (keyPressed.space && pause) {
        pause = false
    }

    if (!pause) {
        context.clearRect(sceneLimits.left, 0, sceneLimits.right, height); //clears everything
        context.drawImage(background, 0, 0)
        context.drawImage(background, 2000, 0)

        platforms.forEach(plataform => {
            plataform.draw()
        })

        players.forEach(player => {
            player.draw()
            player.move()
        })

        
        
        if (kamehamehaa) {
            let x = 0
            let y = 0
            let r = 0
            let velIn = 0
            let acc = 0
            let ang = 0
            
            if(balls.length<10){            
            
            x = 3362
            y = 275
            r = 15
            velIn = 1
            acc = 0.1
            ang = Math.random() * 110
            ang += 90
            ang -= 55
            
            balls.push(new BurstAttack(x, y, velIn, r, acc, ang))
            }           


            kamehamehaa = false

            
        }

        

        if (currentLevel != 3) {
            if (sceneLimits.right <= 3998) {
/*
                context.translate(-2, 0)
                sceneLimits.left += 2
                sceneLimits.right += 2*/
            }
        } else {
            if (sceneLimits.right <= 3775) {
                context.translate(-10, 0)
                sceneLimits.left += 10
                sceneLimits.right += 10
            } /*else {
                context.clearRect(sceneLimits.left, 0, sceneLimits.right, height); //clears everything
                boss = images.levels_background.boss
                context.drawImage(boss, sceneLimits.left, 100)
                context.translate(-2, 0)
                sceneLimits.left += 2
                sceneLimits.right += 2
            }*/else {
                //background = images.levels_background.boss
                context.drawImage(images.levels_background.boss, sceneLimits.left, 100)
                platforms.forEach(plataform => {
                    plataform.draw()
                })
            }
        }
        if (currentLevel == 3 && sceneLimits.right > 3500){

            finalBoss.forEach(boss => {
                boss.draw()
                boss.attack(atk2)
            })
        }
        

        balls.forEach(ball => {
            ball.update()
            ball.draw(atk2)
        })
        

        for (let i = 0; i < balls.length; i++) {
            if (balls[i].active == false) {
               balls.splice(i, 1)
            }
        }
        
        frame++


        Engine.update(engine, 16);
        var bodies = Composite.allBodies(engine.world);
        context.beginPath();
        for (var i = 0; i < bodies.length; i += 1) {
            var vertices = bodies[i].vertices;
            context.moveTo(vertices[0].x, vertices[0].y);
            for (var j = 1; j < vertices.length; j += 1) {
                context.lineTo(vertices[j].x, vertices[j].y);
            }
            context.lineTo(vertices[0].x, vertices[0].y);
        }
        context.lineWidth = 1;
        context.strokeStyle = '#000000';
        context.stroke();
        ground.position.x = sceneLimits.left

        Matter.Events.on(engine, 'beforeUpdate ', (e) => {
            keyBlocked.down = false
            keyBlocked.right = false
            keyBlocked.left = false
            keyBlocked.up = false
        });

        Matter.Events.on(engine, "collisionActive", (e) => {
            e.pairs.forEach(pair => {
                if (
                    pair.bodyA.label === "platform" && pair.bodyB.label === "character" ||
                    pair.bodyA.label === "character" && pair.bodyB.label === "platform"
                ) {
                    let normal = pair.collision.normal
                    if (normal.x === -1) {
                        keyBlocked.right = true
                    }
                    if (normal.x === 1) {
                        keyBlocked.left = true
                    }
                    if (normal.y === 1) {
                        keyBlocked.up = true
                    }
                }
            })
        })

    }
    window.requestAnimationFrame(animate)
}

function menu() {

    //Meter Logo Aqui

    context.font = "70px Helvetica";
    context.fillText("Start Game", canvas.width / 2 - (context.measureText("Start Game").width / 2), 3 * (canvas.height / 4));

}

function restartGame() {
    /*
    context.translate(sceneLimits.left / 2,0)
    players.forEach(pl => {
        pl.x = playerRadius
    })*/
    location.reload();
}

class FinalBoss {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.frame = 0
        this.w = 200
        this.h = 200
        this.life = 5
        this.ableToAttack = true
        
        this.random = 0
        this.count = 0
        this.atk = false
        this.time = 0
        this.time2 = 0
    }

    draw() {
        this.count++
        context.drawImage(images.boss.bossidle, this.frame * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h)
        if(this.count % 5 == 0){
            this.frame++
            this.count = 0
        }
        
        
        if (this.frame > 4) {
            this.frame = 0
        }

        
    }

    attack(atk2) {
        if (this.time = 0) {
            this.ableToAttack = true
            this.random = Math.random()*3
            
        }
        if (this.ableToAttack = true) {
            switch (this.random) {
                case 0:
                    kamehamehaa = true
                    this.ableToAttack = false
                    break
                    
                case 1:
                    this.atk = true
                    
                    this.ableToAttack = false
                    break
                case 2:
                    //third
                    this.ableToAttack = false
                    break
            }
        }
        this.time++
        if (this.time > 1000) {
            this.time = 0
            
        }


    }
    die() {
        if (this.life < 1) {
            return true
        }
        else {
            return false
        }
    }
    time(){
        if(this.atk==true){
            this.time++
        }
        if(this.time > 300){
            this.atk=false
            this.time=0
        }
    }

}

class BurstAttack {
    constructor(x, y, velIn, r, acc, ang) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velIn = velIn
        this.ang = ang
        this.vX = this.velIn * Math.cos(this.ang * Math.PI / 180)
        this.vY = this.velIn * Math.sin(this.ang * Math.PI / 180)
        this.acc = acc;
        this.active = true
        this.frame = 0

        
    }
    draw(atk2) {
        context.drawImage(images.boss.bosssphere1, this.frame * (this.r*2), 0, this.r*2, this.r*2, this.x, this.y, this.r*2, this.r*2 )
        this.frame++
        
        if (this.frame > 3) {
            this.frame = 0
        }
        if(atk2 == 2){

        context.drawImage(images.boss.bosssphere1, this.frame * (this.r*2), 0, this.r*2, this.r*2, 3262, 300, this.r*2, this.r*2)
        context.drawImage(images.boss.bosssphere1, this.frame * (this.r*2), 0, this.r*2, this.r*2, 3462, 300, this.r*2, this.r*2)

        context.drawImage(images.boss.bosssphere1, this.frame * (this.r*2), 0, this.r*2, this.r*2, 3162, 200, this.r*2, this.r*2)
        context.drawImage(images.boss.bosssphere1, this.frame * (this.r*2), 0, this.r*2, this.r*2, 3562, 200, this.r*2, this.r*2)
        }
        
    }
    update() {
        this.x += this.vX;
        
        this.y += this.vY;
        if (this.y > 500) {
            this.active = false
        }

    }
    pos() {
        return [this.x, this.y]
    }


}

function keyDown(e) {
    switch (e.keyCode) {
        case 38:
            if (!keyBlocked.up)
                keyPressed.up = true
            clicks++
            break
        case 37:
            if (!keyBlocked.left)
                keyPressed.left = true
            clicks++
            changePlayersAnimation("walkLeft")
            break
        case 39:
            if (!keyBlocked.right)
                keyPressed.right = true
            clicks++
            changePlayersAnimation("walkRight")
            break
        case 32:
            if (!keyBlocked.space)
                keyPressed.space = true
            break
        case 82:
            restartGame()
            break
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case 38:
            if (keyPressed.up)
                keyPressed.up = false
            break
        case 37:
            if (keyPressed.left)
                keyPressed.left = false
            changePlayersAnimation("walkLeft")
            break
        case 39:
            if (keyPressed.right)
                keyPressed.right = false
            changePlayersAnimation("idleRight")
            break
        case 32:
            if (keyPressed.space)
                keyPressed.space = false
          break
    }
}

function changePlayersAnimation(animation) {
    players[0].currAnimation = animation
    players[1].currAnimation = animation
}

function one() {

    localStorage.setItem("currentLevel",1)
    location.reload()

}