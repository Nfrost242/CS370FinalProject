/*
 * Car class that will handle the cars and their DNA
 */

function car(x, y, dna){
    this.pos = new Vector2D(x, y);
    this.dna = dna;
    this.speed = new Vector2D();
    this.accl = new Vector2D();
    this.fitness = 0;

    this.update = function(){
        this.speed.add(this.accl);
        this.pos.add(this.speed);

        this.accl.multiply(0);
    };

    this.draw = function(){};
    this.calculateFitness = function(){};

    this.accelerate = function(acclVector){
        this.accl.add(acclVector);
    };

    this.getFitness = function(){
        return this.fitness;
    };
    this.getDNA = function(){
        return this.dna;
    };
}

