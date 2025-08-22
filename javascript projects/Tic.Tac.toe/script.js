const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, setMark, resetBoard };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const GameController = (function () {
    let player1, player2;
    let currentPlayer;
    let gameOver = false;

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.updateTurn(currentPlayer.name);
        DisplayController.bindEvents();
    };

    const playTurn = (index) => {
        if (gameOver || !Gameboard.setMark(index, currentPlayer.mark)) return;

        DisplayController.renderBoard();

        if (checkWin(currentPlayer.mark)) {
            gameOver = true;
            DisplayController.showWinner(currentPlayer.name);
            return;
        }

        if (checkTie()) {
            gameOver = true;
            DisplayController.showTie();
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        DisplayController.updateTurn(currentPlayer.name);
    };

    const checkWin = (mark) => {
        const b = Gameboard.getBoard();
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winCombos.some(combo => combo.every(i => b[i] === mark));
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    return { startGame, playTurn };
})();

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".message");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const updateTurn = (playerName) => {
        message.textContent = `It's ${playerName}'s turn.`;
    };

    const showWinner = (winnerName) => {
        message.textContent = `${winnerName} wins!`;
    };

    const showTie = () => {
        message.textContent = `It's a tie!`;
    };

    const bindEvents = () => {
        cells.forEach(cell => {
            cell.onclick = () => {
                const index = Number(cell.getAttribute("data-index"));
                GameController.playTurn(index);
            };
        });
    };

    return {
        renderBoard,
        updateTurn,
        showWinner,
        showTie,
        bindEvents,
    };
})();

function startGame() {
    const name1 = document.getElementById("player1").value || "Player 1";
    const name2 = document.getElementById("player2").value || "Player 2";
    GameController.startGame(name1, name2);
}
