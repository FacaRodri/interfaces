import { Figura } from "./Figura.js";
import { Circulo } from "./Circulo.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var figura = new Figura(ctx);
var arrFiguras = [];
var objetoActual = null;
let isDrawed = false;
let creando = false;
var verticeActual;
var teclaPulsada = false;



cleanCanvas();
document.getElementById("clean").addEventListener("click", function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    arrFiguras = []
    figura = new Figura(ctx);   
});

document.getElementById("btn").addEventListener("click", function(){
    if(figura.getPuntos().length >= 3){
        figura.cerrarFigura();
        creando = false;
        arrFiguras.push(figura);
        isDrawed = false;
    }
}); 


document.getElementById("draw").addEventListener("click", function(){
    creando = true;
})

canvas.addEventListener("click", function (){   
    if(creando){
        if (!isDrawed){
            figura = new Figura(ctx);
            isDrawed = true;
        }
        let circulo = new Circulo(event.offsetX, event.offsetY, 10, '#ff0000');
        figura.addCirculo(circulo);  
        figura.draw();
    }    
});

canvas.addEventListener("mousedown", function(){
    event.stopPropagation();
    event.preventDefault();
    let x = event.layerX;
    let y = event.layerY;
    for(var i = 0; i < arrFiguras.length; i++){
        if(arrFiguras[i].clickVertice(x, y)){
            objetoActual = arrFiguras[i];
            verticeActual = objetoActual;
            arrFiguras.splice(i, 1);
            verticeActual = objetoActual;
        }
        else{
            if(arrFiguras[i].clickCentro(x, y)){
                objetoActual = arrFiguras[i];
                arrFiguras.splice(i, 1);
            }   
        }
    }
});

canvas.addEventListener("mousemove", function(event){
    event.stopPropagation();
    event.preventDefault();
    let x = event.offsetX;
    let y = event.offsetY;
    if(objetoActual != null){
        if (objetoActual.clickCentro(x, y)){
            cleanCanvas();
            objetoActual.reDibujar(objetoActual.restoX(x, objetoActual.getCentro()), objetoActual.restoY(y, objetoActual.getCentro()));
            objetoActual.draw();
        }else{
            if (objetoActual.clickVertice(x, y)) {
                cleanCanvas();
                let restoX = objetoActual.restoX(x, objetoActual.clickVertice(x,y));
                let restoY = objetoActual.restoY(y, objetoActual.clickVertice(x,y));
                objetoActual.moveVer(restoX, restoY, objetoActual.clickVertice(x, y));
                objetoActual.draw();
            }
        }
    }
  
});

canvas.addEventListener("mouseup", function(){
    event.stopPropagation();
    event.preventDefault();
    if(objetoActual != null){
        arrFiguras.push(objetoActual);
        objetoActual = null;
    }
});

canvas.addEventListener("dblclick", function(){
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(verticeActual);
    let actual = verticeActual.clickVertice(x, y);
    verticeActual.removeItemFromArr(verticeActual.getPuntos(), actual);
    cleanCanvas();
    verticeActual.draw();
    verticeActual.drawCentro();
});


function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < arrFiguras.length; i++) {
        arrFiguras[i].draw();
        arrFiguras[i].drawCentro();
    }


    window.addEventListener("keydown", function (event){
        if(event.key == "c"){
          teclaPulsada = true;
        }
      });
      
      window.addEventListener("keyup", function (event) {
        if(event.key == "c"){
          teclaPulsada = false;
        }
      },);
      
      canvas.addEventListener("mousewheel", function(event) {
        event.stopPropagation();
        event.preventDefault(); 
        if (teclaPulsada){
          for (var i = 0 ; i < arrFiguras.length ; i++){
            arrFiguras[i].cambiarColor(event.deltaY)
          }
          cleanCanvas();
        }
      });
      
    
}

