




let board = Array(9).fill("");
let currentplayer = "X";
let gameactive = true;
let scores = {
    X: 0,
    O: 0,
    tie: 0,
};

const winpattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns (fixed column 3 index)
    [0, 4, 8], [2, 4, 6]            // diagonals
];

const cols = document.querySelectorAll('.col');
const currentplayerDisplay = document.getElementById("currentplayer");
const gamestatus = document.getElementById("gamestatus");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoretie = document.getElementById("scoreTie"); // Capital T matched with HTML

function handlecolclick(index) {
    // Prevent clicking taken slots or clicking after game over
    if (board[index] !== "" || !gameactive) return;

    board[index] = currentplayer;
    updatecol(index);

    if (checkwin()) {
        scores[currentplayer]++;
        endgame(`Player ${currentplayer} Wins! <3`);
        highlightwinningcols();
    } else if (checkTie()) {
        scores.tie++;
        endgame(`It's a Tie!`);
    } else {
        currentplayer = currentplayer === "X" ? "O" : "X";
        updateDisplay();
    }
    updateScoreDisplay();
}

function updatecol(index) {
    const col = cols[index];
    col.textContent = currentplayer;
    col.classList.add("taken", currentplayer.toLowerCase());
}

function checkwin() {
    return winpattern.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function checkTie() {
    return board.every(col => col !== "");
}

function highlightwinningcols() {
    const winningCombo = winpattern.find((pattern) => {
        const [a, b, c] = pattern;
        return board[a]!=="" && board[a] === board[b] && board[a] === board[c];
    });

    if (winningCombo) {
        winningCombo.forEach(index => {
            cols[index].classList.add("winner");
        });
    }
}

function endgame(message) {
    gameactive = false;
    const messageclass = message.includes("Tie") ? "tie-message" : "winner-message";
    gamestatus.innerHTML = `<div class="${messageclass}">${message}</div>`;
    currentplayerDisplay.textContent = "Game Over";
}

function resetgame() {
    board = Array(9).fill("");
    currentplayer = "X"; 
    gameactive = true;   
    cols.forEach(col => {
        col.textContent = "";
        col.classList.remove("taken", "x", "o", "winner");
    });
    gamestatus.textContent = "";
    updateDisplay();
}

function resetScore() {
    scores = { X: 0, O: 0, tie: 0 }; // Reassign global object
    updateScoreDisplay();
}

function updateDisplay() {
    currentplayerDisplay.textContent = `Player ${currentplayer}'s Turn`;
}

function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoretie.textContent = scores.tie;
}

function intializatieGame() {
    cols.forEach((col, index) => {
        col.addEventListener('click', () => handlecolclick(index));
    });
    resetBtn.addEventListener('click', resetgame);
    resetScoreBtn.addEventListener('click', resetScore);
}

document.addEventListener('DOMContentLoaded', intializatieGame);
