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


// *--- instantiating and animating spaceship ----* // 
const sp = new spaceShip() 
function animate(){
    requestAnimationFrame(animate)
    sp.update()

    // *--- SpaceShip Horizontal movement ------*//
    if( keys.right.pressed && sp.position.x + sp.width <= canvas.width){
        sp.velocity.x = 5 
    } else if( keys.left.pressed && sp.position.x >= 0){
        sp.velocity.x = -5 
    } else {
        sp.velocity.x = 0
    }

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



