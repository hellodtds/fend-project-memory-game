"use strict";

/***************************************************************************** */

let openCard = [];

let itemMatch = [];

let deck = document.querySelector(".deck");

// feat: list of cards used for game from: https://fontawesome.com/
let card_list = [

    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"

];

// feat: star (ranking)
let stars = document.querySelector('.stars')

// feat: move (counter)
let numberOfMoves = 0;
let moves = document.querySelector(".moves");

// feat: buttons
//--> modal ("cancel", "replay")
let buttonCancel = document.querySelector('.modal-cancel');
let buttonPlayAgain = document.querySelector('.modal-replay');
let xToCloseModal = document.querySelector('.modal-close');
let modalContent = document.querySelector('.modal-content');

//--> restart 
let restart = document.querySelector('.restart');

// feat: time clock
let timeStarted = true; 
let timeContent,
counter,
minutes,
seconds,
isTimerRunning,
savedTimeClock,
timer;
let timeID = document.getElementById('timeID');


let zero = function(x) {
    return 0;
};

let tick = function() {
    if (counter < 60) {
        seconds = counter < 10 ? `0${counter++}` : parseInt(counter++ % 60);
    } else {
        counter = `0${counter=0}`;
        minutes++;
    }
    timeContent = `${minutes}:${seconds}`;
    document.getElementById('timeID').textContent = timeContent;
    savedTimeClock = timeContent;
};


/***************************************************************************** */


// task: shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// task: keep game timer
function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}

function startTimer() {
    isTimerRunning = true;
    counter = zero(counter);
    seconds = zero(seconds);
    minutes = zero(minutes);
    timer = setInterval(tick, 1000);
}

// describe: card is clicked
deck.addEventListener('click', function(e){



    if (e.target && e.target.matches('li.card')) {  
        if ( savedTimeClock == undefined && numberOfMoves != 0) {
            startTimer();
        }
        if (openCard.length < 2) {
            pushTheCardIntoTheOpenCardArray(e);

            e.target.classList.toggle('show');
            e.target.classList.toggle('open');
        }
        if (openCard.length == 2) {
            setTimeout(match, 1000);
        }
        
        if ( itemMatch.length === 16 ) {
            modalContent.addModal();
        }
        

        count();
        currentShinyStars(numberOfMoves);
        
    }
 
});


// task: track flipped card types (max = 2)
function pushTheCardIntoTheOpenCardArray(e) {
    openCard.push(e.target);
}


// task: match cards
function match(event) {
    if (openCard[0].children[0].className === openCard[1].children[0].className) {
        itemMatch.push(openCard[0]);
        itemMatch.push(openCard[1]);
        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
    } else {
        openCard[0].classList.remove("open", "show");
        openCard[1].classList.remove("open", "show");
    }
    openCard = [];

}


// task: increment moves
function count() {
    moves.innerHTML = ++numberOfMoves;
}

// task: show card 
function show(x) {
    x = x.classList;
    return x.toggle("show");
}

// task: open card
function open(x) {
    x = x.classList;
    return x.toggle("open");
}


function currentShinyStars(x) {
    if (x % card_list.length === 0) {
        stars.lastElementChild.remove();    
    }   
}

// task: remove modal
function removeModal(x) {  
    x.classList.add('hide');
}

// task: add modal
function addModal(x) {
    x.classList.add('show');

}


// task: cancel or replay (modal-buttons) 
buttonCancel.onclick = removeModal(buttonCancel);

buttonPlayAgain.onclick = function() {
    removeModal(buttonPlayAgain);
    restartTheGame();
}

xToCloseModal.onclick = removeModal(xToCloseModal);



// task: restart game
restart.onclick = restartTheGame();

function restartTheGame() {
    stopTimer();
    createGameBoard();


}

let isTheGameIsOver = false;

// // task: game over
// function ifTheGameIsOver() {
//     if ( itemMatch.length === 16 ) addModal();
//     xToCloseModal.remove();
  
// }

// // feat: show player stats
// function showPlayerStats() {

// }

/***************************************************************************** */


// task: build the game board
function createGameBoard(x, y, z) {

    /* fix: variable hard code here */
    x = shuffle(card_list), 
    y=deck,
    z="li",
    savedTimeClock = undefined;

    y.innerHTML = '';

    numberOfMoves = zero();
    moves.innerHTML = zero();

    timeID.innerHTML = '0:00';

    // Error in implementing forEach() 
    for ( var i = 0; i < x.length; i++) {
        let item = document.createElement(z);
        item.setAttribute('class', 'card');
        item.innerHTML = `<i class='fa ${x[i]}'></i>`;
        y.appendChild(item);
    };
}

