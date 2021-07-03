//Initial Configuration

const boardWidth = 8;
const boardHeight = 8;
const pieceWidth = 50;
const pieceHeight = 50;
const pixelWidth = 1 + boardWidth * pieceWidth;
const pixelHeight = 1 + boardHeight * pieceHeight;
const initialRows = 3;
const redPieceColor = '#ff0000';
const whitePieceColor = '#ffffff';

let whiteTurn;
let redTurn;

let indexToDelete = -1; // Para borrar una pieza.
let legalMoves; // Para los movimientos legales.

let canvasElement;
let drawingContext;

let pieces = [];

let numPieces = 24; // Controla las pieces metidas en memoria.
let numMoves = 0; // Cuenta los movimientos sin que se produzca un salto.

let selectedPieceIndex;
let selectedPieceHasMoved;
let moveCount;
let moveCountElem;
let gameInProgress;

function drawBoard() {
  drawingContext.clearRect(0, 0, pixelWidth, pixelHeight);

  drawingContext.beginPath();

  /* vertical lines */
  for (let x = 0; x <= pixelWidth; x += pieceWidth) {
    drawingContext.moveTo(0.5 + x, 0);
    drawingContext.lineTo(0.5 + x, pixelHeight);
  }

  /* horizontal lines */
  for (let y = 0; y <= pixelHeight; y += pieceHeight) {
    drawingContext.moveTo(0, 0.5 + y);
    drawingContext.lineTo(pixelWidth, 0.5 + y);
  }

  /* draw it! */
  drawingContext.strokeStyle = '#ccc';
  drawingContext.stroke();

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i] instanceof Queen) {
      drawQueen(pieces[i], pieces[i].color, i == selectedPieceIndex);
    } else {
      drawPiece(pieces[i], pieces[i].color, i == selectedPieceIndex);
    }
  }

  moveCountElem.innerHTML = moveCount;

  //   if (gameInProgress && isTheGameOver()) {
  //     endGame();
  //   }
}

function drawPiece(p, color, selected) {
  let column = p.column;
  let row = p.row;
  let x = column * pieceWidth + pieceWidth / 2;
  let y = row * pieceHeight + pieceHeight / 2;
  let radius = pieceWidth / 2 - pieceWidth / 10;

  drawingContext.beginPath();
  drawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
  drawingContext.closePath();
  drawingContext.fillStyle = color;
  drawingContext.fill();
  drawingContext.strokeStyle = '#000';
  drawingContext.stroke();

  if (selected) {
    drawingContext.fillStyle = '#ff0000';
    drawingContext.fill();
  }
}

function drawQueen(p, color, selected) {
  let column = p.column;
  let row = p.row;
  let x = column * pieceWidth + pieceWidth / 2;
  let y = row * pieceHeight + pieceHeight / 2;
  let radius = pieceWidth / 2 - pieceWidth / 10;

  drawingContext.beginPath();
  drawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
  drawingContext.closePath();
  drawingContext.fillStyle = color;
  drawingContext.fill();
  drawingContext.strokeStyle = '#000';
  drawingContext.stroke();

  if (selected) {
    drawingContext.fillStyle = '#ff0000';
    drawingContext.fill();
  }
  // Para la corona circular.
  drawingContext.beginPath();
  drawingContext.arc(x, y, radius + 2.5, 0, Math.PI * 2, false);
  drawingContext.closePath();
  drawingContext.strokeStyle = '#000';
  drawingContext.stroke();
}

function getCursorPosition(e) {
  let x;
  let y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvasElement.offsetLeft;
  y -= canvasElement.offsetTop;
  x = Math.min(x, boardWidth * pieceWidth);
  y = Math.min(y, boardHeight * pieceHeight);
  let cell = new Box(Math.floor(y / pieceHeight), Math.floor(x / pieceWidth));
  return cell;
}
function clickManager(e) {
  let row = getCursorPosition(e);
  for (let i = 0; i < numPieces; i++) {
    if (pieces[i].row === row.row && pieces[i].column === row.column) {
      clickOnPiece(i);
      return;
    }
  }
  clickOnEmptyCell(row);
}
function showMovement(box1, box2, jump) {
  console.log(box1, box2, jump);
  let movement = document.createElement('p');
  if (whiteTurn) {
    document.getElementById('whiteMove').appendChild(movement);
    document.getElementById('isTurn').innerHTML = 'Red Turn';
  } else {
    document.getElementById('redMove').appendChild(movement);
    document.getElementById('isTurn').innerHTML = 'White Turn';
  }
}
function newGame() {
  // Reiniciamos variables.
  numMoves = 0;
  numPieces = 24;
  whiteTurn = true;
  redTurn = false;

  pieces = []; // Vaciamos la lista de pieces, por si estamos pulsando el resetButton.

  for (let i = 0; i < initialRows; i++) {
    for (let j = (i + 1) % 2; j < boardHeight; j = j + 2) {
      pieces.push(new Box(i, j, redPieceColor));
    }
  }

  for (let i = boardHeight - 1; i >= boardHeight - initialRows; i--) {
    for (let j = (i + 1) % 2; j < boardHeight; j = j + 2) {
      pieces.push(new Box(i, j, whitePieceColor));
    }
  }

  numPieces = pieces.length;
  selectedPieceIndex = -1;
  selectedPieceHasMoved = false;
  moveCount = 0;
  gameInProgress = false;

  whiteTurn = true;
  redTurn = false;

  drawBoard();
  gameInProgress = true;
}

function playGame(canvaElement, moveCountElement) {
  canvasElement = canvaElement;
  canvasElement.width = pixelWidth;
  canvasElement.height = pixelHeight;
  canvasElement.addEventListener('click', clickManager, false);
  moveCountElem = moveCountElement;
  drawingContext = canvasElement.getContext('2d');

  newGame();
}

function Box(row, column, color) {
  this.row = row;
  this.column = column;
  this.color = color;
}

function Queen(row, column, color) {
  Box.apply(this, [row, column, color]);
}
