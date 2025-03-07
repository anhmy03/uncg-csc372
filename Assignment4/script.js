let wins = localStorage.getItem('wins') || 0;
let losses = localStorage.getItem('losses') || 0;
let ties = localStorage.getItem('ties') || 0;
document.getElementById('wins').textContent = wins;
document.getElementById('losses').textContent = losses;
document.getElementById('ties').textContent = ties;

function playerChoice(playerMove) {
    document.querySelectorAll('.choices img').forEach(img => img.classList.remove('selected'));
    event.target.classList.add('selected');

    let choices = ['rock', 'paper', 'scissors'];
    let computerImg = document.getElementById('computer-choice');
    let index = 0;
    let shuffleInterval = setInterval(() => {
        computerImg.src = choices[index] + '.png';
        index = (index + 1) % 3;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        let computerMove = choices[Math.floor(Math.random() * 3)];
        computerImg.src = computerMove + '.png';
        determineWinner(playerMove, computerMove);
    }, 3000);
}

function determineWinner(player, computer) {
    let resultText = document.querySelector('.result');
    if (player === computer) {
        resultText.textContent = "It's a tie!";
        ties++;
    } else if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        resultText.textContent = "You win!";
        wins++;
    } else {
        resultText.textContent = "You lose!";
        losses++;
    }
    updateScore();
}

function updateScore() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    localStorage.setItem('ties', ties);
}

function resetGame() {
    wins = 0;
    losses = 0;
    ties = 0;
    localStorage.clear();
    updateScore();
    document.querySelector('.result').textContent = "Make your move!";
    document.getElementById('computer-choice').src = 'question-mark.png';
    document.querySelectorAll('.choices img').forEach(img => img.classList.remove('selected'));
}