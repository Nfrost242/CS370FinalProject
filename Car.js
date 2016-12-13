/*
 * Car class that will handle the cars and their DNA
 *
 * Fitness based on time survived without crashing and distance travelled
 *
 * Fun Fact: this class is called cars because originally this was going to be a racing game, but I changed my mind
 */

function Car(x, y, dna){
    this.age = 0;
    this.minDistance = -1;
    this.pos = new Vector(x, y);
    this.dna = dna;
    this.alive = true;
    this.speed = new Vector(10, 0);
    this.accl = new Vector();
    this.fitness = 0;
    this.angle = 0;
    this.goalFound = false;
    this.w = 15;
    this.l = 20;
    this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

Car.prototype = {
    // Update the cars position
    update: function(ctx) {
        if (this.alive) {
            if(this.dna[this.age]){
                this.accl = this.dna[this.age];
            }else{
                var randGene = this.getRandomGene();

                this.accl = randGene;
                this.dna.addGene(randGene);
            }

            this.speed.add(this.accl);
            this.pos.add(this.speed);

            this.age++;
        }


        //this.accl.multiply(0);
    },

    // Draw car to canvas
    draw:function(ctx){
        // Car always facing direction of travel
        this.angle = this.speed.toAngles()+Math.PI/2;

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
    calculateFitness:function(goal){
        var distance = Math.abs(goal.length() -this.pos.length()); // Distance from the goal

        if(distance < this.minDistance || this.minDistance == -1){
            this.minDistance = distance;
        }

        // Fitness will be a function of minimum distance achieved and age of car.
        var fit = 1/this.minDistance; // Smaller is better

        fit *= this.age; // Age is important

        if(this.goalFound){
            fit*= 10; // Major boost to fitness
        }

        this.fitness = fit;
    },

    // Normalizes fitness as a ratio of the max fitness in the population
    normalizeFitness: function(maxFit){
        this.fitness /= maxFit;
    },


    // Return position
    getPosition: function(){
        return this.pos;
    },

    // Return fitness
    getFitness:function(){
        return this.fitness;
    },

    // Return DNA
    getDNA:function(){
        return this.dna;
    },

    // Kill car if it collides with wall
    kill: function(){
        this.alive = false;
    },

    // Returns if car is alive
    isAlive: function(){
        return this.alive;
    },

    // Make a random gene if car is still alive
    getRandomGene: function(){
        var rX = Math.random()*10 - 5;
        var rY = Math.random()*10 - 5;

        return new Vector(rX, rY);
    },

    // Set to true if goal is found, major benefit to fitness
    foundGoal: function(){
        this.goalFound = true;
    }
};
