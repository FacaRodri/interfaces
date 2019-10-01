export class Circulo {
    constructor(paramPosX, paramPosY, paramRadio, paramColor){
        this.posX = paramPosX;
        this.posY = paramPosY;
        this.radio = paramRadio;
        this.color = paramColor;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY , this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    getY(){
        return this.posY;
    }

    getX(){
        return this.posX;
    }

    getRadio(){
        return this.radio;
    }

    getColor(){
        return this.color;
    }

    setX(x){
        this.posX = this.posX + x;
    }
    
    setY(y){
        this.posY = this.posY + y;
    }
             
    clickMe(x, y){
        return (Math.sqrt(Math.pow((x - this.getX()), 2) + Math.pow((y - this.getY()), 2))) <= this.getRadio();
    }

    setColor(color){
        this.color = color;
      }
}   