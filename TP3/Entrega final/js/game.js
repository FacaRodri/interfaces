import { Plane } from "./plane.js";


let plane = new Plane();
var scoreInterval = 0;
var ingame = false;


let planeimage = document.getElementById("plane");
let beeimage = document.getElementById("bee");
let capa1 = document.getElementById("capa1");
let capa2 = document.getElementById("capa2");
let capa3 = document.getElementById("capa3");
let capa4 = document.getElementById("capa4");
let capa5 = document.getElementById("capa5");
let gameOverDiv = document.getElementById("gameOver");
let scoreDiv = document.getElementById("score");


gameOverDiv.innerHTML = "Press SPACE for jump [ENTER to continue]";
stop();




document.addEventListener("keydown", function(){
    if(event.code == "Enter"){
        start();
    }


});

document.addEventListener("keydown", function(){
    if (ingame) {
        if (event.code == "Space") {
            plane.planeUp();
            setTimeout(() => {
                plane.inMovement();
            }, 800);

        }
    }
});


let req = requestAnimationFrame(gameOver);
function gameOver() {
    if (plane.colision() && !plane.dodging) {
        setTimeout(function () { requestAnimationFrame(gameOver); }, 700);
        gameOverDiv.innerHTML = "GAME OVER  [Press ENTER]";
        plane.dead();
        cancelAnimationFrame(req);
        stop();

    }
    else {
        requestAnimationFrame(gameOver);
    }
}


function stop(){
    ingame = false;
    planeimage.style.animationPlayState = "paused";
    setTimeout(() => {
        beeimage.style.animationPlayState = "paused";
    }, 500);
    capa1.style.animationPlayState = "paused";
    capa2.style.animationPlayState = "paused";
    capa3.style.animationPlayState = "paused";
    capa4.style.animationPlayState = "paused";
    capa5.style.animationPlayState = "paused";
    clearInterval(scoreInterval);
}


function start(){
    let score = 0;
    ingame = true;
    gameOverDiv.innerHTML = " ";
    scoreInterval = setInterval(() => {
        score++;
        scoreDiv.innerHTML = "You score: " + score;
    }, 800);
    plane.inMovement();
    planeimage.style.animationPlayState = "running";
    beeimage.style.animationPlayState = "running";
    capa1.style.animationPlayState = "running";
    capa2.style.animationPlayState = "running";
    capa3.style.animationPlayState = "running";
    capa4.style.animationPlayState = "running";
    capa5.style.animationPlayState = "running";

    


}





