describe('useNextRandomPixelForCoin', function() {
    it('should return false when the available pixel array is empty.', function() {
        availablePixels = [];
        expect(useNextRandomPixelForCoin()).toBe(false);
    });

    it('should update the current coin location and return true when there is any pixels available.', function() {
        availablePixels = ['2|3', '4|5'];
        currentCoin = ['0', '0'];
        expect(useNextRandomPixelForCoin()).toBe(true);
        expect(currentCoin[0]).not.toBe('0');
        expect(currentCoin[1]).not.toBe('0');
        expect(currentCoin[0] === '2' || currentCoin[0] === '4').toBe(true);
        if (currentCoin[0] === '2')
            expect(currentCoin[1] === '3').toBe(true);
        else
            expect(currentCoin[1] === '5').toBe(true);
    })
});

describe('tryAllocatingPixel', function() {
    beforeEach(function() {
        availablePixels = ['1|2', '3|4'];
    });
    it('should report true if the allocation was successful.', function() {
        expect(tryAllocatingPixel(1, 2)).toBe(true);
        expect(tryAllocatingPixel(1, 2)).toBe(false);
        expect(tryAllocatingPixel(3, 4)).toBe(true);
    });
    it('should report false if the allocation was not successful.', function() {
        expect(tryAllocatingPixel(5, 6)).toBe(false);
        expect(tryAllocatingPixel(1, 2)).toBe(true);
        expect(tryAllocatingPixel(1, 2)).toBe(false);
    });
});

describe('releasePixel', function() {
    it('should return the specified pixel to the available pixel pool.', function() {
        availablePixels = [];
        releasePixel(1, 2);
        expect(availablePixels.length).toBe(1);
        expect(availablePixels[0]).toBe('1|2')
    });
});

describe('snake', function() {
    beforeEach(function() {
        $('.pixel').removeClass('taken');
        // initialize all pixels
        availablePixels = [];
        for (var i = 0; i < dispWidthInPixels; i++) {
            for (var j = 0; j < dispWidthInPixels; j++) {
                var p = $('<div class="pixel" data-x="' + j + '" data-y="' + i + '"></div>');
                availablePixels.push(i + '|' + j);
            }
        }

        // initialize the snake
        snake.direction = 'l';
        snake.bodyPixels = [];
        for (var i = 29, end = 29 - initialLength; i > end; i--) {
            (function(x) {
                tryAllocatingPixel(x, 25);
                snake.bodyPixels.push([x, 25]);
            })(i);
        }
    });
    it('should move in its own direction.', function() {
        var oldHead, newHead;
        snake.direction = 'u';
        oldHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        snake.move();
        newHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        expect(newHead[0]).toBe(oldHead[0]);
        expect(newHead[1]).toBe(oldHead[1] - 1);
        snake.direction = 'l';
        oldHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        snake.move();
        newHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        expect(newHead[0]).toBe(oldHead[0] - 1);
        expect(newHead[1]).toBe(oldHead[1]);
    });
    it('should should report bad move if it was blocked.', function() {
        snake.direction = 'u';
        expect(snake.move()).toBe(GOOD_MOVE);
        snake.direction = 'r';
        expect(snake.move()).toBe(GOOD_MOVE);
        snake.direction = 'd';
        expect(snake.move()).toBe(BAD_MOVE);
    });
    it('should be able to collect coin when moving without releasing the last pixel.', function() {
        var oldLength = snake.bodyPixels.length;
        var head = snake.bodyPixels[oldLength - 1];
        currentCoin = [head[0] - 1, head[1]];
        var oldCoinLocation = [currentCoin[0], currentCoin[1]];
        expect(snake.move()).toBe(GOOD_MOVE);
        var newLength = snake.bodyPixels.length;
        expect(currentCoin[0] === oldCoinLocation[0] && currentCoin[1] === oldCoinLocation[1]).toBe(false);
        expect(newLength).toBe(oldLength + 1);
    });
    it('should release the last pixel if the move was successful.', function() {
        var oldTail = [snake.bodyPixels[0][0], snake.bodyPixels[0][1]];
        snake.direction = 'u';
        expect(snake.move()).toBe(GOOD_MOVE);
        var newTail = [snake.bodyPixels[0][0], snake.bodyPixels[0][1]];
        expect(oldTail[0] === newTail[0] && oldTail[1] === newTail[1]).toBe(false);
    });
});

describe('initializeGame', function() {
    it('should initialize currTime, timeStep, and frameStep to proper values.', function() {
        timeStep = null;
        frameStep = null;
        currTime = null;
        initializeGame();
        expect(currTime).toBe(0);
        expect(timeStep).toBe(50);
        expect(frameStep).toBe(250);
    });
    it('should initialize the available pixel array.', function() {
        availablePixels = [];
        initializeGame();
        expect(availablePixels.length).toBe(Math.pow(dispWidthInPixels, 2) - initialLength - 1);
    });
    it('should set up the snake\'s body and direction.', function() {
        snake.direction = null;
        snake.bodyPixels = [];
        initializeGame();
        expect(snake.bodyPixels.length).toBe(initialLength);
        expect(snake.direction).toBe('l');
    });
    it('should set up the coin location.', function() {
        currentCoin = null;
        initializeGame();
        expect(currentCoin[0] < dispWidthInPixels && currentCoin[0] >= 0).toBe(true);
        expect(currentCoin[1] < dispWidthInPixels && currentCoin[1] >= 0).toBe(true);
    });
});

describe('mainLoop', function() {
    beforeEach(function() {
        jasmine.clock().install();
        initializeGame();
        startMainLoop();
    });
    afterEach(function() {
        clearInterval(gameInterval);
        jasmine.clock().uninstall();
    });
    afterAll(function() {
        initializeGame();
        showMessage('Welcome!', 'Press space to start');
    });
    it('should be able to move the snake.', function() {
        var oldHead, newHead;
        snake.direction = 'u';
        oldHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        jasmine.clock().tick(frameStep);
        newHead = snake.bodyPixels[snake.bodyPixels.length - 1];
        expect(newHead[0]).toBe(oldHead[0]);
        expect(newHead[1]).toBe(oldHead[1] - 1);
    });
});
