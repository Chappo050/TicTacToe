const gameBoard = (() => {
    //Functions here
    let xoPos = [
        {'0': null}, {'1': null}, {'2': null},
        {'3': null}, {'4': null}, {'5': null},
        {'6': null}, {'7': null}, {'8': null}
];
    let currentPlayer = 0;
    let gameOver = false;
    const playerLable = document.getElementById('playerTurn')

    //Changes the style of the text depending on if it is an X or O
    function _styleOutput(event){
        if (currentPlayer === 0) {
            event.target.style.color = 'red';
        }
        else{
            event.target.style.color = 'blue'
        }
    }

    function _checkCell(event) {
        if (event.target.innerText == "") {
            return true;
        }
        else {
            return false;
        }
    }

    function _checkWinX() {

        //Check Rows
        if (xoPos['0'] + xoPos[1] + xoPos[2] == 'xxx') {
            return true;
        }
        else if (xoPos[3] + xoPos[4] + xoPos[5] == 'xxx') {
            return true;
        }

        else if (xoPos[6] + xoPos[7] + xoPos[8] == 'xxx') {
            return true;
        }

        //Check Columns
        if (xoPos[0] + xoPos[3] + xoPos[6] == 'xxx' ) {
            return true;
        }

        else if (xoPos[1] + xoPos[4] + xoPos[7] == 'xxx' ) {
            return true;
        }

        else if (xoPos[2] + xoPos[5] + xoPos[8] == 'xxx' ) {
            return true;
        }

        //Check Diagonals
        if (xoPos[0] + xoPos[4] + xoPos[8] == 'xxx' ) {
            return true;
        }
        else if (xoPos[2] + xoPos[4] + xoPos[6] == 'xxx' ) {
            return true;
        }

    }
    
    function _checkWinO() {

        //Check Rows
        if (xoPos['0'] + xoPos[1] + xoPos[2] == 'ooo') {
            return true;
        }
        else if (xoPos[3] + xoPos[4] + xoPos[5] == 'ooo') {
            return true;
        }

        else if (xoPos[6] + xoPos[7] + xoPos[8] == 'ooo') {
            return true;
        }

        //Check Columns
        if (xoPos[0] + xoPos[3] + xoPos[6] == 'ooo' ) {
            return true;
        }

        else if (xoPos[1] + xoPos[4] + xoPos[7] == 'ooo' ) {
            return true;
        }

        else if (xoPos[2] + xoPos[5] + xoPos[8] == 'ooo' ) {
            return true;
        }

        //Check Diagonals
        if (xoPos[0] + xoPos[4] + xoPos[8] == 'ooo' ) {
            return true;
        }
        else if (xoPos[2] + xoPos[4] + xoPos[6] == 'ooo' ) {
            return true;
        }

    }

    function _checkWin() {
        if (_checkWinO() || _checkWinX()) {
            displayController.winScreen(currentPlayer);
            gameOver = true;
        }
        
        
    }

    function _placeText(event){
        const divIndex = event.target.id;

        if (currentPlayer === 0) {
            _styleOutput(event);
            xoPos[divIndex] = 'x'; 
            _checkWin();
            currentPlayer = 1;
            playerLable.innerText = `Current Player: ${players[currentPlayer].getName()}`;
            return "X"
        }

        else{
            _styleOutput(event);
            xoPos[divIndex] = 'o';
            _checkWin();
            currentPlayer = 0;
            playerLable.innerText = `Current Player: ${players[currentPlayer].getName()}`;;
            return "O"
        }
    }

    function playerClickLogic(event){
        if (_checkCell(event) && !gameOver) {
            event.target.innerText = _placeText(event);
        }
        else{
            alert("SORRY CANT DO THAT!");
        }
    }

    function initializeGame(){
        const winScreen = document.getElementById("winnerText")
        winScreen.innerText = "";
        gameOver = false;
        currentPlayer = 0;
        xoPos = [
            {'0': null}, {'1': null}, {'2': null},
            {'3': null}, {'4': null}, {'5': null},
            {'6': null}, {'7': null}, {'8': null}
        ]
        console.log(xoPos);
        displayController.createGame();
        displayController.assignNames(); 
        playerLable.innerText = `Current Player: ${players[currentPlayer].getName()}`;

    }

    return {
        //Public function names here;
        playerClickLogic,
        initializeGame
    }
})();



const displayController = (() => {
    //Functions here

    //All processes related to updating the gameboard
    function createGame(){
        let posCounter = 0;

        //Remove old board
        document.querySelectorAll('.gameCells').forEach(e => e.remove());

        const container = document.getElementById("gameBoardContainer");
   
        for (let i = 0; i < 9; i++) {
            const newDiv = document.createElement('div');
            newDiv.className = 'gameCells'
            newDiv.id = `${i}`;
            newDiv.innerHTML = "";
            newDiv.addEventListener('click', gameBoard.playerClickLogic)
            document.getElementById('gameBoardContainer').appendChild(newDiv);
            posCounter++;
        }
        
    }
    
    function winScreen(currentPlayer) {
        const name = players[currentPlayer].getName();
        const winScreen = document.getElementById("winnerText")
        winScreen.innerText = `${name}YOU WIN!!!`;
    }

    function assignNames() {
        players = [];
        const playerOneName = document.getElementById('player1Name').value;
        const playerTwoName = document.getElementById('player2Name').value;
        if (playerOneName) {
            playerOne = Player(playerOneName, 0);
        }
        else{
            playerOne = Player("Player 1", 0);
        }

        if (playerTwoName) {
            playerTwo = Player(playerTwoName, 1);
        }
        else{
            playerTwo = Player("Player 2", 1);
        }
        console.log(playerOne.getName())
        console.log(playerTwo.getName())
        players.push(playerOne);
        players.push(playerTwo);
        
    }

return {
        //Public functions here;
        winScreen,
        assignNames,
        createGame
}
})();

let players = []
const Player = (playerName, playerNum) => {
    const getName = () => playerName;
    const getNum = () => playerNum
    return {getName, getNum}
}
document.getElementById("newGame").addEventListener('click', gameBoard.initializeGame);
