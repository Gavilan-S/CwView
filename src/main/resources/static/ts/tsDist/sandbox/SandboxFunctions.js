var rows;
var columns;
var grid;
var cellSize = 15;
var speed = 5;
var tick = 0;
var mouseAction = false;
var canvasWidth;
var canvasHeight;
export function sandboxCreate(canvas) {
    var context = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    if (context) {
        sandboxSetup();
        sandboxAnimate(context);
        canvas.addEventListener("mousedown", function (event) { return startDrawing(event, canvas); });
        canvas.addEventListener("mousemove", function (event) { return drawPixel(event, canvas); });
        canvas.addEventListener("mouseup", stopDrawing);
    }
}
function create2DArray(rows, cols) {
    var array = [];
    for (var row = 0; row < rows; row++) {
        array[row] = [];
        for (var column = 0; column < cols; column++) {
            array[row][column] = 0;
        }
    }
    return array;
}
function sandboxSetup() {
    rows = Math.floor(canvasHeight / cellSize);
    columns = Math.floor(canvasWidth / cellSize);
    grid = create2DArray(rows, columns);
    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            grid[row][columns] = 0;
        }
    }
    grid[0][4] = 1;
}
function startDrawing(event, canvas) {
    mouseAction = true;
    drawPixel(event, canvas);
}
function drawPixel(event, canvas) {
    if (!mouseAction)
        return;
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var row = Math.floor(mouseY / cellSize);
    var column = Math.floor(mouseX / cellSize);
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
        grid[row][column] = 1;
    }
}
function stopDrawing() {
    mouseAction = false;
}
function sandboxDraw(context) {
    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            // clasic if with ?
            context.fillStyle = grid[row][column] === 1 ? "#fff" : "#000";
            // width: col * cellSize, height: row * cellSize, cellSize*cellSize
            context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            // same for border as up
            context.strokeStyle = "#fff";
            context.lineWidth = 2;
            context.strokeRect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}
function sandboxUpdate() {
    var nextGrid = create2DArray(rows, columns);
    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            var actualState = grid[row][column];
            if (row < rows - 1) {
                if (actualState === 1) {
                    var belowCell = grid[row + 1][column];
                    if (belowCell === 0) {
                        nextGrid[row + 1][column] = 1;
                    }
                }
            }
            else {
                nextGrid[row][column] = 1;
            }
        }
    }
    grid = nextGrid;
}
function sandboxAnimate(context) {
    function animate() {
        tick++;
        if (tick % speed === 0) {
            sandboxUpdate();
            sandboxDraw(context);
        }
        requestAnimationFrame(animate);
    }
    animate();
}
