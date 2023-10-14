const canvas = document.querySelector('canvas')
const cont = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height =  innerHeight

// GRAVITY 
const gravity = 0.5 



// * ------ PLayer class----- * // 
class Player {
    constructor(){
        this.position = {
            x  : 100, 
            y : 100 
        }

        this.width = 50
        this.height = 50 

        this.velocity = {
            x : 0 ,
            y : 1 
        }
    }

    draw() {
        cont.fillStyle = 'red'
        cont.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


    // *----- Draws player with Updated Co-ordinates -------* // 
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


// *----- Platform class -----* // 
class Platform {
    constructor({x,y}) {
        this.position = {
            x ,
            y  
        }
        this.width = 200 
        this.height = 20 
    }

    draw(){
        cont.fillStyle = 'blue'
        cont.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Instantiating a player 
const player = new Player()


// Instantiating Platforms 
const platforms = [new Platform({x : 300 , y : 200}), new Platform({x : 800 , y : 300 })]



// For Keyup And Key Down 
const keys = {
    right : {
        pressed : false 
    },
    left : {
        pressed : false 
    },
    up : {
        pressed : false 
    } , 
    down : {
        pressed : false 
    }
}



// * ------- Animation Player , Backgorund , Etc. ------- *// 
function animate() {
    cont.clearRect(0,0,canvas.width, canvas.height)
    
    player.update()
    platforms.forEach((platform) => {
        platform.draw()
    });
        
    requestAnimationFrame(animate);
    
    //*  ----- player horizontal movement -------- *//
    if( keys.right.pressed && player.position.x + player.width <= canvas.width/2) {
        player.velocity.x =10 
    } else if ( keys.left.pressed && player.position.x >= 100){
        player.velocity.x = -10 
    } else {
        player.velocity.x = 0 


        // *--- scroll the background -----* // 
        if( keys.right.pressed ){
            platforms.forEach((platform) => {
                platform.position.x -= 5
            });
            
        } else if( keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.position.x += 5 
            });
            
        }
    }


    // *------ Platform - Player collision detection  ------ * //
    platforms.forEach((platform) => {
        if ( player.position.y+ player.height <= platform.position.y  && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
            player.velocity.y = 0 
        }
    });
    
    

}
animate(); // Executing Animate Function




// * ---- Defining KeyDown ( holding down ) Behaviour ----*// 
addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode);
    switch(keyCode){
        case 87 : player.velocity.y = -20 
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


// *---- Defining Keyup Behaviour ( user leaves the key )  -----* //
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