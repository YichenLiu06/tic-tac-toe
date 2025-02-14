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

  const reset = () => {
    for(let x=0; x<3; x++){
      for(let y=0; y<3; y++){
        board[x][y] = '';
      }
    }
  }

  return {setCell, getCell, checkWin, checkTie, display, reset};

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
  let winner;
  let tie = false;
  const result = document.querySelector(".result")

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      fillCell(cell.dataset.x, cell.dataset.y); 
    });
  })

  const fillCell = (x,y) => {
    if(!winner && !tie && currentPlayer.fillCell(x,y)){

      let cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      cell.style.backgroundImage = currentPlayer == playerOne ? 'url("X.png")' : 'url("O.png")'
      Gameboard.display();

      if(Gameboard.checkWin(currentPlayer.getValue())){
        winner = currentPlayer;
        result.textContent = `${winner.getName()} Wins!`
      }

      if(Gameboard.checkTie()){
        tie = true;
        result.textContent = `It's a tie!`
      }
        

      currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
      return true;
    }
    else {
      return false;
    }
  }

  const reset = () => {
    currentPlayer = playerOne;
    winner = null;
    tie = false;
    Gameboard.reset();
    cells.forEach((cell) => {
      cell.style.backgroundImage = '';
    })
    result.textContent="";
  }

  return {fillCell, reset}

})()

const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", () => {
  Game.reset();
})