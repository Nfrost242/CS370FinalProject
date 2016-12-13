/*
 * Car class that will handle the cars and their DNA
 *
 * Fitness based on time survived without crashing and distance travelled
 */

function Car(x, y, dna){
    this.pos = new Vector(x, y);
    this.dna = dna;
    this.speed = new Vector(10, 0);
    this.accl = new Vector();
    this.fitness = 0;
    this.angle = 0;
    this.w = 15;
    this.l = 20;
    this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

Car.prototype = {
    // Update the cars position
    update: function(){
        this.speed.add(this.accl);
        this.pos.add(this.speed);

        this.accl.multiply(0);
    },

    // Draw car to canvas
    draw:function(ctx){
        // Car always facing direction of travel
        this.angle = this.speed.toAngles()+Math.PI/2;
        console.log(this.angle);
        // Draw car as a triangle
        ctx.save();

        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.w/2,this.l);
        ctx.lineTo(-this.w/2,this.l);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    },

    // Change the cars acceleration
    accelerate:function(acclVector){
        this.accl.add(acclVector);
    },

    // Calculate the cars fitness value
    calculateFitness:function(){


    },

    // Return fitness
    getFitness:function(){
        return this.fitness;
    },

    // Return DNA
    getDNA:function(){
        return this.DNA;
    }
};
