var start = false;          //mark whether the game has began
var cheat = false;

window.onload = function () {
    
    document.getElementById('start-point').onmouseenter = function() {
        start = true;
        document.getElementById('maze-container').className = 'pointer';

        var resultInfo = document.getElementsByClassName('show-info')[0];
        if ( resultInfo ) {
            resultInfo.className = 'hidden-info';
        }
    };

    //---- TOP walls ----
    document.getElementById('wall-container1').onmouseover = hitWall_1;
    document.getElementById('wall-container1').onmouseout = leaveWall_1;
    //---- end TOP walls ----

    //---- walls on two SIDES ----
    document.getElementById('wall-container2').onmouseover = hitWall_2;
    document.getElementById('wall-container2').onmouseout = leaveWall_2;
    //---- end walls on two SIDES ----

    //---- MIDDLE wall ----
    document.getElementById('wall-container3').onmouseover = hitWall_2;
    document.getElementById('wall-container3').onmouseout = leaveWall_2;
    //---- end MIDDLE wall

    //---- BOTTOM walls ----
    document.getElementById('wall-container4').onmouseover = hitWall_1;
    document.getElementById('wall-container4').onmouseout = leaveWall_1;
    //---- end BOTTOM walls

    document.getElementById('maze-container').onmouseenter = function() {
        cheat = false;
    };

    document.getElementById('maze-container').onmouseleave = function() {
        cheat = true;
    };

    document.getElementById('end-point').onmouseover = function() {
        if ( !start ) {
            return;
        } 

        var resultInfo = document.getElementsByClassName('hidden-info')[0];
        if ( cheat ) {
            resultInfo.textContent = 'Don\'t cheat, you should start form the \'S\' and move to the \'E\' inside the maze!';
        } else {
            resultInfo.textContent = 'You Win';
        }

        resultInfo.className = 'show-info';
        start = false;
    };
};

// 1 for the top walls and the bottom walls
function hitWall_1 () {
    if ( !start )
        return;

    var walls = this.getElementsByClassName('wall');
    var len = walls.length;
    while ( len-- ) {
        walls[0].className = 'wall-hit';
    }

    start = false;
    document.getElementById('maze-container').className = '';

    showLoseInfo();
}

function leaveWall_1 () {
    var walls = this.getElementsByClassName('wall-hit');
    var len = walls.length;
    while ( len-- ) {
        walls[0].className = 'wall';
    }
}

// 2 for walls on two sides and the middle wall
function hitWall_2 ()  {
    if ( !start )
        return;

    if ( event.target.className == 'wall' ) {
        event.target.className = 'wall-hit';
        start = false;
        document.getElementById('maze-container').className = '';

        showLoseInfo();
    }
}

function leaveWall_2 () {
    if ( event.target.className == 'wall-hit' ) {
        event.target.className = 'wall';
    }
}

function showLoseInfo() {
    var resultInfo = document.getElementsByClassName('hidden-info')[0];
    resultInfo.textContent = 'You Lose';
    resultInfo.className = 'show-info';
}