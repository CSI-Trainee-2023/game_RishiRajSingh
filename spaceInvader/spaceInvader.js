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

        this.rotation = 0 

        const image = new Image()
        image.src = './assets/spSprite1.png'

        this.image = image
        this.width = 150 
        this.height = 100           
    }
    // *--- Drawing the spaceship ---*//

    draw(){
        cont.fillStyle= 'black'
        cont.fillRect(0, 0, canvas.width , canvas.height)
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

        this.radius = 8
    }

    draw() {
        cont.beginPath()
        
        cont.arc(this.position.x , this.position.y, this.radius, 0, Math.PI * 2)
        cont.fillStyle = 'yellow'
        cont.fill()
        cont.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 
    }
}

// *-- instantiating and animating spaceship, projectiles, enemies grid  ----* // 
const sp = new spaceShip() 
// *--- instantiating projectiles -----* // 
const projectiles = []

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
    projectiles.forEach( projectile => {
        projectile.update()
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
                    x : sp.position.x + sp.width/2,
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




