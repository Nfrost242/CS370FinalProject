/**
 * Stores track information, used for collision detection
 */

function Track(width, height, scale, goal){
    this.gridScale = scale; // pixel height/width of squares that make up gride
    this.width = width;
    this.height = height;
    this.clickFlag = false;
    this.eraseFlag = false;
    this.gridColor = '#e9e9e9';
    this.trackColor =  "#ffe4ab";
    this.goalColor = "#ff4f00";
    this.rows = Math.floor(this.height/this.gridScale);
    this.cols = Math.floor(this.width/this.gridScale);
    this.goal = goal;

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
        // Draw Goal
        var goalPos = this.getCenterOfCell(this.goal.x, this.goal.y);
        ctx.fillStyle = this.goalColor;
        ctx.beginPath();
        ctx.arc(goalPos.x, goalPos.y, this.gridScale/2-2, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        // Draw Grid and Walls
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

        if(this.clickFlag && !this.goal.equals(row, col)){
            this.walls[row][col] = wallValue;
        }
    },

    // Get center of cell for car position purpose
    getCenterOfCell: function(row, col){
        return new Vector(row*this.gridScale + this.gridScale/2, col*this.gridScale + this.gridScale/2);
    },

    // Detect if car is colliding with wall and kill it if it is
    detectCollision: function(car){
        for(var r=0; r < this.rows; r++){
            for(var c=0; c < this.cols; c++){
                var pos = car.getPosition();
                var row = Math.floor(pos.y / this.gridScale);
                var col = Math.floor(pos.x / this.gridScale);

                row = Math.min(this.rows-1, row);
                col = Math.min(this.cols-1, col);
                row = Math.max(0, row);
                col = Math.max(0, col);

                // Draw Grid
                if(this.walls[row][col]) {
                   car.kill();
                }

                var goalCoord = this.getGoalLocation();
                if(car.getPosition().distanceTo(goalCoord) <= this.gridScale/2){ // Distance less than radius of goal
                    car.foundGoal();
                }
            }
        }
    },

    // Return the true goal location adjusting for scale
    getGoalLocation: function(){
        return this.getCenterOfCell(this.goal.x, this.goal.y);
    }
};

