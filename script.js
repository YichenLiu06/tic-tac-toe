const Gameboard = (function createGameboard(){
  const board = [['','',''],['','',''],['','','']];

  //Only accepts 'X' and 'O' as values
  const setCell = (x, y, value) => {
    if((value == 'X' || value == 'O') && board[x][y] == ''){
      board[x][y] = value;
      return true;
    }
    else {
      console.log("Invalid cell value.")
      return false;
    }
  }

  const getCell = (x, y) => {
    return board[x][y];
  }

  const checkWin = (value) => {
    //Check each column
    for(let x=0; x<3; x++){
      let win = true;
      for(let y=0; y<3; y++){
        if(board[x][y] != value)
          win = false;
      }
      if(win)
        return true;
    }

    //Check each row
    for(let y=0; y<3; y++){
      let win = true;
      for(let x=0; x<3; x++){
        if(board[x][y] != value)
          win = false;
      }
      if(win)
        return true;
    }

    //Check diagonals 
    if(board[0][0] == value && board[1][1] == value && board[2][2] == value)
      return true;
    if(board[2][0] == value && board[1][1] == value && board[0][2] == value)
      return true;

    return false;
  }

  const checkTie = () => {
    let full = true;
    for(let x=0; x<3; x++){
      for(let y=0; y<3; y++){
        if(board[x][y] == '')
          full = false;
      }
    }
    return (!checkWin('X') && !checkWin('O') && full);
  }

  const display = () => {
    board.forEach(a=>console.log(...a));
  }

  const render = () => {
    console.log("hello");
    const boardContainer = document.createElement("div");
    boardContainer.style.display = "grid";
    boardContainer.style.gridTemplate = "1fr 1fr 1fr / 1fr 1fr 1fr"
    boardContainer.style.height = "500px";
    boardContainer.style.width = "500px";
    boardContainer.style.gap = "5px";
    boardContainer.style.backgroundColor = "black"
    for(let x=0; x<3; x++){
      for(let y=0; y<3; y++){
        const cell = document.createElement("div");
        if(board[x][y] != ''){
          cell.style.backgroundImage = board[x][y] == 'O' ? 'url("O.png")' : 'url("X.png")';
          cell.style.backgroundSize = "cover";
        }
        cell.style.backgroundColor = "white";
        cell.dataset.x = x;
        cell.dataset.y = y;
        boardContainer.appendChild(cell);
      }
    }
    document.querySelector("body").appendChild(boardContainer);
  }

  return {setCell, getCell, checkWin, checkTie, display, render};

})();

function createPlayer (value, name){

  const fillCell = (x,y) => {
    return Gameboard.setCell(x,y, value);
  }

  const getValue = () => value;

  const getName = () => name;

  return {fillCell, getName, getValue};

}

const Game = (function createGame(){

  const playerOne = createPlayer('X', 'Player One');
  const playerTwo = createPlayer('O', 'Player Two');
  let currentPlayer = playerOne;

  const fillCell = (x,y) => {
    if(currentPlayer.fillCell(x,y)){
      Gameboard.display();
      if(Gameboard.checkWin(currentPlayer.getValue()))
        console.log(`${currentPlayer.getName()} wins!`);
      if(Gameboard.checkTie())
        console.log("It's a tie!");
      currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
    }
  }

  return {fillCell}

})()

Gameboard.display();

Game.fillCell(0,2);
Game.fillCell(0,1);
Game.fillCell(0,2);
Game.fillCell(0,0);
Gameboard.render();