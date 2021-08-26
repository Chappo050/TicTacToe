const gameBoard = (() => {
    //Functions here
    let xoPos = [];
    let currentPlayer = 0;


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


    function _checkWin() {
        console.log("hi");
    }
    
    function _placeText(event){
        if (currentPlayer === 0) {
            _styleOutput(event);
            xoPos.push("X");
            currentPlayer = 1;
            return "X"
        }
        else{
            _styleOutput(event);
            xoPos.push("O");
            currentPlayer = 0;
            return "O"
        }
    }

    function playerClickLogic(event){
        if (_checkCell(event)) {
            event.target.innerText = _placeText(event);
        }
        else{
            alert("INVALID POSITION!");
        }
    }

    function initializeGame(){
        displayController.createGameDivs();
    }

    return {
        //Public function names here;
        playerClickLogic,
        initializeGame
    }
})();



const displayController = (() => {
    //Functions here
    const displayScore = () => console.log(Player.getScore);



    //All processes related to updating the gameboard
    function createGameDivs(){
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

return {
        //Public functions here;
        createGameDivs
}
})();


const Player = (playerName, playerNum, score, text) => {
    const getName = () => playerName;
    const getNum = () => playerNum
    const getScore = () => score;
    const getText = () => text;

    return {getName, getScore}
}

const player1 = Player('Matthew', 0, 0, "X");
const player2 = Player('Cameron', 1, 0, "O");

gameBoard.initializeGame();

