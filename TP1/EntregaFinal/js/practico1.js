"use strict"

var matriz = [];
let MAX = 5;
let f = MAX;
let c = MAX;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var imageData;

////////////////////////////

llenarMatriz();
console.table(matriz);
mayor();
paresImpares();
promedioFila();
cleanCanvas();

document.getElementById("ej12").addEventListener("click", function(){
    cleanCanvas();
    canvasAndImageData();
});

document.getElementById("ej45").addEventListener("click", function(){
    cleanCanvas();
    degrade();

});
document.getElementById("ej6").addEventListener("click", function(){
    cleanCanvas();
    image();
});

document.getElementById("filtro").addEventListener("click", function(){
    filtro(imageData);
    
});

//// Funcion para limpiar canvas

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}




//// Ejercicio 1

function llenarMatriz(){
    for(let c = 0; c < MAX; c++){
        matriz[c] = [];
        for(let f = 0; f < MAX; f++){
            matriz[c][f] = Math.floor(Math.random() * 100 + 1);
        }
    }
}


function mayor(){
    var mayor=0;
    for (var i = 0; i < MAX; i++){
        var aux=0;
        for (var j = 0; j < MAX; j++){
            aux = matriz[i][j];
            if (aux > mayor){
                mayor = aux;
            }
        }
    }
return console.log("Mayor "+ mayor);
}
  
function paresImpares(){
    var aux=0; 
    var tmp = Number.MAX_SAFE_INTEGER; 
    var f=0; var c=0;
    for (var i=0; i<MAX; i++){
        for(var j=0; j<MAX; j++ ){
            if (i%2==0 && matriz[i][j]>aux){
                aux = matriz[i][j];
                f=i;
            }
            else{
                if ((i%2!==0)&&(tmp>matriz[i][j])){
                tmp = matriz[i][j];
                c=i;
                }
            }
            }
    }
    console.log("Fila par: " + f +" mayor: " + aux);
    console.log("Fila impar: " + c + " menor: " + tmp);
}
  
function promedioFila(){
    var arr= [];
    for (var i = 0 ; i < MAX; i++){
        let suma=0;
        for (var j = 0; j < MAX; j++){
        suma += matriz[i][j];
        }
        arr[i] = suma/MAX;
        suma = 0;
    }
console.log(arr);
}




//// Ejercicio 2 y 3

function canvasAndImageData(){
    //Ejercicio 2
    var color = "red";
    ctx.fillStyle = color;
    ctx.fillRect(300,150,100,200);
    
    //Ejercicio 3
    let width = 100;
    let heigth = 200;
    let imageData = ctx.createImageData(width, heigth);
    for(let x = 0; x < width; x++){
        for(let y = 0; y < heigth; y++){
            setPixel(imageData, x, y, 100, 150, 200, 255);
        }
    }
    ctx.putImageData(imageData, 100, 150);

    let text = document.getElementById("text");
    text.innerHTML = "2.Pintar una región rectangular de un color utilizando el Contexto de HTML5. (Rectangulo rojo) <br> 3.Pintar una región rectangular de un color utilizando la estructura de ImageData. (Rectangulo en azul)";
}




//// Ejercicio 4 y 5

function degrade(){
    //Ejercicio 4
    let width = 200; //En este caso voy a utilizar el mismo ancho y largo para los dos degrade 
    let heigth = 200;
    let degrade1 = ctx.createImageData(width, heigth);
    for(let x = 0; x < width; x++){
        for(let y = 0; y < heigth; y++){
            let color = y / heigth * 255;
            setPixel(degrade1, x, y, color, color, color, 255);
        }
    }

    //Ejercicio 5
    let degrade2 = ctx.createImageData(width, heigth);
    for(let x = 0; x < width*0.5; x++){
        let color2 = (x / (width*0.5)*255);   
        for(let y = 0; y < heigth; y++){
            setPixel(degrade2, x, y, color2, color2, 0, 255);
        }
    }
    for(let x = width/2; x < width; x++){
        let color2 = (1 - (x-width*0.5) / (width*0.5)) * 255;
        for(let y = 0; y < heigth; y++){
            setPixel(degrade2, x, y, 255, color2, 0, 255);
        } 
    }

    ctx.putImageData(degrade1, 30, 20);
    ctx.putImageData(degrade2, 270, 270);

    let text = document.getElementById("text");
    text.innerHTML = "4. Especificar la función para pintar un rectángulo utilizando un gradiente <br> 5. Pintar un rectángulo en pantalla, utilizando un gradiente que vaya de negro a amarillo en la primera mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado, en Y el degrade se mantiene constante.";
}   





//// Ejercicio 6

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


function dibujarImagen(imagen){
    let w = canvas.width;
    let h = canvas.height;
    ctx.drawImage(imagen, 0, 0, w, h);
}


function image(){ 
    let imagen = new Image();
    imagen.crossOrigin = "anonymous";
    imagen.src = "images/splash.jpg";

    imagen.onload = function(){
        dibujarImagen(imagen);
        imageData = ctx.getImageData(0, 0, canvas.width,canvas.height);
    }

    let text = document.getElementById("text");
    text.innerHTML = "6. Cargar una Imagen desde disco o URL <br> a. Dibujar la imagen dentro del canvas <br> b. Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el canvas."
    
}


function filtro(imageData){
    for(let x = 0; x < canvas.width; x++){
        for(let y = 0; y < canvas.height; y++){
            let r = getRed(imageData, x, y);
            let g = getGreen(imageData, x, y);
            let b = getBlue(imageData, x, y);
            let gris = (r + g + b) / 3;
            setPixel(imageData, x, y, gris, gris, gris, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}


function getRed(imageData, x, y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
  }
  
  function getGreen(imageData, x, y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
  }
  
  function getBlue(imageData,x,y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
  }






