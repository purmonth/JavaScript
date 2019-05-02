const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const store_canvas = document.getElementById('store');
const store_context = store_canvas.getContext('2d');

// function set_store_canvas() {
// 	store_canvas.width = 100;
// 	store_canvas.height = 100;
// 	store_canvas.style.width  = 100;
// 	store_canvas.style.height = 100;
// }

// set_store_canvas();
context.scale(20, 20);
store_context.scale(20, 20);
const pieces = 'TJLOSZI';

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        } 

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}


function drawTarget_Block(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#BDBDBD';
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawTarget_Block(target_block.matrix, target_block.pos);
    drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    matrix.reverse();
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerDropToBottom() {
	for(; !collide(arena, player); player.pos.y++);
	
	player.pos.y--;
	merge(arena, player);
	playerReset();	//drop new block
	arenaSweep();	//check if any line is filled
	updateScore();
	dropCounter = 0;
}

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerReset() {
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    setTargetBlock();
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function setTargetBlock() {
	target_block.pos.x = player.pos.x;
	target_block.matrix = player.matrix;

	target_block.pos.y = 0;
	for(; !collide(arena, target_block); target_block.pos.y++);
	target_block.pos.y--;
}

function set_store_block() {
	if(store_block.matrix === null) {	
		store_block.matrix = player.matrix;
		player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
		
	}
	else {
		let temp_matrix = {};
		temp_matrix.matrix = player.matrix;
		player.matrix = store_block.matrix;
		store_block.matrix = temp_matrix.matrix;
	}
	setTargetBlock();
	draw();
	drawStore(store_block.matrix, {x: 0, y: 0});
}

function playerRotate() {
    const pos = player.pos.x;
    let offset = 1;
    let dir = 1;
    rotate(player.matrix);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    //Make update run continously
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {			//move to the right
        playerMove(-1);
        setTargetBlock();
    } else if (event.keyCode === 39) {	//move to the right
        playerMove(1);
        setTargetBlock();
    } else if (event.keyCode === 40) {	//drop quickly
        playerDrop();
    } else if (event.keyCode === 38) {	//rotate the block
        playerRotate();
        setTargetBlock();
    } else if (event.keyCode === 32) {	//press white space
    	playerDropToBottom();
    } else if (event.keyCode === 16) {
    	set_store_block();
    }
});

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

const target_block = {
	pos: {x: 0, y: 0},
	matrix: null,
}

const store_block = {
	matrix: null,
}

function drawStore(matrix, offset) {
	store_context.fillStyle = '#000';
    store_context.fillRect(0, 0, store_canvas.width, store_canvas.height);
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                store_context.fillStyle = colors[value];
                store_context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

playerReset();
updateScore();
update();
