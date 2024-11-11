var rows;
var columns;
var grid;
var cellSize = 5;
var isDrawing = false;
var canvasWidth;
var canvasHeight;

var colorPalette = [
  "#FF6F61", "#FFB347", "#FFD700", "#4CAF50", "#2196F3",
  "#FF5722", "#9C27B0", "#673AB7", "#3F51B5", "#00BCD4"
];
var colorIndex = 0;
var colorChangeThreshold = 2000;
var squareCount = 0;

var canvasWidthPercentage = 0.6; 
var canvasHeightPercentage = 0.8;

var borderThickness = 3;

export function sandboxCreate(canvas) {
  resizeCanvas(canvas);

  var context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  if (context) {
    sandboxSetup();
    sandboxAnimate(context);

    // Mouse events
    canvas.addEventListener("mousedown", (event) => {
      event.preventDefault();
      isDrawing = true;
      handleDrawEvent(event, canvas);
    });

    canvas.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (isDrawing) {
        handleDrawEvent(event, canvas);
      }
    });

    canvas.addEventListener("mouseup", (event) => {
      event.preventDefault();
      isDrawing = false;
    });

    canvas.addEventListener("mouseleave", (event) => {
      event.preventDefault();
      isDrawing = false;
    });

    // Touch events
    canvas.addEventListener("touchstart", (event) => {
      event.preventDefault();
      isDrawing = true;
      handleTouchEvent(event, canvas);
    }, { passive: false });

    canvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      if (isDrawing) {
        handleTouchEvent(event, canvas);
      }
    }, { passive: false });

    canvas.addEventListener("touchend", (event) => {
      event.preventDefault();
      isDrawing = false;
    }, { passive: false });

    canvas.addEventListener("touchcancel", (event) => {
      event.preventDefault();
      isDrawing = false;
    }, { passive: false });
  }
  window.addEventListener("resize", () => resizeCanvas(canvas));
}

function handleDrawEvent(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  drawPixel(x, y, canvas);
  
  // Send coordinates through WebSocket
  if (typeof window.sendCoordinates === 'function') {
    window.sendCoordinates({
      clientX: event.clientX,
      clientY: event.clientY,
      target: canvas
    });
  }
}

function handleTouchEvent(event, canvas) {
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  
  drawPixel(x, y, canvas);
  
  // Send coordinates through WebSocket
  if (typeof window.sendCoordinates === 'function') {
    window.sendCoordinates({
      clientX: touch.clientX,
      clientY: touch.clientY,
      target: canvas
    });
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

function drawPixel(x, y) {
  var mouseRow = Math.floor(y / cellSize);
  var mouseColumn = Math.floor(x / cellSize);
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
          var belowCellLeft = column > 0 ? grid[row + 1][column - 1] : 1;
          var belowCellRight = column < columns - 1 ? grid[row + 1][column + 1] : 1;

          if (belowCell === 0) {
            nextGrid[row + 1][column] = actualState;
          } else {
            var randomSide = Math.random() < 0.5;
            if (randomSide && belowCellLeft === 0) {
              nextGrid[row + 1][column - 1] = actualState;
            } else if (!randomSide && belowCellRight === 0) {
              nextGrid[row + 1][column + 1] = actualState;
            } else {
              nextGrid[row][column] = actualState;
            }
          }
        } else {
          nextGrid[row][column] = actualState;
        }
      }
    }
  }

  grid = nextGrid;
}

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth * canvasWidthPercentage;
  canvas.height = window.innerHeight * canvasHeightPercentage;

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

  rows = Math.floor(canvasHeight / cellSize);
  columns = Math.floor(canvasWidth / cellSize);

  grid = create2DArray(rows, columns);

  sandboxSetup();
  sandboxDraw(canvas.getContext("2d"));
}

function drawBorder(context) {
  context.strokeStyle = "#FFF";
  context.lineWidth = borderThickness;
  context.strokeRect(
    borderThickness / 2, 
    borderThickness / 2, 
    canvasWidth - borderThickness, 
    canvasHeight - borderThickness
  );
}

function sandboxAnimate(context) {
  function animate() {
    sandboxUpdate();
    sandboxDraw(context);
    drawBorder(context);
    requestAnimationFrame(animate);
  }
  animate();
}

export function simulateClick(coordinates) {
  const canvas = document.getElementById("sandboxCanvas");
  if (!canvas) return;
  
  const [x, y] = coordinates.split(",").map(Number);
  drawPixel(x, y);
}
