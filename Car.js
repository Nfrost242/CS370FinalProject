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
    this.start = new Vector(x, y);
    this.dna = dna;
    this.alive = true;
    this.speed = new Vector(0, 0);
    this.accl = new Vector(0, 0);
    this.fitness = 0;
    this.angle = 0;
    this.goalFound = false;
    this.w = 15;
    this.l = 20;
    this.timeToGoal = -1;
    this.distanceTravelled = 0;
    this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

Car.prototype = {
    // Update the cars position
    update: function(ctx) {
        if (this.alive && !this.goalFound) {
            if(this.dna.getGenes()[this.age]){
                this.accl = this.dna.getGenes()[this.age].clone();
            }else{
                var randGene = this.dna.randomGene();
                this.dna.addGene(randGene);

                this.accl = this.dna.getGenes()[this.age].clone();
            }

            this.speed.add(this.accl);
            this.pos.add(this.speed);

            this.age++;
        }

        this.accl.multiply(0);
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
        var distance = this.pos.distanceTo(goal); // Distance from the goal - Getting goal from global PathFinder var ...

        this.distanceTravelled = this.pos.distanceTo(this.start); // Accounting for this in fitness encourages exploration

        /*
        if(distance < this.minDistance || this.minDistance == -1)
            this.minDistance = distance;*/

         // Fitness will be a function of minimum distance achieved, age of car, and time it takes to get to goal
        var distanceFactor = 1/Math.max(1, Math.pow(distance,0.5));          // number between 0 and 1 representing closeness to target
        var ageFactor = 1 - 1/Math.max(1, Math.pow(this.age,2));             // number between 0 and 1 representing age
        var travelFactor = 1 - 1/Math.max(1, Math.pow(this.distanceTravelled,2));
        var fit = 0;

        if(this.goalFound){
            var timeFactor = 1/Math.max(1,Math.pow(this.timeToGoal,0.5));// Fitness will increase as time to goal decreases
            fit = 1 + timeFactor; // Time is the sole factor of fitness when goal is found, fitness gets a +1 so that no car that didn't find the goal will have higher fitness
        }else{
            fit = (0.25*travelFactor + 0.25*distanceFactor + 0.25*ageFactor);  // Fitness is evenly weighted average of age and distance, with a penalty of only being able to achieve max of 0.5 fitness
        }

        this.fitness = fit;
    },

    // Normalizes fitness as a ratio of the max fitness in the population
    normalizeFitness: function(minFit, maxFit){
        var range = maxFit-minFit;
        var fit = (this.fitness - minFit)/range;

        this.fitness = fit;
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

        if(this.timeToGoal == -1)
            this.timeToGoal = this.age;

        this.kill();
    },

    // Returns Age
    getAge: function(){
        return this.age;
    }
};
