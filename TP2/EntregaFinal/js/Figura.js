import { Circulo } from "./Circulo.js";
export class Figura{

    constructor(ctx){
        this.puntos = [];
        this.ctx = ctx;
        this.centro = null;
        this.distanciasX = [];
        this.distanciasY = [];
        this.tieneCentro = false;
        this.brillo = 50;
        this.colorLineas = 	"hsl(63, 100%, 50%)";
    }

    getPuntos(){
        return this.puntos;
    }

    getDistanciasX(){
        return this.distanciasX;
    }

    getDistanciasY(){
        return this.distanciasY;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    getCentro(){
        return this.centro;
    }

    yCentro(){
        let suma = 0;
        for (var i = 0; i < this.puntos.length; i++) {
            suma = suma + this.puntos[i].getY();
        }
        return suma/i;
    }

    xCentro(){
        let suma = 0;
        for (var i = 0; i < this.puntos.length; i++) {
            suma = suma + this.puntos[i].getX();
        }
        return suma/i;
         
    }

    drawCirculo(){
        this.getPuntos().forEach ((v) => {
            v.draw(this.ctx);
        });
    }

    drawLineas(){
        if (this.puntos.length > 0) {
            for (let i = 0; i < this.puntos.length -1; i++){
                this.ctx.lineWidth = 3;
                this.ctx.strokeStyle = this.colorLineas;
                this.ctx.beginPath();
                this.ctx.lineWidth = "5";
                this.ctx.moveTo(this.puntos[i].getX(), this.puntos[i].getY());
                this.ctx.lineTo(this.puntos[i+1].getX(), this.puntos[i+1].getY());
                this.ctx.stroke();
            }
            if(this.tieneCentro){
                this.ctx.moveTo(this.puntos[0].getX(), this.puntos[0].getY());
                this.ctx.lineTo(this.puntos[this.puntos.length-1].getX(), this.puntos[this.puntos.length-1].getY());
                this.ctx.stroke();
            }

        }
    }

    draw() {
        this.drawCirculo();
        this.drawLineas();
    }
    
    cerrarFigura(){
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "yellow";
        this.ctx.beginPath();
        this.ctx.moveTo(this.puntos[0].getX(), this.puntos[0].getY());
        this.ctx.lineTo(this.puntos[this.puntos.length-1].getX(), this.puntos[this.puntos.length-1].getY());
        this.ctx.stroke();
        ///Circulo verde que marca el centro.
        this.drawCentro();
    }

    drawCentro(){
        let circulo = new Circulo(this.xCentro(), this.yCentro(), 7, '#39ff14');
        this.centro = circulo;
        this.centro.draw(this.ctx);
        this.tieneCentro = true;
    }

    setArrFigura(){
        this.puntos = [];
    }

    addCirculo(circulo){
        this.puntos.push(circulo);
    }

    clickVertice(x, y){
        for (let i = 0; i < this.puntos.length; i++) {
            if (this.puntos[i].clickMe(x, y)){
                return this.puntos[i];
            }
        }
    }


    clickCentro(x, y){
        return (this.centro.clickMe(x, y));
    }
    
    reDibujar(difX, difY){
        this.setCirculo(difX, difY, this.centro);
        this.centro.draw(this.ctx);
        for (let i = 0; i < this.puntos.length; i++) {
            this.setCirculo(difX, difY, this.puntos[i]);
        }
    }

    moveVer(difX, difY, circulo){
        this.setCirculo(difX, difY, circulo);
        this.drawCentro();
    }

    setCirculo(difX, difY, circulo){ //setea el centro con la diferencia en x/y
        circulo.setX(difX);
        circulo.setY(difY);
    }

    restoX(xActual, circulo){
        return xActual - circulo.getX();
    }
    restoY(yActual, circulo){
        return yActual - circulo.getY();
    }

    removeItemFromArr (array , item ) {
        if(this.puntos.length > 3){
            var i = this.puntos.indexOf( item );
            this.puntos.splice( i, 1 );
        }
    }

    cambiarColor(valor){
        if (this.puntos.length > 1) {
          if (valor > 0){
            this.brillo += -0.3;
          }else{
            this.brillo += 0.3;
          }
          this.colorLineas = ("hsl(63, 100%,"+this.brillo+"%)");
          for (var i= 0 ; i < this.puntos.length ; i++){
            this.puntos[i].setColor("hsl(0, 100%, "+ this.brillo + "%)");
          }
        }
      }
     
  


}