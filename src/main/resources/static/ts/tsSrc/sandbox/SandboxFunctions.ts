let rows: number;
let columns: number;
let grid: number[][];
let cellSize = 10;
let speed = 30;
let tick = 0;

let mouseAction: boolean = false

let canvasWidth: number;
let canvasHeight: number;

export function sandboxCreate(canvas: HTMLCanvasElement): void {
const context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

  if (context) {
    sandboxSetup();
    sandboxAnimate(context);

    canvas.addEventListener("mousedown", (event) => startDrawing(event, canvas));
    canvas.addEventListener("mousemove", (event) => drawPixel(event, canvas));
    canvas.addEventListener("mouseup", stopDrawing);  
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

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      grid[row][columns] = 0;
    }
  }
  grid[0][4] = 1;
}

function startDrawing(event: MouseEvent, canvas: HTMLCanvasElement): void {
  mouseAction = true;
  drawPixel(event, canvas);
}

function drawPixel(event: MouseEvent, canvas: HTMLCanvasElement): void {
  if (!mouseAction) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const row = Math.floor(mouseY / cellSize);
  const column = Math.floor(mouseX / cellSize);

  if (row >= 0 && row < rows && column >= 0 && column < columns) {
    grid[row][column] = 1;
  }
}

function stopDrawing(): void {
  mouseAction = false;
}


function sandboxDraw(context: CanvasRenderingContext2D): void {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
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

function sandboxUpdate(): void {
  let nextGrid: number[][] = create2DArray(rows, columns);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let actualState = grid[row][column];
      if (row < rows-1) {
        if (actualState === 1) {
          let belowCell: number = grid[row+1][column];
          if (belowCell === 0) {
            nextGrid[row+1][column] = 1;
          } 
        } 
      }
    }
  }
  grid = nextGrid;
}

function sandboxAnimate(context: CanvasRenderingContext2D): void {
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









