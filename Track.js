/**
 * Stores track information, used for collision detection
 */

function Track(height, width, scale){
    this.gridScale = scale; // pixel height/width of squares that make up gride
    this.height = height;
    this.width = width;
    this.clickFlag = false;
    this.eraseFlag = false;
    this.gridColor = '#e9e9e9';
    this.trackColor =  "#ffe4ab";
    this.rows = Math.floor(this.height/this.gridScale);
    this.cols = Math.floor(this.width/this.gridScale);

    // 2D array of columns and rows, true if wall, false if not
    this.walls = [];

    // initialize array
    for(var r=0; r < this.rows; r++){
        this.walls[r] = [];

        for(var c=0; c < this.cols; c++){
             this.walls[r][c] = false;
        }
    }
}

Track.prototype = {
    // Draw walls
    draw: function(ctx){
        for(var r=0; r < this.rows; r++){
            for(var c=0; c < this.cols; c++){
                // Draw Grid
                if(this.walls[r][c]){
                    ctx.fillStyle = this.trackColor;
                    ctx.fillRect(c*this.gridScale, r*this.gridScale, this.gridScale, this.gridScale);
                }else{
                    ctx.strokeStyle = this.gridColor;
                    ctx.strokeRect(c*this.gridScale, r*this.gridScale, this.gridScale, this.gridScale);
                }
            }
        }
    },

    setClickFlag: function(flag){
        this.clickFlag = flag;
    },

    // Handle click, and add wall if necessary
    addWall: function(x, y, wallValue){
        var row = Math.floor(y / this.gridScale);
        var col = Math.floor(x / this.gridScale);

        if(this.clickFlag){
            this.walls[row][col] = wallValue;
        }
    },

    // Get center of cell for car position purpose
    getCenterOfCell: function(row, col){
        return new Vector(row*this.gridScale + this.gridScale/2, col*this.gridScale + this.gridScale/2);
    },

    detectCollision: function(car){

    }

};

