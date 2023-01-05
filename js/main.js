/* Constants */

const PLAYERS = {
    '1': {
        name: 'Player',
    },
    '-1': {
        name: 'Computer',
    }
}

/* state variables */

let turn, playerBoard, computerBoard, winner, length, evt

/* cached element references */

const h2El = document.querySelector('h2')
const h3El = document.querySelector('h3')
const compBoardEl = document.getElementById('computer')
const userBoardEl = document.getElementById('player')
const placeShipsBtn = document.createElement('button')
const contBtn = document.createElement('button')
const playAgainBtn = document.createElement('button');

/* event listeners */

compBoardEl.addEventListener('click', handleBoardClick)
placeShipsBtn.addEventListener('click', handleShipPlacement)
contBtn.addEventListener('click', handleContinue)
playAgainBtn.addEventListener('click', handlePlayAgain)

/* functions */

function init() {
    playerBoard = [
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
    ]
    computerBoard = [
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
    ]
    winner = null 
    renderPlaceShipsBtn()
    renderContBtn()
    renderIntro()
    playAgainBtn.remove()
}


function handleBoardClick(evt) {
  const arr = evt.target.id[4]
  const idx = evt.target.id[5]
  if (turn === 1) {
    if (computerBoard[arr][idx] === 'ship') {
        computerBoard[arr][idx] = 'hit'
        renderCompBoard()
        h3El.innerText = 'An enemy ship has been hit!'
        endGameIfWinner()
        changeTurn()
    } else if (computerBoard[arr][idx] === 'empty') {
        computerBoard[arr][idx] = 'miss'
        renderCompBoard()
        h3El.innerText = 'You have missed.'
        endGameIfWinner()
        changeTurn()
    } else {
        h3El.innerText = 'This position has already been fired upon.'
    } 
    realisticAi()
  } else {
    h3El.innerText = 'It is not your turn'
  }
}

function renderUserBoard() {
    for (let square of userBoardEl.children) {
        const arr = square.id[4] 
        const idx = square.id[5]
        if (playerBoard[arr][idx] === 'hit') {
          square.style.backgroundColor = 'red'
        } else if (playerBoard[arr][idx] === 'miss') {
          square.style.backgroundColor = 'white'
        }
  }
}

function renderCompBoard() {
  for (let square of compBoardEl.children) {
        const arr = square.id[4] 
        const idx = square.id[5]
        if (computerBoard[arr][idx] === 'hit') {
          square.style.backgroundColor = 'red'
        } else if (computerBoard[arr][idx] === 'miss') {
          square.style.backgroundColor = 'white'
        }
  }
}


function renderPlaceShipsBtn() {
    placeShipsBtn.innerText = 'Place your ships.'
    document.querySelector('body').append(placeShipsBtn)
}


function handleShipPlacement() {
    handleShipReset()
    renderClearBoard()
    placeUserShips(5)
    placeUserShips(4)
    placeUserShips(3)
    placeUserShips(3)
    placeUserShips(2)
    placeCompShips(5)
    placeCompShips(4)
    placeCompShips(3)
    placeCompShips(3)
    placeCompShips(2) 
    renderShipPlacement()
  }


function renderShipPlacement() {
    for (let square of userBoardEl.children) {
        const arr = square.id[4] 
        const idx = square.id[5]
        if (playerBoard[arr][idx] === 'ship') {
            square.style.backgroundColor = 'blue'
        }
    }
}


function renderClearBoard() {
    for (let square of userBoardEl.children) {
        square.style.backgroundColor = 'green'
    }
    for (let square of compBoardEl.children) {
        square.style.backgroundColor = 'green'
    }
}


function handleShipReset() {
    for(let i = 0; i < playerBoard.length; i++) {
        for(let j = 0; j < playerBoard[i].length; j++) {
            playerBoard[i][j] = 'empty'
        }
    }
    for(let i = 0; i < computerBoard.length; i++) {
        for(let j = 0; j < computerBoard[i].length; j++) {
            computerBoard[i][j] = 'empty'
        }
    }
}


function validatePlayerPlacement(playerBoard, startingPosX, startingPosY, length, shipOrientation) {
    if (shipOrientation === 'horizontal') {
        if (startingPosX + length > playerBoard[0].length) {
            return false
        }
        for (let i = startingPosX; i < startingPosX + length; i++) {
            if (playerBoard[startingPosY][i] !== 'empty') {
                return false
            }
        }
    } else {
        if (startingPosY + length > playerBoard.length) {
            return false
        }
        for (let i = startingPosY; i < startingPosY + length; i++) {
            if (playerBoard[i][startingPosX] !== 'empty') {
                return false
            }
        }
    }
    return true
}
  
  

