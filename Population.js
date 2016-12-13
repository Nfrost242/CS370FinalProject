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
    this.generation = 0;
    this.averageDist = 0;
    this.avgAge = 0;
    this.avgTimeToGoal = 0;

    for (var i = 0; i < this.populationSize; i++) {
        this.Cars[i] = new Car(this.startX, this.startY, new DNA());
    }
}

Population.prototype = {
    // Evaluate fitness of Cars
    evaluate: function(){
        var maxFitness = 0;
        var minFitness = -1;
        var avgFitness = 0;
        var maxAge = 0;
        var avgAge = 0;
        this.generation++;

        document.getElementById("generation").innerHTML = "Generation: " + this.generation;

        // Find max fitness
        for (var i = 0; i < this.populationSize; i++) {
            this.Cars[i].calculateFitness(this.goal);

            avgFitness += this.Cars[i].getFitness();
            avgAge += this.Cars[i].getAge();

            if (this.Cars[i].getFitness() > maxFitness) {
                maxFitness = this.Cars[i].getFitness();
                document.getElementById("maxFitness").innerHTML = "Max Fitness: " + maxFitness.toFixed(4);
            }

            if (this.Cars[i].getFitness() < minFitness || minFitness == -1){
                minFitness = this.Cars[i].getFitness();
            }

            if (this.Cars[i].getAge() > maxAge){
                maxAge = this.Cars[i].getAge();
                document.getElementById("maxAge").innerHTML = "Max Age: " + maxAge;
            }
        }


        avgFitness /= this.Cars.length;
        document.getElementById("avgFitness").innerHTML = "Average Fitness: " + avgFitness.toFixed(4);

        avgAge /= this.Cars.length;
        document.getElementById("avgAge").innerHTML = "Average Age: " + avgAge;

        // Make each Car's fitness a ratio of the highest fitness - will scale from 0.0 to 1.0
        for (var j = 0; j < this.populationSize; j++) {
            this.Cars[j].normalizeFitness(minFitness, maxFitness);
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
        var maxFit = 0;

        /*
        for (var i = 0; i < this.populationSize; i++) {
            // Preserve top of population - only 50 percent will have fitness over 0.5
            if(this.Cars[i].getFitness() > 0.25)
                children.push(new Car(this.startX, this.startY, this.Cars[i].dna))
        }*/

        // Create offspring
        for (var j = children.length; j < this.populationSize; j++) {
            var parentA = this.matingPool[this.getRandomMate(this.matingPool.length)].getDNA();
            var parentB = this.matingPool[this.getRandomMate(this.matingPool.length)].getDNA();

            var childDNA = parentA.crossover(parentB);
            childDNA.mutation();

            children.push(new Car(this.startX, this.startY, childDNA));
        }
        this.Cars = children;
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
            //this.Cars[i].calculateFitness(this.goal);

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

