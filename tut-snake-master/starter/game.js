var disp = $('.disp'),
	msg = $('.msg');

var dispWith = 40;
var runningGame;
var gameInterval;
var timeStep, frameStep;
var BAD_MOVE = 1,GOOD_MOVE = 2,ACE_MOVE = 3;
var avaiblePixels;


var DIR_UP = 'u',
	DIR_DOWN = 'd',
	DIR_LEFT = 'l',
	DIR_Right = 'r';



for(i = 0;i < dispWith;i ++){
	for(j = 0;j < dispWith;j ++){
		 var tmp = $('<div class="pixel" data-x="'+ j + '" data-y="'+ i +'"></div>');
		 disp.append(tmp);
	}
}

var snake = {
	direction : 'l',
	move: function(){

	}
	bodyPixels : [];
}

var initializeGame = function(){
	frameStep = 250;
	timeStep = 50;
	currtime = 0;
	//set every enable pixel to array
	avaiblePixels = [];
	for(var i = 0;i < dispWith;i ++){
		for(var j = 0;j < dispWith;j ++){
			//to record the enable pixels
			avaiblePixels.push(i + '|' + j);
		}
	}
	snake.direction = DIR_LEFT;
	snake.bodyPixels = [];
}

var startMainLoop = function(){
	//gameInterval to set timer
	//currtime is the game time compose by every timeStep
	//if curtime greater than setting time
	gameInterval = setInterval(function(){
		currTime += timeStep;
		if(currTime >= frameStep){
			//set snake move
			//three types move bad,good,ace
			var m = snake.move();
			if(m == BAD_MOVE){
				//if bad move, game over
				//restart interval and show message
				clearInterval(gameInterval);
				runningGame = false;
				ShowMessage("Game Over","Press space to start again");
			}else if(m == ACE_MOVE){
				//if complete
				//restart interval and show message
				clearInterval(gameInterval);
				runningGame = false;
				ShowMessage("You Win","Press space to start again");

			}
			curtime %= frameStep;
		}
	},timeStep);
	ShowMessage('','');
}


var ShowMessage = function(ma,mb){
	msg.find('.msg-a').text(ma);
	msg.find('.msg-b').text(mb);
}


$(window).keydown(function(e){
	var click = e.which;

	///up
	if(click === 38){
		if(snake.direction !== DIR_DOWN)
			snake.direction == DIR_UP;
		console.log("up");

	///down
	}else if(click === 40){
		if(snake.direction !== DIR_UP)
			snake.direction == DIR_DOWN;
		console.log("down");

	///left
	}else if(click === 37){
		if(snake.direction !== DIR_Right)
			snake.direction == DIR_LEFT;
		console.log("left");

	///right
	}else if(click === 39){
		if(snake.direction !== DIR_LEFT)
			snake.direction == DIR_Right;
		console.log("right");

	///space
	}else if(click === 32){
		//if it isn't rinning
		//space will initial game and start snake
		//than game running
		if(!runningGame){
			initializeGame();
			startMainLoop();
			runningGame = true;
		}
		console.log("space");
	///p
	}else if(click === 80){
		//if running game pause the game
		//else neglect it
		if(runningGame){
			if(!gameInterval){
				//if time is stop,continue the game
				startMainLoop();
			}else{
				//if time is continue,stop the time
				//and show the pause message
				clearInterval(gameInterval);
				gameInterval = null;
				ShowMessage("pause","click p to repause")
			}
		}
		console.log("p");

	///f turn left
	}else if(click === 70){
		if(snake.direction == DIR_DOWN){
			snake.direction == DIR_Right; 
		}else if(snake.direction == DIR_Right){
			snake.direction == DIR_UP;
		}else if(snake.direction == DIR_UP){
			snake.direction == DIR_LEFT;
		}else if(snake.direction == DIR_LEFT){
			snake.direction == DIR_DOWN;
		}

		console.log("f");
	///j  turn right
	}else if(click === 74){
		if(snake.direction == DIR_DOWN){
			snake.direction == DIR_LEFT; 
		}else if(snake.direction == DIR_Right){
			snake.direction == DIR_DOWN;
		}else if(snake.direction == DIR_UP){
			snake.direction == DIR_Right;
		}else if(snake.direction == DIR_LEFT){
			snake.direction == DIR_UP;
		}


		console.log("j");
	}
})


