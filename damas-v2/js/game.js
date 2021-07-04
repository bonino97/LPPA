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

let indexToDelete = -1;
let legalMoves;

let canvasElement;
let drawingContext;

let pieces = [];

let numPieces = 24;
let numMoves = 0;

let isTie = false;
let tieAgreed = false;

let selectedPieceIndex;
let selectedPieceHasMoved;
let moveCount;
let moveCountElem;
let gameInProgress;

function drawBoard() {
  drawingContext.clearRect(0, 0, pixelWidth, pixelHeight);
  drawingContext.beginPath();

  for (let x = 0; x <= pixelWidth; x += pieceWidth) {
    drawingContext.moveTo(0.5 + x, 0);
    drawingContext.lineTo(0.5 + x, pixelHeight);
  }

  for (let y = 0; y <= pixelHeight; y += pieceHeight) {
    drawingContext.moveTo(0, 0.5 + y);
    drawingContext.lineTo(pixelWidth, 0.5 + y);
  }

  drawingContext.strokeStyle = '#ccc';
  drawingContext.stroke();

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i] instanceof Queen) {
      drawQueen(pieces[i], pieces[i].color, i === selectedPieceIndex);
    } else {
      drawPiece(pieces[i], pieces[i].color, i === selectedPieceIndex);
    }
  }

  moveCountElem.innerHTML = moveCount;

  if (gameInProgress && isTheGameOver()) {
    endGame();
  }
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
    drawingContext.fillStyle = '#e8bb54';
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
    drawingContext.fillStyle = '#e8bb54';
    drawingContext.fill();
  }
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

function getLegalMoves() {
  let theLegalMoves = [];
  let z = 0;

  while (z < pieces.length) {
    if (
      (whiteTurn && whitePieceColor === pieces[z].color) ||
      (redTurn && redPieceColor === pieces[z].color)
    ) {
      let newMovements = getLegalMovesPerPiece(pieces[z]);

      let t = 0;
      while (t < newMovements.length) {
        if (newMovements[t] instanceof Jump) {
          let oneJump = newMovements.splice(t, 1);
          theLegalMoves = oneJump.concat(theLegalMoves);
        } else {
          t++;
        }
      }

      theLegalMoves = theLegalMoves.concat(newMovements);
    }
    z++;
  }
  return theLegalMoves;
}

