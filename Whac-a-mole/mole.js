var start = false;              //mark whether the game has began
var intervalId;                 //hold the return value of setInterval() in startGame()
var timeUpId;                   //hold the return value of setTimeout() in startGame()
var previous = -1;              //hold the value of the previous mole's location

window.onload = initialize;
function initialize () {

    document.getElementById('start-button').onclick = function() {
        if ( start ) {
            start = false;
            window.clearInterval( intervalId );
            window.clearTimeout( timeUpId );
        } else {
            document.getElementById('time-info').value = 30;
            document.getElementById('status-info').value = 'Playing';
            document.getElementById('score-info').value = 0;
            start = true;
            startGame();
        }
    };

}

function startGame() {
    var time = document.getElementById('time-info');

    intervalId = window.setInterval( timeDecrement, 1000 );
    timeUpId = window.setTimeout( endGame, 31000 );

    callNextMole();
}

function timeDecrement() {
    var time = document.getElementById('time-info');
    if ( time.value > 0 ) {
        --time.value;
    }
}

function callNextMole() {

    if ( !start )
        return;

    var moles = document.getElementsByClassName('mole');
    var randomNum = Math.floor( Math.random() * 30 );

    if ( previous != -1 ) {
        moles[previous].checked = 'checked';
    }

    var timeOutId = window.setTimeout( callNextMole, 3000, randomNum );
    previous = randomNum;

    moles[randomNum].checked = '';

    var molesContainer = document.getElementById('moles-container');

    molesContainer.onclick = function() {

        if ( event.target.className != 'mole' )
            return;

        if ( event.target !== moles[randomNum] ) {
            --document.getElementById('score-info').value;
        } else {
            event.target.checked = 'checked';
            ++document.getElementById('score-info').value;
        }

        window.clearTimeout( timeOutId );
        callNextMole();

    };

}

function endGame() {

    window.clearInterval( intervalId );
    start = false;

    var score = document.getElementById('score-info');
    document.getElementById('moles-container').onclick = function() {};     //remove the listener

    alert( 'Game Over.\nYour score is ' + score.value );
    initialize();

}