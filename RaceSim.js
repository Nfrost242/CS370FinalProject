/**
 * Main javascript file where canvas is handled
 */
var canvas;
var ctx;
var height, width;

// Setup initial variables and start game loop
function main(){
    // Canvas dimensions
    height = 900;
    width = 900;

    // Create Canvas
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Handle unsupported browsers
    if (!(!!canvas.getContext && canvas.getContext("2d"))) {
        alert("Your browser doesn't support HTML5, please update to latest version");
    }

    // Get 2D context
    ctx = canvas.getContext("2d");

    // Add canvas to html5 file
    document.appendChild(canvas);

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
function draw(){}

// Start game
main();


