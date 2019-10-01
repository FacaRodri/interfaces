export class Plane {
    
    bee = document.getElementById("bee");
    plane = document.getElementById("plane");
    dodging = false;
    

    planeUp(){
        this.plane.className = "planeUp";
        this.dodging = true;
    }

    inMovement(){
        this.plane.className = "plane";
        this.dodging = false;
    }



    dead(){
        this.plane.className = "dead";
    }

    colision(){
        if (this.plane.offsetTop < this.bee.offsetWidth + this.bee.offsetTop && 
            this.plane.offsetWidth + this.plane.offsetTop > this.bee.offsetTop &&
            this.plane.offsetLeft < this.bee.offsetLeft + this.bee.offsetHeight &&
            this.plane.offsetHeight + this.plane.offsetLeft > this.bee.offsetLeft) {
                return true;
        }
        return false;
    }






}