function getLegalMovesPerPiece(onePiece) {
  let i = -1;
  let row = 0;
  let column = 0;
  let someLegalMoves = [];
  let empty = false;

  while (i < 2) {
    if ((onePiece.row != 0 && whiteTurn) || (onePiece.row != 7 && redTurn)) {
      if (
        (onePiece.column != 0 && i === -1) ||
        (onePiece.column != 7 && i === 1)
      ) {
        if (whiteTurn) {
          row = onePiece.row - 1;
          column = onePiece.column + i;
        } else {
          row = onePiece.row + 1;
          column = onePiece.column + i;
        }
        let j = 0;
        let existe = false;
        while (j < pieces.length && existe === false) {
          if (pieces[j].row === row && pieces[j].column === column) {
            existe = true;
            if (pieces[j].color != onePiece.color) {
              if (
                i < 0 &&
                whiteTurn &&
                onePiece.column >= 2 &&
                onePiece.row >= 2
              ) {
                row = onePiece.row - 2;
                column = onePiece.column - 2;
                empty = emptyBox(row, column);
              } else if (
                i > 0 &&
                whiteTurn &&
                onePiece.column <= 5 &&
                onePiece.row >= 2
              ) {
                row = onePiece.row - 2;
                column = onePiece.column + 2;
                empty = emptyBox(row, column);
              } else if (
                i < 0 &&
                redTurn &&
                onePiece.column >= 2 &&
                onePiece.row <= 5
              ) {
                row = onePiece.row + 2;
                column = onePiece.column - 2;
                empty = emptyBox(row, column);
              } else if (
                i > 0 &&
                redTurn &&
                onePiece.column <= 5 &&
                onePiece.row <= 5
              ) {
                row = onePiece.row + 2;
                column = onePiece.column + 2;
                empty = emptyBox(row, column);
              }
            }
          } else {
            j++;
          }
        }
        if (existe === false) {
          let aMove = new Move(onePiece.row, onePiece.column, row, column);
          someLegalMoves.push(aMove);
        } else if (existe === true && empty === true) {
          let aJump = new Jump(onePiece.row, onePiece.column, row, column);
          someLegalMoves.unshift(aJump);
        }
      }
    }
    i = i + 2;
  }
  return someLegalMoves;
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

function clickOnPiece(pieceIndex) {
  if (
    (whiteTurn && pieces[pieceIndex].color === whitePieceColor) ||
    (redTurn && pieces[pieceIndex].color === redPieceColor)
  ) {
    if (selectedPieceIndex === pieceIndex) {
      return;
    }
    selectedPieceIndex = pieceIndex;
    selectedPieceHasMoved = false;
    drawBoard();
  } else {
    document.getElementById('isNotYourTurn').innerHTML = 'Is not your turn!';
  }
}

function clickOnEmptyCell(cell) {
  clearInformationTexts();

  if (selectedPieceIndex === -1) {
    return;
  }

  let direction = 1;
  if (pieces[selectedPieceIndex].color === whitePieceColor) direction = -1;

  let rowDiff = direction * (cell.row - pieces[selectedPieceIndex].row);
  let columnDiff =
    direction * (cell.column - pieces[selectedPieceIndex].column);
  if (
    rowDiff === 1 &&
    Math.abs(columnDiff) === 1 &&
    !(legalMoves[0] instanceof Jump)
  ) {
    showMovement(pieces[selectedPieceIndex], cell, false);

    pieces[selectedPieceIndex].row = cell.row;
    pieces[selectedPieceIndex].column = cell.column;

    checkWinner();

    changeTurn();
    moveCount += 1;
    selectedPieceIndex = -1;
    selectedPieceHasMoved = false;
    drawBoard();
    numMoves += 1;
    checkTie();
    return;
  } else if (
    rowDiff === 1 &&
    Math.abs(columnDiff) === 1 &&
    legalMoves[0] instanceof Jump
  ) {
    document.getElementById('eatPiece').innerHTML = 'You can eat!';
  } else if (
    Math.abs(rowDiff) === 2 &&
    Math.abs(columnDiff) === 2 &&
    isThereAPieceBetween(pieces[selectedPieceIndex], cell) &&
    legalMoves[0] instanceof Jump
  ) {
    if (!selectedPieceHasMoved) {
      moveCount += 1;
    }

    showMovement(pieces[selectedPieceIndex], cell, true);

    pieces[selectedPieceIndex].row = cell.row;
    pieces[selectedPieceIndex].column = cell.column;

    if (indexToDelete > selectedPieceIndex) {
      removePiece();
      checkWinner();
    } else {
      checkWinner();
      removePiece();
    }

    selectedPieceIndex = -1;
    selectedPieceHasMoved = false;

    numMoves = 0;
    changeTurn();
    drawBoard();
    return;
  }
  selectedPieceIndex = -1;
  selectedPieceHasMoved = false;
  drawBoard();
}

function clearInformationTexts() {
  document.getElementById('eatPiece').innerHTML = '';
  document.getElementById('cannotEatPieceSameColor').innerHTML = '';
  document.getElementById('isNotYourTurn').innerHTML = '';
  document.getElementById('endGameText').innerHTML = '';
}

function clearEndGameTexts() {
  document.getElementById('isNotYourTurn').innerHTML = '';
  document.getElementById('eatPiece').innerHTML = '';
  document.getElementById('cannotEatPieceSameColor').innerHTML = '';
  document.getElementById('isTurn').innerHTML = '';
}

function showMovement(box1, box2, jump) {
  sendDataToAPI({ box1, box2, jump });
  let movement = document.createElement('p');
  if (whiteTurn) {
    document.getElementById('whiteMove').appendChild(movement);
    document.getElementById('isTurn').innerHTML = 'Red Turn';
  } else {
    document.getElementById('redMove').appendChild(movement);
    document.getElementById('isTurn').innerHTML = 'White Turn';
  }
}

function sendDataToAPI(data) {
  console.log(data);
  // Make a POST request
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.warn('Something went wrong.', error);
    });
}

