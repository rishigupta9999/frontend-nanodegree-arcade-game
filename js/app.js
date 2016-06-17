function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const TILE_Y_OFFSET = 25;

const PLAYER_WIDTH = 67;
const PLAYER_HEIGHT = 78;
const PLAYER_OFFSET_X = 16;
const PLAYER_OFFSET_Y = 64;

const ENEMY_WIDTH = 99;
const ENEMY_HEIGHT = 68;

var Rect = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.intersects = function(collisionRect) {
    return  (this.ptInRect(collisionRect.x, collisionRect.y)) || 
            (this.ptInRect(collisionRect.x + collisionRect.width, collisionRect.y)) ||
            (this.ptInRect(collisionRect.x, collisionRect.y + collisionRect.height)) ||
            (this.ptInRect(collisionRect.x + collisionRect.width, collisionRect.y + collisionRect.height));
}

Rect.prototype.ptInRect = function(x, y) {
    return (x >= this.x) && (x <= (this.x + this.width)) && (y >= this.y) && (y <= (this.y + this.height));
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    const NUM_LANES = 3;

    this.x = -(TILE_WIDTH + getRandomIntInclusive(0, 200));
    this.tile_y = (Math.floor(Math.random() * NUM_LANES)) + 2;
    this.y = this.tile_y * TILE_HEIGHT - TILE_Y_OFFSET;

    // The bug image has some built in height, basically an excess tile on the top so we subtract one to compensate
    this.tile_y--;

    this.boundingRect = new Rect(this.x, this.y, ENEMY_WIDTH, ENEMY_HEIGHT);

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

    this.boundingRect.x = this.x;
    this.boundingRect.y = this.y;

    if ((this.tile_y == player.tile_y) && (this.boundingRect.intersects(player.boundingRect))) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //ctx.rect(this.boundingRect.x, this.boundingRect.y, this.boundingRect.width, this.boundingRect.height);
    //ctx.stroke();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png'

    this.boundingRect = new Rect(0, 0, PLAYER_WIDTH, PLAYER_HEIGHT);

    this.reset()
}

Player.prototype.reset = function() {
    this.tile_x = 2;
    this.tile_y = 5;

    this.update();

}

Player.prototype.update = function(dt) {
    this.x = this.tile_x * TILE_WIDTH;
    this.y = this.tile_y * TILE_HEIGHT - TILE_Y_OFFSET;

    this.boundingRect.x = this.x + PLAYER_OFFSET_X;
    this.boundingRect.y = this.y + PLAYER_OFFSET_Y;

    if (this.tile_y == 0) {
        player.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.rect(this.x + PLAYER_OFFSET_X, this.y + PLAYER_OFFSET_Y, PLAYER_WIDTH, PLAYER_HEIGHT);
    //ctx.stroke();
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
