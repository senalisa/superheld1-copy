
//Adding PIXI app
const Application = PIXI.Application;

let speed = 4;

const app = new Application({
    width: 1650,
    height: 800,
    transparent: false,
    antialias: true
}
);

app.renderer.backgroundColor = 0x87CEEB
app.renderer.view.style.position = 'absolute';

//Appending PIXI to the dom
document.body.appendChild(app.view);


//Clouds in background
//1: create a texture of the clouds image
const cloudsTexture = PIXI.Texture.from('./images/clouds.png');

//2: create another type of sprite by instantiating the pixi tile in sprite class
const cloudsSprite = new PIXI.TilingSprite(
//adding the width and height of the screen
    cloudsTexture, 
    app.screen.width,
    app.screen.height
);

//Tile Scale Set Method
cloudsSprite.tileScale.set(0.5, 0.5);

//Animating clouds
app.ticker.add(function() {
    //Change value of tile X
    cloudsSprite.tilePosition.x -=1;
});

//add it to the stage
app.stage.addChild(cloudsSprite);

//PLAYER
//Creating the player
//Create variable with sprite with image
const player = PIXI.Sprite.from('./images/GameSuperheldPixelArt-SUPERMAN.png');

player.width = 230;
player.height = 130;
player.position.set(100, 300);

app.stage.addChild(player);

//Keyboard Events on Player
document.addEventListener('keydown', function (e) {
    if(e.key === 'ArrowUp')
        player.y -= 15;
    if(e.key === 'ArrowDown')
        player.y += 15;
});

//ENEMY
//CREATE ENEMIES

//ENEMY ONE
const enemy = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemy.width = 230;
enemy.height = 130;
enemy.position.set(1200, 300);

app.stage.addChild(enemy);

//ENEMY TWO
const enemyTwo = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemyTwo.width = 230;
enemyTwo.height = 130;
enemyTwo.position.set(2000, 500);

app.stage.addChild(enemyTwo);

//ENEMY THREE
const enemyThree = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemyThree.width = 230;
enemyThree.height = 130;
enemyThree.position.set(2500, 100);

app.stage.addChild(enemyThree);

//ENEMY FOUR
const enemyFour = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemyFour.width = 230;
enemyFour.height = 130;
enemyFour.position.set(3000, 600);

app.stage.addChild(enemyFour);

//ENEMY FIVE
const enemyFive = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemyFive.width = 230;
enemyFive.height = 130;
enemyFive.position.set(3300, 400);

app.stage.addChild(enemyFive);

//ENEMY FOUR
const enemySix = PIXI.Sprite.from('./images/GameSuperheldPixelArt-CLOUD-Enemy.png');

enemySix.width = 230;
enemySix.height = 130;
enemySix.position.set(3600, 100);

app.stage.addChild(enemySix);

//LETTER A
const letterA = PIXI.Sprite.from('./images/letterA.png');

letterA.width = 130;
letterA.height = 130;
letterA.position.set(2175, 300);

app.stage.addChild(letterA);

//SHOW LETTER A
const letterAShow = PIXI.Sprite.from('./images/letterA.png');
letterAShow.width = 70;
letterAShow.height = 70;
letterAShow.position.set(1500, 0);

//ADD TICKER

app.ticker.add(gameLoop);

//Making the enemy move on the x-axis
function gameLoop(delta) {
    enemy.x -= speed;
    enemyTwo.x -= speed;
    enemyThree.x -= speed;
    enemyFour.x -= speed;
    enemyFive.x -= speed;
    enemySix.x -= speed;
    letterA.x -= speed;

    if (rectsIntersect(player, enemyThree)) {
        //add healthbar -
        health = 75;
        healthBar.updateHealth(health);
        //kill the enemy
        enemyThree.tint = 0x630000;
        speed = 0;

        setTimeout(function(){
            speed = 4;
          }, 1000);
        
    }

    if (rectsIntersect(player, letterA)) {
       letterA.width = 1;
       letterA.height = 1;
       app.stage.addChild(letterAShow);
    }
}

//Detect collision on the player and enemy
function rectsIntersect (a, b){
    const aBox = a.getBounds();
    const bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;
}

//HEALTHBAR
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 320;
const height = canvas.height = 50;

let health = 100;
const healthBarWidth = 200;
const healthBarHeight = 30;
const x = width / 2 - healthBarWidth / 2;
const y = height / 2 - healthBarHeight / 2;

const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "green");

const frame = function() {
  context.clearRect(0, 0, width, height);
  healthBar.show(context);
  requestAnimationFrame(frame);
}

frame();