function placeUserShips(length) {
    let shipPlaced = false
    while (!shipPlaced) {
        const shipOrientation = Math.random() < 0.5 ? 'horizontal' : 'vertical'
        const startingPosX = Math.floor(Math.random() * 10)
        const startingPosY = Math.floor(Math.random() * 10)
        if (validatePlayerPlacement(playerBoard, startingPosX, startingPosY, length, shipOrientation)) {
            shipPlaced = true;
            if (shipOrientation === 'horizontal') {
                for (let i = startingPosX; i < startingPosX + length; i++) {
                    playerBoard[startingPosY][i] = 'ship'
                }
            } else {
                for (let i = startingPosY; i < startingPosY + length; i++) {
                    playerBoard[i][startingPosX] = 'ship'
                }
            }
        }
    }
}  
  

function validateCompPlacement(computerBoard, startingPosX, startingPosY, length, shipOrientation) {
    if (shipOrientation === 'horizontal') {
        if (startingPosX + length > computerBoard[0].length) {
            return false
        }
        for (let i = startingPosX; i < startingPosX + length; i++) {
            if (computerBoard[startingPosY][i] !== 'empty') {
                return false
            }
        }
    } else {
        if (startingPosY + length > computerBoard.length) {
            return false
        }
        for (let i = startingPosY; i < startingPosY + length; i++) {
            if (computerBoard[i][startingPosX] !== 'empty') {
                return false
            }
        }
    }
    return true
}
  
  
function placeCompShips(length) {
    let shipPlaced = false
    while (!shipPlaced) {
        const shipOrientation = Math.random() < 0.5 ? 'horizontal' : 'vertical'
        const startingPosX = Math.floor(Math.random() * 10)
        const startingPosY = Math.floor(Math.random() * 10)
        if (validateCompPlacement(computerBoard, startingPosX, startingPosY, length, shipOrientation)) {
            shipPlaced = true
            if (shipOrientation === 'horizontal') {
                for (let i = startingPosX; i < startingPosX + length; i++) {
                    computerBoard[startingPosY][i] = 'ship'
                }
            } else {
                for (let i = startingPosY; i < startingPosY + length; i++) {
                    computerBoard[i][startingPosX] = 'ship'
                }
            }
        }
    }
}
  


/* Continue Button */

function renderContBtn() {
    contBtn.innerText = 'Continue?'
    document.querySelector('body').append(contBtn)
}


function handleContinue() {
    placeShipsBtn.remove()
    contBtn.remove()
    turn = 1
    h2El.innerText = 'Your Turn!'
    h3El.innerText = 'Select a Square to fire upon.'
}



/* Game-State Functions */ 

function renderIntro() {
    h2El.innerText = 'Place your ships! Hit the button.'
    h3El.innerText = 'Press Continue when ready.'
}


function changeTurn() {
    turn *= -1
    renderTurn()
}


function renderTurn() {
    if (turn === 1) {
        h2El.innerText = "It is the Player's turn."
    }
    if (turn === -1) {
        h2El.innerText = "It is the Computer's turn."
    }
}


function checkForWinner() {
    let playerShipsSunk = true
    playerBoard.forEach(row => {
        row.forEach(cell => {
            if (cell === 'ship') {
                playerShipsSunk = false
            }
        })
    })
    if (playerShipsSunk) {
        winner = 'computer'
        return
    }
    let computerShipsSunk = true
    computerBoard.forEach(row => {
        row.forEach(cell => {
            if (cell === 'ship') {
                computerShipsSunk = false
            }
        })
    })
    if (computerShipsSunk) {
        winner = 'player'
        return
    }
    winner = null
  }


function endGameIfWinner() {
    checkForWinner()
    if (winner === 'player') {
        h2El.innerText = 'The Player wins!'
        h3El.innerText = "All of The Computer's ships have been sunk!"
        turn = null
        renderPlayAgain()
    } else if (winner === 'computer') {
        h2El.innerText = 'The Computer wins!'
        h3El.innerText = "All of The Player's ships have been sunk!"
        turn = null
        renderPlayAgain()
    }
}



/* AI Functions */

function computerAi() {
    x = Math.floor(Math.random() * 10)
    y = Math.floor(Math.random() * 10)
    if (turn === -1) {
        if (playerBoard[y][x] === 'empty') {
            playerBoard[y][x] = 'miss'
            renderUserBoard()
            h3El.innerText = 'The enemy has missed.'
            endGameIfWinner()
            changeTurn()
        } else if (playerBoard[y][x] === 'ship') {
            playerBoard[y][x] = 'hit'
            renderUserBoard()
            h3El.innerText = 'Your ship has been hit!'
            endGameIfWinner()
            changeTurn()
        } else {
            computerAi()
        }
    }
}


function realisticAi() {
    setTimeout(function () {
        computerAi()
    }, Math.random() * 2000 + 2000)
}



/* Play Again Button */

function renderPlayAgain() {
    playAgainBtn.innerText = 'Play Again';
    document.querySelector('body').append(playAgainBtn)
}


function handlePlayAgain() {
    renderClearBoard()
    handleShipReset()
    init()
}



/* Start the Game */
init()
