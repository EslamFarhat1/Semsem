//Enemy class
var Enemy = function (x, y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random() * 300) + 100; // random speed 
};


Enemy.prototype.update = function (dt) {

    this.x += this.speed * dt;
    if (this.x > 500) { //make them back if they get out
        this.x = -20;

    }
    //collision
    if (player.x > this.x - 30 && player.x < this.x + 25 && player.y > this.y - 25 && player.y < this.y + 25) {
        player.x = 200;
        player.y = 390;
        this.speed = (Math.random() * 300) + 100; // reset the speed after collision
    }

};
//draw enemy
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = 60; //constant speed
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.x > 390) {  
        this.x = 390;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 390) {
        this.y = 390;
    }
    //if he get to the top return him back
    if (this.y < 0) {
        this.x = 200;
        this.y = 390;
    }
};
//
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up') {
        this.y -= this.speed + 25;
    }
    if (keyPress == 'down') {
        this.y += this.speed + 25;
    }
    if (keyPress == 'right') {
        this.x += this.speed + 30;
    }
    if (keyPress == 'left') {
        this.x -= this.speed + 30;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let pos = [30, 140, 230];
var player = new Player(200, 390);

for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0, pos[i]));
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});