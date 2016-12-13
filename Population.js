/**
 * Handles population of Cars
 */

function Population(startX, startY, popSize){
    this.Cars = [];
    this.populationSize = popSize;
    this.matingPool = [];
    this.startX = startX;
    this.startY = startY;
    this.goal = new Vector(0,0); // Default, set later

    for (var i = 0; i < this.populationSize; i++) {
        this.Cars[i] = new Car(this.startX, this.startY, new DNA([new Vector(5,0)]));
    }
}

Population.prototype = {
    // Evaluate fitness of Cars
    evaluate: function(){
        var maxFitness = 0;

        // Find max fitness
        for (var i = 0; i < this.populationSize; i++) {
            this.Cars[i].calculateFitness(this.goal);

            if (this.Cars[i].getFitness() > maxFitness) {
                maxFitness = this.Cars[i].getFitness();
            }
        }


        // Make each Car's fitness a ratio of the highest fitness - will scale from 0.0 to 1.0
        for (var j = 0; j < this.populationSize; j++) {
            this.Cars[j].normalizeFitness(maxFitness);
        }

        // Proportionally fill mating pool with most fit individuals
        this.matingPool = [];
        for (var k = 0; k < this.populationSize; k++) {
            var n = Math.floor(this.Cars[k].getFitness() * 100);
            for (var l = 0; l < n; l++) {
                this.matingPool.push(this.Cars[k]);

            }
        }
    },

    // Populate mating pool
    mate: function(){
        var children = [];

        for (var i = 0; i < this.Cars.length; i++) {
            var parentA = this.matingPool[this.getRandomMate(this.matingPool.length)].getDNA();
            var parentB = this.matingPool[this.getRandomMate(this.matingPool.length)].getDNA();

            var childDNA = parentA.crossover(parentB);
            childDNA.mutation();

            children[i] = new Car(this.startX, this.startY, childDNA);
        }
        this.Cars = children;
    },

    getRandomMate: function(matingPoolSize){
        var r =  Math.floor(Math.random() * matingPoolSize);
        return r;
    },

    // Update population
    update: function(){
        var allDead = true;

        for (var i = 0; i < this.Cars.length; i++) {
            this.Cars[i].update();

            if(this.Cars[i].isAlive()){
                allDead = false;
            }
        }

        // Once the entire generation is killed off, make a new one
        if(allDead){
            this.evaluate();
            this.mate();
        }
    },

    // Draw population
    draw: function(ctx){
        for (var i = 0; i < this.Cars.length; i++) {
            this.Cars[i].draw(ctx);
        }
    },

    // Returns array of population
    getPopulation: function(){
        return this.Cars;
    },

    // Sets the goal
    setGoal: function(g){
        this.goal = g;
    }


};

