// DOM Elements
const playBtn = document.querySelector('.game-start');
const screens = document.querySelectorAll('.screen');
const playerOptionBtns = document.querySelectorAll('.choose-RPS');
const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const choicesEl = document.querySelector('.choices')

//Keeping track of both scores and choices...
let playerChoose;
let computerChoose;
let playerScore = 0;
let computerScore = 0;
let options = ['rock', 'paper', 'scissors'];

//Event Listeners
playBtn.addEventListener('click', () => {
    screens[0].classList.add('up');
})

//Event Capturing
screens[1].addEventListener('click', (e) => {
    if(e.target.classList.contains('choose-RPS')) {
        playerOption(e)
    }
})

//Functions
function computerOption() {
    //Every time we call this function computerChoose variable will be updated
    computerChoose = options[Math.floor(Math.random() * 3)];
}

function playerOption(e) {
    computerOption();
    playerChoose = e.target.querySelector('p').innerText.toLowerCase();
    //Getting both player's choice and computer's choice and forwarding it to showResults function
    showResults(computerChoose, playerChoose);
}

//This function is there to create back all elements after every round. Because we will remove them.
function createElements() {
    const images = ['./assets/60 Rock.png', './assets/60 Paper.png', './assets/60 Scissors.png'];
    images.forEach((img, idx) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('choose-RPS');
        const p = document.createElement('p');
        p.innerText = options[idx].toUpperCase();
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', img);
        imgEl.setAttribute('alt', options[idx]);
        button.appendChild(p);
        button.appendChild(imgEl);
        li.appendChild(button)
        choicesEl.appendChild(li);
    })
}


function showResults(computerSelection, playerSelection) {
    //We are filtering all the buttons and getting back button which has same value as computer's choice
    const computerDiv = [...playerOptionBtns].filter(btn => {
        const value = btn.querySelector('p').innerText.toLowerCase();
        if(value === computerSelection) return btn;
    })

    const playerDiv = [...playerOptionBtns].filter(btn => {
        const value = btn.querySelector('p').innerText.toLowerCase();
        if(value === playerSelection) return btn
    })

    //Now we will delete all choices and show both options and conclude winner.
    choicesEl.innerHTML = '';

    //In case it was a tie, we need to create 2 buttons that have same values.
    if(computerSelection === playerSelection) {
        const playerDivEl = document.createElement('li');
        playerDivEl.appendChild(playerDiv[0])
        choicesEl.appendChild(playerDivEl);

        //Messange on who won.
        let result = decideWinner(computerSelection, playerSelection);
        const messageEl = document.createElement('li');
        const message = document.createElement('h2');
        message.innerText = result;
        messageEl.appendChild(message);
        choicesEl.appendChild(messageEl);

        const computerDivEl = document.createElement('li');
        const tiedDiv = document.createElement('button');
        tiedDiv.setAttribute('class', 'choose-RPS');
        const pTag = document.createElement('p')
        pTag.innerText = playerDiv[0].querySelector('p').innerText;
        const img = document.createElement('img');
        img.setAttribute('src', playerDiv[0].querySelector('img').src);
        tiedDiv.appendChild(pTag);
        tiedDiv.appendChild(img);
        computerDivEl.appendChild(tiedDiv);
        choicesEl.appendChild(computerDivEl);

    } else {
        //Creating li and appending player's choice that we saved in playerDiv array.
        const playerDivEl = document.createElement('li');
        playerDivEl.appendChild(playerDiv[0])
        choicesEl.appendChild(playerDivEl);

        //Messange on who won.
        let result = decideWinner(computerSelection, playerSelection);
        const messageEl = document.createElement('li');
        const message = document.createElement('h2');
        message.innerText = result;
        messageEl.appendChild(message);
        choicesEl.appendChild(messageEl);

        //Creating li and appending player's choice that we saved in computerDiv array.
        const computerDivEl = document.createElement('li');
        computerDivEl.appendChild(computerDiv[0]);
        choicesEl.appendChild(computerDivEl);

        //Increasing the score..
        increaseScore(result);
    }

    //Playing Again after round is over, and after choice is made we forbid player to press any of the choices
    //until new round is started.
    screens[1].classList.add('between-rounds');
    setTimeout(() => {
        choicesEl.querySelectorAll('li').forEach(li => choicesEl.removeChild(li));
        createElements();
        //returning pointer events
        screens[1].classList.remove('between-rounds');
    }, 3000)

    
}

//Passing this function both choices, and through nested if statements we conclude the winner.
function decideWinner(computer, player) {
    let result;
    if(computer === 'rock') {
        if(player === 'paper') {
            result = 'You won!'
        } else if(player === 'scissors') {
            result = 'You Lost.'
        } else {
            result = 'You are tied.'
        }
    } else if(computer === 'paper') {
        if(player === 'rock') {
            result = 'You Lost.'
        } else if(player === 'scissors') {
            result = 'You Won!'
        } else {
            result = 'You are tied.'
        }
    } else if(computer === 'scissors') {
        if(player === 'paper') {
            result = 'You Lost.'
        } else if(player === 'rock') {
            result = 'You Won!'
        } else {
            result = 'You are Tied';
        }
    }
    return result;
}

//We are passing in the result and and increasing the score based on who won.
function increaseScore(result) {
    if(result == 'You Lost.') {
        computerScore++;
    } else if(result == 'You Won!') {
        playerScore++
    } else {
        computerScore = computerScore;
        playerScore = playerScore;
    }
    playerScoreEl.innerHTML = `Player: ${playerScore}`;
    computerScoreEl.innerHTML = `Computer: ${computerScore}`;
    //Whenever player's or computer's score gets to 5 we cann gameOverScreen function with winner as a parameter.
    if(computerScore === 5)  {
        gameOverScreen('Computer');
    }else if(playerScore === 5) {
        gameOverScreen('Player');
    }
}

//Based on who won, we are showing different game over screen.
function gameOverScreen(winner) {
    if(winner === 'Computer') {
        screens[1].innerHTML = `
        <div class="title">
            <h2 class="you-lost" >You lost.. Better luck next time.</h2>
        </div>
        <button class="game-over" onClick="location.reload(true)">Try Again</button>`
    } else {
        screens[1].innerHTML = `
        <div class="title">
            <h2 class="you-won" >Congratulations, you won the game!</h2>
        </div>
        <button class="game-over" onClick="location.reload(true)">Play Again</button>`
    }
}