function checkWinner() {
  if (
    (whiteTurn &&
      pieces[selectedPieceIndex].color === whitePieceColor &&
      pieces[selectedPieceIndex].row === 0) ||
    (redTurn &&
      pieces[selectedPieceIndex].color === redPieceColor &&
      pieces[selectedPieceIndex].row === 7)
  ) {
    let winnerPiece = pieces.splice(selectedPieceIndex, 1);
    winner(winnerPiece[0]);
  }
}

function changeTurn() {
  if (whiteTurn) {
    whiteTurn = false;
    redTurn = true;
  } else {
    whiteTurn = true;
    redTurn = false;
  }
}

function isThereAPieceBetween(box1, box2) {
  let existe = false;
  let i = 0;
  let row = 0;
  let column = 0;

  if (
    whiteTurn &&
    box2.column - box1.column === -2 &&
    box2.row - box1.row === -2
  ) {
    column = box1.column - 1;
    row = box1.row - 1;
  } else if (
    whiteTurn &&
    box2.column - box1.column === 2 &&
    box2.row - box1.row === -2
  ) {
    column = box1.column + 1;
    row = box1.row - 1;
  } else if (
    redTurn &&
    box2.column - box1.column === -2 &&
    box2.row - box1.row === 2
  ) {
    column = box1.column - 1;
    row = box1.row + 1;
  } else if (
    redTurn &&
    box2.column - box1.column === 2 &&
    box2.row - box1.row === 2
  ) {
    column = box1.column + 1;
    row = box1.row + 1;
  }
  while (i < pieces.length && existe === false) {
    if (pieces[i].row === row && pieces[i].column === column) {
      if (box1.color !== pieces[i].color) {
        existe = true;
        indexToDelete = i;
      } else {
        document.getElementById(
          'cannotEatPieceSameColor'
        ).innerHTML = `Can't eat piece of same color.`;
      }
    }
    i++;
  }
  return existe;
}

function removePiece() {
  pieces.splice(indexToDelete, 1);
  indexToDelete = -1;
  numPieces--;
}

function checkTie() {
  if (numMoves >= 50 || tieAgreed) {
    isTie = true;
    endGame();
  }
}

function isTheGameOver() {
  legalMoves = getLegalMoves();
  if (legalMoves.length === 0) {
    return true;
  } else {
    return false;
  }
}

function emptyBox(row, column) {
  let y = 0;
  let empty = true;
  while (y < pieces.length && empty === true) {
    if (pieces[y].row === row && pieces[y].column === column) {
      empty = false;
    } else {
      y++;
    }
  }
  return empty;
}

function winner(piece) {
  pieces.push(new Queen(piece.row, piece.column, piece.color));
}

function newGame() {
  numMoves = 0;
  numPieces = 24;
  whiteTurn = true;
  redTurn = false;

  pieces = [];

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

function endGame() {
  clearEndGameTexts();
  gameInProgress = false;
  if (isTie) {
    document.getElementById('endGameText').innerHTML = 'Tie!';
  } else if (whiteTurn) {
    document.getElementById('endGameText').innerHTML = 'Game Over. Red Wins!';
  } else {
    document.getElementById('endGameText').innerHTML = 'Game Over. White Wins!';
  }
  newGame();
}

function playGame(canvaElement, moveCountElement) {
  canvasElement = canvaElement;
  canvasElement.width = pixelWidth;
  canvasElement.height = pixelHeight;
  canvasElement.addEventListener('click', clickManager, false);
  moveCountElem = moveCountElement;
  drawingContext = canvasElement.getContext('2d');

  saveButton = document.getElementById('resetButton');
  saveButton.onclick = newGame;

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

Queen.prototype = new Queen();
Queen.prototype.constructor = Queen;

function Move(r1, c1, r2, c2) {
  this.fromRow = r1;
  this.fromCol = c1;
  this.toRow = r2;
  this.toCol = c2;
}

function Jump(r1, c1, r2, c2) {
  Move.apply(this, [r1, c1, r2, c2]);
}

Jump.prototype = new Move();
Jump.prototype.constructor = Move;
