var rows;
var columns;
var grid;
var cellSize = 5;
var mouseAction = false;
var canvasWidth;
var canvasHeight;
var colorPalette = [
  "#FF6F61",
  "#FFB347",
  "#FFD700",
  "#4CAF50",
  "#2196F3",
  "#FF5722",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#00BCD4"
];
var colorIndex = 0;
var colorChangeThreshold = 2000;
var squareCount = 0;

export function sandboxCreate(canvas) {
  var context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  if (context) {
    sandboxSetup();
    sandboxAnimate(context);

    canvas.addEventListener("mousedown", function (event) { 
      startDrawingMouse(event, canvas);
      if (typeof sendCoordinates === 'function') {
        sendCoordinates(event);
      }
    });

    canvas.addEventListener("mousemove", function (event) { 
      drawPixelMouse(event, canvas);
      if (mouseAction && typeof sendCoordinates === 'function') {
        sendCoordinates(event);
      }
    });

    canvas.addEventListener("mouseup", stopDrawingMouse);
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
  rows = Math.floor(canvasHeight/cellSize);
  columns = Math.floor(canvasWidth/cellSize);
  grid = create2DArray(rows, columns);
}

function stopDrawingMouse() {
  mouseAction = false;
}

function startDrawingMouse(event, canvas) {
  mouseAction = true;
  drawPixelMouse(event, canvas);
}

// TODO: solve corners problem
function drawPixelMouse(event, canvas) {
  if (!mouseAction) return;

  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  var mouseRow = Math.floor(mouseY / cellSize);
  var mouseColumn = Math.floor(mouseX / cellSize);
  var matrixMouse = 5;
  var extent = Math.floor(matrixMouse / 2);
  for (var mouseExtentX = -extent; mouseExtentX <= extent; mouseExtentX++) {
    for (var mouseExtentY = -extent; mouseExtentY <= extent; mouseExtentY++) {
      var randomChange = Math.random() < 0.75;
      if (randomChange) {
        var row = mouseRow + mouseExtentX;
        var column = mouseColumn + mouseExtentY;
        if (row >= 0 && row < rows && column >= 0 && column < columns && grid[row][column] === 0) {
          grid[row][column] = colorIndex + 1;
          squareCount++;
          if (squareCount >= colorChangeThreshold) {
            colorIndex = (colorIndex + 1) % colorPalette.length;
            squareCount = 0;
          }
        }
      }
    }
  }
}

function sandboxDraw(context) {
  for (var row = 0; row < rows; row++) {
    for (var column = 0; column < columns; column++) {
      var cellState = grid[row][column];
      context.fillStyle = cellState === 0 ? "#000" : colorPalette[(cellState - 1) % colorPalette.length];
      context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

function sandboxUpdate() {
  var nextGrid = create2DArray(rows, columns);
  for (var row = 0; row < rows; row++) {
    for (var column = 0; column < columns; column++) {
      var actualState = grid[row][column];
      if (actualState !== 0) {
        if (row < rows - 1) {
          var belowCell = grid[row + 1][column];
          var belowCellLeft = grid[row + 1][column - 1] || 0;
          var belowCellRight = grid[row + 1][column + 1] || 0;
          if (belowCell === 0) {
            nextGrid[row + 1][column] = actualState;
          }
          else {
            var randomSide = Math.random() < 0.5;
            if (randomSide && belowCellLeft === 0) {
              nextGrid[row + 1][column - 1] = actualState;
            }
            else if (!randomSide && belowCellRight === 0) {
              nextGrid[row + 1][column + 1] = actualState;
            }
            else {
              nextGrid[row][column] = actualState;
            }
          }
        }
        else {
          nextGrid[row][column] = actualState;
        }
      }
    }
  }
  grid = nextGrid;
}

function sandboxAnimate(context) {
  function animate() {
    sandboxUpdate();
    sandboxDraw(context);
    requestAnimationFrame(animate);
  }
  animate();
}

export function simulateClick(coordinates) {
  const canvas = document.getElementById("sandboxCanvas");
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const [rawX, rawY] = coordinates.split(",").map(Number);
  
  const simulatedEvent = {
    clientX: rawX + rect.left,
    clientY: rawY + rect.top
  };
  
  mouseAction = true;
  drawPixelMouse(simulatedEvent, canvas);
  mouseAction = false;
}
