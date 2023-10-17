const blaster = new Audio('assets/blaster.mp3')
const bgMusic = new Audio('assets/spaceMusic.mp3')
document.addEventListener('keydown', ({keyCode}) => {
    if(keyCode == 32 ){
        blaster.play();
        blaster.volume = 0.5
    }
    if( keyCode == 80){
        bgMusic.play()
        bgMusic.loop =true
        bgMusic.volume =0.3 
    }
    if ( keyCode == 90){
        bgMusic.pause()
    }
})
document.addEventListener('keyup', ({keyCode}) => {
    if(keyCode == 32){
        blaster.pause();
        blaster.currentTime = 0
    }

})

