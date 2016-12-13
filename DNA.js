/**
 * DNA of car objects
 */

function DNA(genes){
    this.mutationRate = 0.01;

    this.maxAccl = 5;
    this.minAccl = -5;

    if(genes){
        this.genes = genes;
    }else{
        this.genes = [new Vector(1,0)]; // Arbitrary default
    }
}

DNA.prototype = {
    // Produce a child from two parents - This function is a mess.... but it works
    crossover: function (mate) {
        var childGenes = [];
        var mateGenes = mate.getGenes();

        var min = Math.min(this.genes.length, mateGenes.length);
        var max = Math.max(this.genes.length, mateGenes.length);

        for(var i=0; i<min; i++){
            if (this.genes[i].equals(mateGenes[i])) { // Keep their genes if they are the same
                childGenes.push(this.genes[i]);
            }
            else{ // Else its random
                var r = Math.random();  // 50 percent chance to take gene from each parent if genes are not the same

                if(r>0.5){
                    childGenes.push(this.genes[i]);
                }else{
                    childGenes.push(mateGenes[i]);
                }
            }
        }

        // Replace the rest of the gene array with the longer lived parents genes
        for(var j=min; j<max; j++){
            if(this.genes[i]){
                childGenes.push(this.genes[i])
            }else{
                childGenes.push(mateGenes[i]);
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
        var randX = (Math.random() * (this.maxAccl-this.minAccl)) - this.minAccl;
        var randY = (Math.random() * (this.maxAccl-this.minAccl)) - this.minAccl;

        return new Vector(randX, randY);
    }
};