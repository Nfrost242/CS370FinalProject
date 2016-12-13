/**
 * Main javascript file where canvas is handled
 */
var canvas;
var ctx;
var height, width;
var track;

var p;
// Setup initial variables and start game loop
function main(){
    // Canvas dimensions
    height = 600;
    width = 600;

    // Create Canvas
    canvas = document.createElement("canvas");
    canvas.setAttribute("oncontextmenu", "return false;");
    canvas.width = width;
    canvas.height = height;

    // Handle unsupported browsers
    if (!(!!canvas.getContext && canvas.getContext("2d"))) {
        alert("Your browser doesn't support HTML5");
    }

    // Get 2D context
    ctx = canvas.getContext("2d");
    track = new Track(width, height, 40);

    // Add canvas to html5 file
    document.body.appendChild(canvas);
    canvas.addEventListener("mousedown", handleClick, false);
    canvas.addEventListener("mouseup", handleClick, false);
    canvas.addEventListener("mousemove", handleClick, false);

    // TEST
    var startingPos = track.getCenterOfCell(2,1);
    p = new Car(startingPos.x,startingPos.y, 0);
    // END TEST

    // Kick off game loop
    run();
}

// Game loop
function run(){
    var loop = function() {
        update();
        draw();
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
}

// Update all objects
function update(){}

// Draw all objects to screen
function draw(){
    ctx.clearRect(0,0,width, height);
    track.draw(ctx);

    p.draw(ctx);

}

// Handle clicks on canvas
function handleClick(e){
    e.preventDefault();

    var rect = canvas.getBoundingClientRect();
    var x =  e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var wallValue = e.which == 1; // Create wall if Left mouse clicked, erase if Right


    if(e.type == "mousedown"){
        track.setClickFlag(true);
        track.addWall(x, y, wallValue);
    }
    else if(e.type == "mouseup"){
        track.setClickFlag(false);
    }
    else if(e.type == "mousemove"){
        track.addWall(x, y, wallValue);
    }

}
// Start game
main();