const canvas = document.querySelector('canvas')
const cont = canvas.getContext('2d')


canvas.width = innerWidth
canvas.height = innerHeight



// *--- Tracking Keys ----*// 
const keys = {
    right : {
        pressed : false 
    },
    left : {
        pressed : false 
    }
}

// *-- Choose your spaceship ---*// 


class spaceShip {
    constructor(){
        this.position = {
            x : canvas.width/2 -75 ,
            y : canvas.height - 120
        }

        this.velocity = {
            x : 0 
        }

        const image = new Image()
        image.src = './assets/spSprite1.png'

        this.image = image
        this.width = 150 
        this.height = 100           
    }
    // *--- Drawing the spaceship ---*//

    draw(){
        cont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    // *--- Drawing With updated Co-ordinates ---*// 
    update(){
        cont.clearRect(0,0,canvas.width,canvas.height)
        if( this.image){
            this.draw()
            this.position.x += this.velocity.x
        }
        
    }
}

// *---- Creating Projectiles' Class ----* //
class Projectile{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity 

        // this.radius = 8
        
        const bubble = new Image()
        bubble.src = './assets/shooterBall.png'
        this.image = bubble 
        this.width = 28 
        this.height = 28
       
    }


    draw() {
        cont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 
    }
}

// * --- Creating Enemies ------ * // 
class Enemy{
    constructor({position}){
        this.position = {
            x : position.x ,
            y : position.y
        }

        this.velocity = {
            x : 5 ,
            y : 0 
        }

        const image = new Image()
        image.src = './assets/aliens.png'

        this.image = image
        this.width = 50
        this.height = 50           
    }
    // *--- Drawing the spaceship ---*//

    draw(){
        cont.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    // *--- Drawing With updated Co-ordinates ---*// 
    update({velocity}){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x 
            this.position.y += this.velocity.y 
        }
    }
}

class Grid {
    constructor(){
        this.position = {
            x: 0 ,
            y : 0 
        }
        this.velocity = {
            x : 0 ,
            y : 0 
        }

        this.enemies = []
        const rows = Math.floor(Math.random() * 5  + 1 )
        const columns = Math.floor(Math.random()*5 + 3)
        for ( let i =1 ; i<= columns ; i++ ){
           for( let j =0 ; j < rows ; j++ ){
            this.enemies.push(new Enemy({
                position : {
                    x : i * 50 ,
                    y : j * 50 
                }
            }))
           }
        }
    }

    update() {}
}



// *-- instantiating and animating spaceship, projectiles, enemies grid  ----* // 
const sp = new spaceShip() 
// *--- instantiating projectiles -----* // 
const projectiles = []
const grids = [new Grid()]


function animate(){
    requestAnimationFrame(animate)
    sp.update()
    
    // *--- SpaceShip Horizontal movement ------*//
    if( keys.right.pressed && sp.position.x + sp.width <= canvas.width){
        sp.velocity.x = 4 
    } else if( keys.left.pressed && sp.position.x >= 0){
        sp.velocity.x = -4 
    } else {
        sp.velocity.x = 0
    }

    //* ---- projectiles ----* // 
    projectiles.forEach( (projectile, index) => {
        if ( projectile.position.y === 0){
            projectiles.splice(index, 1)
        }
        else {
            projectile.update()
        } 
    })

    grids.forEach((Grid) => {
        Grid.update()
        Grid.enemies.forEach(enemy => {
            enemy.update({
                velocity : Grid.velocity
            })
        })
    })

}
animate() 



// *--- SpaceShip Movement ---> KeyDown ----* // 
addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65 : keys.left.pressed = true 
                    break; 
        case 37 : keys.left.pressed = true 
                    break; 
        
        case 68 : keys.right.pressed = true 
                    break; 
        case 39 : keys.right.pressed = true 
                    break; 
        case 32 : projectiles.push(
            new Projectile({
                position : {
                    x : sp.position.x + sp.width/2 - 13,
                    y : sp.position.y
                },
                velocity : {
                    x : 0,
                    y : -5 
                }
            })
        )
    }
})

// *--- SpaceShip Movement ---> KeyUp ----* // 
addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){    
        case 65 : keys.left.pressed = false 
                break ;
        case 37 : keys.left.pressed = false
                break ;
        case 68 : keys.right.pressed = false  
                break ;
        case 39 : keys.right.pressed = false 
                break ; 
    }
})





