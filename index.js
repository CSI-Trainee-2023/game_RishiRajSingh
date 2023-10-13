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

const player = new Player()

function animate() {
    cont.clearRect(0,0,canvas.width, canvas.height)
    
    player.update();
    
    requestAnimationFrame(animate);
}
animate();

addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode);
    switch(keyCode){
        case 87 :  if( player.position.y >= 165){
                    player.velocity.y  -= 20 ;
                     }    
                     else{
                        player.velocity.y = 0 
                     }                     
                break ;
        case 38 : if( player.position.y >= 165){
                     player.velocity.y  -= 20 ;
                }    
                else{
                    player.velocity.y = 0 
                }   
                break ;
        case 65 : player.velocity.x = -10 
                break ;
        case 37 : player.velocity.x = -10
                break ;
        case 83 : console.log('down');
                break ;
        case 40 : console.log('down');
                break ;
        case 68 : player.velocity.x = 10
                break ;
        case 39 : player.velocity.x = 10 
                break ;

    }
})

addEventListener('keyup', ({keyCode}) => {
    console.log(keyCode);
    switch(keyCode){
        case 87 :  player.velocity.y = 0                     
                break ;
        case 38 :  player.velocity.y = 0  
                break ;
        case 65 : player.velocity.x = 0 
                break ;
        case 37 : player.velocity.x = 0
                break ;
        case 83 : console.log('down');
                break ;
        case 40 : console.log('down');
                break ;
        case 68 : player.velocity.x = 0
                break ;
        case 39 : player.velocity.x = 0 
                break ;

    }
})