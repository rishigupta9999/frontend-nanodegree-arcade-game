function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const TILE_Y_OFFSET = 20;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    const NUM_LANES = 3;

    this.x = -TILE_WIDTH;
    this.y = (Math.floor(Math.random() * NUM_LANES)) + 1;
    this.y = this.y * TILE_HEIGHT - TILE_Y_OFFSET;

    const MIN_SPEED = 200;
    const MAX_SPEED = 300;

    this.speed = getRandomIntInclusive(MIN_SPEED, MAX_SPEED);

    this.zombie = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > 505) {
        this.zombie = true;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png'

    this.tile_x = 2;
    this.tile_y = 5;

    this.update();
}

Player.prototype.update = function(dt) {
    this.x = this.tile_x * TILE_WIDTH;
    this.y = this.tile_y * TILE_HEIGHT - TILE_Y_OFFSET;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {

    if ((keyCode == 'left') && (this.tile_x > 0)) {
        this.tile_x--;
    }
    else if ((keyCode == 'right') && (this.tile_x < 4)) {
        this.tile_x++;
    }
    else if ((keyCode == 'up') && (this.tile_y > 0)) {
        this.tile_y--;
    }
    else if ((keyCode == 'down') && (this.tile_y < 5)) {
        this.tile_y++;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var Environment = function () {

}

Environment.prototype.init = function() {

    const NUM_ENEMIES = 5;

    allEnemies = [];

    for (i = 0; i < NUM_ENEMIES; i++) {
        allEnemies.push(new Enemy());
    }

    player = new Player

}

environment = new Environment();
environment.init();
