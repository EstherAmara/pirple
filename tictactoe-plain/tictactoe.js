const boardGame = document.getElementById('board-game');
let divs = document.querySelectorAll('.row div');
let gameState = ["", "", "", "", "", "", "", "", ""];
const combinationToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let count = 1;
boardGame.addEventListener('click', checkResult);

function checkResult(e) {
    markOnBoard(e);
    checkIfWon(e);
}

function markOnBoard(e) {
    let clickedDiv = e.target;
    if(count % 2 === 0) {
        gameState[e.target.id] = 'O';
        clickedDiv.innerHTML = '<span class="text-black"> O </span>';
    } else {
        gameState[e.target.id] = 'X';
        clickedDiv.innerHTML = '<span class="text-red"> X </span>';
    }
    count++;
}

function checkIfWon() {
    for (let i = 0; i <= combinationToWin.length-1; i++) {
        const win = combinationToWin[i]; //0 1 2
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            alert(a + ' has won!');
            resetGame();
            return;
        }
        if(!gameState.includes("")) {
            alert("Cat's game!");
            resetGame();
            return;
        }
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    for(div of divs) {
        div.innerHTML = "";
    }
}