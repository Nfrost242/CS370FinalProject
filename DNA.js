/**
 * DNA of car objects
 */

function DNA(genes){
    this.mutationRate = 0.05;
    this.maxAccl = 2;

    if(genes){
        this.genes = genes;
    }else{
        this.genes = []; // default
    }
}

DNA.prototype = {
    // Produce a child from two parents - This function is a mess.... but it works
    crossover: function (mate) {
        var childGenes = [];
        var mateGenes = mate.getGenes();

        var avgLength = Math.floor((this.genes.length + mateGenes.length)/2);
        var spliceIndex = Math.floor(Math.random() * avgLength);

        for(var i=0; i< avgLength; i++){
            if(i < spliceIndex){
                if(this.genes[i]){
                    childGenes.push(this.genes[i].clone());
                }else{
                    childGenes.push(mateGenes[i].clone());
                }
            }else{
                if(mateGenes[i]){
                    childGenes.push(mateGenes[i].clone());
                }else{
                    childGenes.push(this.genes[i].clone());
                }
            }
        }

        return new DNA(childGenes);
    },

    // Add mutations to the genetic pool
    mutation: function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (Math.random() < this.mutationRate) {
                this.genes[i] = this.randomGene();
            }
        }
    },

    // Return genes array()
    getGenes: function(){
        return this.genes;
    },

    // Add a new gene to the gene chain
    addGene: function(gene){
        this.genes.push(gene);
    },

    // Creates a random gene
    randomGene: function(){
        var randX = (Math.random() * (2*this.maxAccl)) - this.maxAccl;
        var randY = (Math.random() * (2*this.maxAccl)) - this.maxAccl;

        return new Vector(randX, randY);
    }
};