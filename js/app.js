"use strict";


/***************************************************************************** */
/*
  List of Cards Used For Game From: https://fontawesome.com/
  */
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


/***************************************************************************** */
/*
  Shuffle The Cards
  */

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

/***************************************************************************** */
/* 
    Build The Game Board
    */



let deck = document.querySelector(".deck");

/***************************************************************************** */
/* 
  Task: Reset Game,
        Stars,
        NumberOfMoves
  */

 let restart = document.querySelector('.restart');

 let stars = document.querySelector('.stars')
 
 // Initial Number of Moves, Counter
 let numberOfMoves = 0;
 let moves = document.querySelector(".moves");


/***************************************************************************** */
function createGameBoard(/* card_list */ x, /*  deck */ y, /* element type */ z) {
    y.innerHTML = '';
    let item;
    numberOfMoves = 0;
    moves.innerHTML = 0;

    // Error in implementing forEach() 
    for ( var i = 0; i < x.length; i++) {
        item = document.createElement(z);
        item.setAttribute('class', 'card');
        item.innerHTML = `<i class='fa ${x[i]}'></i>`;
        y.appendChild(item);
    };
}


function restartTheGame() {
    createGameBoard(card_list = shuffle(card_list), deck, "li");
    numberOfMoves = 0;
    moves.innerHTML = 0;
}

restart.onclick = restartTheGame;

/***************************************************************************** */
/* 
    Task: Start Game
    */

// use createGameBoard() or doSomethingElse()

// Cards Get Shuffled 
createGameBoard(card_list = shuffle(card_list), deck, "li");



/***************************************************************************** */
/* 
  Task: Open Cards
  */
let openCard = [];

/***************************************************************************** */
/*
  DESCRIBES: What Happens When Card is Clicked?
  */
let timeStarted = true; 


// document.getElementsByTagName('li').addEventListener('click', function(e){
//     if (e.target && e.target.matches('li.card')) {
//         e.target.classList.toggle('show');
//     }
// });

deck.addEventListener('click', function(e){

    if ( savedTimeClock == undefined) {
        startTimer();
    }
    
    if (e.target && e.target.matches('li.card')) {
        

        if (openCard.length < 2) {
            pushTheCardIntoTheOpenCardArray(e);

            e.target.classList.toggle('show');
            e.target.classList.toggle('open');
        }

        if (openCard.length == 2) {
            setTimeout(match, 1000);
        }
    
        count();
    
        currentShinyStars(numberOfMoves);
    }

});

function pushTheCardIntoTheOpenCardArray(e) {
    openCard.push(e.target);
}



/***************************************************************************** */
/* 
  Task: Match Cards
  */
let itemMatch = [];

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

/***************************************************************************** */
/* 
  Task: Keep Time
  */
let timeContent,
    counter,
    minutes,
    seconds,
    isTimerRunning,
    savedTimeClock,
    timer;
    

let timeID = document.getElementById('timeID');
// timeID.addEventListener('click', startTimer);

// let stopButton = document.getElementById('stopTimer');

// stopButton.addEventListener('click', function() {
//     clearInterval(timer);
//     isTimerRunning = false;
// });


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

let zero = function(x) {
    return 0;
};

function startTimer() {
    isTimerRunning = true;
    counter = zero(counter);
    seconds = zero(seconds);
    minutes = zero(minutes);
    timer = setInterval(tick, 1000);
}


/***************************************************************************** */



/*
    Task: Increment Move Counter
*/

function count() {
    // consider MAX number of moves
    // if numberOfMoves < 16, 3 stars ?



    moves.innerHTML = ++numberOfMoves;



    // // ifTheGameIsOver
    // ifTheGameIsOver();

}


/***************************************************************************** */
/*
  Simple Actions: show, open, 'give player star'
  */

// show card 
function show(x) {
    x = x.classList;
    return x.toggle("show");
}


// // open card
function open(x) {
    x = x.classList;
    return x.toggle("open");
}



function currentShinyStars(x) {

    if (x % card_list.length === 0) {

        stars.lastElementChild.remove();
    
    }

   
}