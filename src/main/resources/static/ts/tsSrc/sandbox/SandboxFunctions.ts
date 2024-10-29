let rows: number;
let columns: number;
let grid: number[][];
let cellSize = 5;

let mouseAction: boolean = false;
let canvasWidth: number;
let canvasHeight: number;

let colorPalette = [
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
let colorIndex = 0;
let colorChangeThreshold = 2000;
let squareCount = 0;

export function sandboxCreate(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

  if (context) {
    sandboxSetup();
    sandboxAnimate(context);

    canvas.addEventListener("mousedown", (event) => startDrawingMouse(event, canvas));
    canvas.addEventListener("mousemove", (event) => drawPixelMouse(event, canvas));
    canvas.addEventListener("mouseup", stopDrawingMouse);  
  }
}

function create2DArray(rows: number, cols: number): number[][] {
  const array: number[][] = [];
  for (let row = 0; row < rows; row++) {
    array[row] = []; 
    for (let column = 0; column < cols; column++) {
      array[row][column] = 0; 
    }
  }
  return array;
}

function sandboxSetup(): void {
  rows = Math.floor(canvasHeight / cellSize);
  columns = Math.floor(canvasWidth / cellSize);
  grid = create2DArray(rows, columns);
}

function startDrawingMouse(event: MouseEvent, canvas: HTMLCanvasElement): void {
  mouseAction = true;
  drawPixelMouse(event, canvas);
}

function drawPixelMouse(event: MouseEvent, canvas: HTMLCanvasElement): void {
  if (!mouseAction) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const mouseRow = Math.floor(mouseY / cellSize);
  const mouseColumn = Math.floor(mouseX / cellSize);

  let matrixMouse = 5;
  let extent = Math.floor(matrixMouse / 2);

  for (let mouseExtentX = -extent; mouseExtentX <= extent; mouseExtentX++) {
    for (let mouseExtentY = -extent; mouseExtentY <= extent; mouseExtentY++) {
      const randomChange: boolean = Math.random() < 0.75;
      if (randomChange) {
        let row = mouseRow + mouseExtentX;
        let column = mouseColumn + mouseExtentY;

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

function stopDrawingMouse(): void {
  mouseAction = false;
}

function sandboxDraw(context: CanvasRenderingContext2D): void {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cellState = grid[row][column];
      context.fillStyle = cellState === 0 ? "#000" : colorPalette[(cellState - 1) % colorPalette.length];
      context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

function sandboxUpdate(): void {
  let nextGrid: number[][] = create2DArray(rows, columns);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let actualState = grid[row][column];
      if (actualState !== 0) {
        if (row < rows - 1) {
          let belowCell = grid[row + 1][column];
          let belowCellLeft = grid[row + 1][column - 1] || 0;
          let belowCellRight = grid[row + 1][column + 1] || 0;

          if (belowCell === 0) {
            nextGrid[row + 1][column] = actualState;
          } else {
            const randomSide: boolean = Math.random() < 0.5;
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

function sandboxAnimate(context: CanvasRenderingContext2D): void {
  function animate() {
    sandboxUpdate();
    sandboxDraw(context);
    requestAnimationFrame(animate);
  }
  animate();
}
