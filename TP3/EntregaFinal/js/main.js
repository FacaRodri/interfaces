var ej2 = document.querySelector("#ej2");

function rotar(){
    let rodar = Math.round(Math.random()* (360));
    ej2.style.transform = 'rotate(' + rodar + 'deg)';
}

//Ejercicio 3
var inc = 1000;

clock();

function clock() {
   let date = new Date();

   let hours = ((date.getHours() + 11) % 12 + 1);
   let minutes = date.getMinutes();
   let seconds = date.getSeconds();
  
   let hour = hours * 30;
   let minute = minutes * 6;
   let second = seconds * 6;
  
  document.querySelector('.hours').style.transform = `rotate(${hour}deg)`
  document.querySelector('.minutes').style.transform = `rotate(${minute}deg)`
  document.querySelector('.seconds').style.transform = `rotate(${second}deg)`
}

setInterval(clock, inc);

///
//Ejercicio 5
document.getElementById('divCat').addEventListener("click", function(){
  var cat = document.getElementById("cat");
    var x = event.layerX; 
    var y = event.layerY;
    console.log(cat.style.left+"   "+x);
    cat.style.left = (cat.style.left - x)+"px";
});
  