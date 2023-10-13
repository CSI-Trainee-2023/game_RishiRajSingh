const canvas = document.querySelector('canvas')
const cont = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height =  innerHeight

const gravity = 0.5 

class Player {
    constructor(){
        this.position = {
            x : 100 ,
            y : 100 
        }

        this.width = 100 
        this.height = 100 

        this.velocity = {
            x : 0 ,
            y : 1 
        }
    }

    draw() {
        cont.fillStyle = 'red'
        cont.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        
        this.draw()
        
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y
        if ( this.position.y +  this.velocity.y + this.height <= canvas.height ){
            this.velocity.y += gravity 
        }
        else {
            this.velocity.y = 0 
        } 
    }
}


class Platform {
    constructor() {
        this.position = {
            x : 300 ,
            y : 200 
        }
        this.width = 200 
        this.height = 20 
    }

    draw(){
        cont.fillStyle = 'blue'
        cont.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform()


const keys = {
    right : {
        pressed : false 
    },
    left : {
        pressed : false 
    }

}

function animate() {
    cont.clearRect(0,0,canvas.width, canvas.height)
    
    player.update()
    platform.draw() 
    
    requestAnimationFrame(animate);
    
    //*  ----- player horizontal movement -------- *//
    if( keys.right.pressed && player.position.x + player.width < canvas.width/2) {
        player.velocity.x =10 
    } else if ( keys.left.pressed && player.position.x > 100){
        player.velocity.x = -10 
    } else {
        player.velocity.x = 0 
    }


    // platform - player collision detection 
    if ( player.position.y+ player.height <= platform.position.y  && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
        player.velocity.y = 0 
    }

}
animate();

addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode);
    switch(keyCode){
        case 87 :  player.velocity.y = -20                 
                break ;
        case 38 : player.velocity.y = -20 
                break ;
        case 65 : keys.left.pressed = true
                break ;
        case 37 : keys.left.pressed = true 
                break ;
        case 83 : console.log('down');
                break ;
        case 40 : console.log('down');
                break ;
        case 68 : keys.right.pressed = true 
                break ;
        case 39 : keys.right.pressed = true 
                break ;

    }
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        case 87 :  player.velocity.y = 0                     
                break ;
        case 38 :  player.velocity.y = 0  
                break ;     
        case 65 : keys.left.pressed = false 
                break ;
        case 37 : keys.left.pressed = false
                break ;
        case 83 : console.log('down');
                break ;
        case 40 : console.log('down');
                break ;
        case 68 : keys.right.pressed = false  
                break ;
        case 39 : keys.right.pressed = false 
                break ;  
    }
})