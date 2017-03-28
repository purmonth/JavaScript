"use strict";
var disp = $('.disp'),
    msg = $('.msg');
var availablePixels;
var currentCoin;
var GOOD_MOVE = 1,
    BAD_MOVE = 0,
    ACE_MOVE = 2;
var initialLength = 16;
var dispWidthInPixels = 40;
var gameInterval;
var frameStep, timeStep, currTime;
var gameRunning = false;

for (var i = 0; i < dispWidthInPixels; i++) {
    for (var j = 0; j < dispWidthInPixels; j++) {
        var p = $('<div class="pixel" data-x="' + j + '" data-y="' + i + '"></div>');
        disp.append(p);
    }
}

var beep = document.createElement('audio'),
    gameover = document.createElement('audio');
if (!!(beep.canPlayType && beep.canPlayType('audio/mpeg;').replace(/no/, ''))) {
    beep.src = 'beep.mp3';
    gameover.src = 'gameover.mp3'
} else if (!!(beep.canPlayType && beep.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
    beep.src = 'beep.ogg';
    gameover.src = 'gameover.ogg';
}

var showMessage = function(ma, mb) {
    msg.find('.msg-a').text(ma);
    msg.find('.msg-b').text(mb);
};

/*
    Returns true if anything available; false otherwise.
    It would be a good time to declare if we got false.
*/
var useNextRandomPixelForCoin = function() {
    var ap = availablePixels;
    if (ap.length === 0) {
        return false;
    }
    var idx = Math.floor(Math.random() * ap.length);
    currentCoin = ap.splice(idx, 1)[0].split('|');
    $('div.pixel[data-x="' + currentCoin[0] + '"][data-y="' + currentCoin[1] + '"]').addClass('taken');
    return true;
};

var releasePixel = function(x, y) {
    $('div.pixel[data-x="' + x + '"][data-y="' + y + '"]').removeClass('taken');
    availablePixels.push(x + '|' + y);
};

/*
    Returns true if successful; false otherwise.
*/
var tryAllocatingPixel = function(x, y) {
    var ap = availablePixels;
    var p = x + '|' + y;
    var idx = ap.indexOf(p);
    if (idx !== -1) {
        ap.splice(idx, 1);
        $('div.pixel[data-x="' + x + '"][data-y="' + y + '"]').addClass('taken');
        return true;
    } else {
        return false;
    }
};

var adjustSpeed = function(l) {
    if (l >= 500) {
        frameStep = 50;
    } else if (l >= 400) {
        frameStep = 100;
    } else if (l >= 300) {
        frameStep = 150;
    } else if (l >= 200) {
        frameStep = 200;
    }
};

var snake = {
    direction: 'l',
    bodyPixels: [],
    move: function() {
        var head = this.bodyPixels[this.bodyPixels.length - 1];

        // figure out what should be the next one
        var nextHead = [];
        if (this.direction === 'l') {
            nextHead.push(head[0] - 1);
        } else if (this.direction === 'r') {
            nextHead.push(head[0] + 1);
        } else {
            nextHead.push(head[0]);
        }
        if (this.direction === 'u') {
            nextHead.push(head[1] - 1);
        } else if (this.direction === 'd') {
            nextHead.push(head[1] + 1);
        } else {
            nextHead.push(head[1]);
        }

        // different outcomes of the move
        if (nextHead[0] == currentCoin[0] && nextHead[1] == currentCoin[1]) {
            this.bodyPixels.push(nextHead);
            beep.play();
            adjustSpeed(this.bodyPixels.length);
            if (useNextRandomPixelForCoin()) {
                return GOOD_MOVE;
            } else {
                return ACE_MOVE;
            }
        } else if (tryAllocatingPixel(nextHead[0], nextHead[1])) {
            var tail = this.bodyPixels.splice(0, 1)[0];
            this.bodyPixels.push(nextHead);
            releasePixel(tail[0], tail[1]);
            return GOOD_MOVE;
        } else {
            return BAD_MOVE;
        }
    }
};

var initializeGame = function() {
    frameStep = 250;
    timeStep = 50;
    currTime = 0;
    $('.pixel').removeClass('taken');
    // initialize all pixels
    availablePixels = [];
    for (var i = 0; i < dispWidthInPixels; i++) {
        for (var j = 0; j < dispWidthInPixels; j++) {
            availablePixels.push(i + '|' + j);
        }
    }

    // initialize the snake
    snake.direction = 'l';
    snake.bodyPixels = [];
    for (var i = 29, end = 29 - initialLength; i > end; i--) {
        tryAllocatingPixel(i, 25);
        snake.bodyPixels.push([i, 25]);
    }

    // initialize the coin
    useNextRandomPixelForCoin();        
};

var startMainLoop = function() {
    gameInterval = setInterval(function() {
        currTime += timeStep;
        if (currTime >= frameStep) {
            var m = snake.move();
            if (m === BAD_MOVE) {
                clearInterval(gameInterval);
                gameRunning = false;
                gameover.play();
                showMessage('Game Over', 'Press space to start again');
            } else if (m === ACE_MOVE) {
                clearInterval(gameInterval);
                gameRunning = false;
                showMessage("You Won", 'Press space to start again');            
            }
            currTime %= frameStep;
        }
    }, timeStep);
    showMessage('', '');
};

$(window).keydown(function(e) {
    var k = e.keyCode || e.which;
    if (k === 32) {
        e.preventDefault();
        if (!gameRunning) {
            initializeGame();
            startMainLoop();
            gameRunning = true;
        }
    } else if (k === 80) {
        if (gameRunning) {
            if (!gameInterval) {
                startMainLoop();
            } else {
                clearInterval(gameInterval);
                gameInterval = null;
                showMessage('Paused', '');
            }
        }
    } else if (k === 38) {
        e.preventDefault();
        if (snake.direction !== 'd')
            snake.direction = 'u';
    } else if (k === 40) {
        e.preventDefault();
        if (snake.direction !== 'u')
            snake.direction = 'd';            
    } else if (k === 37) {
        e.preventDefault();
        if (snake.direction !== 'r')
            snake.direction = 'l';
    } else if (k === 39) {
        e.preventDefault();
        if (snake.direction !== 'l')
            snake.direction = 'r';
    } else if (k === 70) {
        if (snake.direction === 'u') {
            snake.direction = 'l';
        } else if (snake.direction === 'l') {
            snake.direction = 'd';
        } else if (snake.direction === 'd') {
            snake.direction = 'r';
        } else if (snake.direction === 'r') {
            snake.direction = 'u';
        }
    } else if (k === 74) {
        if (snake.direction === 'u') {
            snake.direction = 'r';
        } else if (snake.direction === 'r') {
            snake.direction = 'd';
        } else if (snake.direction === 'd') {
            snake.direction = 'l';
        } else if (snake.direction === 'l') {
            snake.direction = 'u';
        }            
    }
});

showMessage('Welcome!', 'Press space to start');
