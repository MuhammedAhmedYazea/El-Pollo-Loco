class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects; 
    coins;
    salsa;
    gameoverScreen;
    youlostScreen;
    level_end_x = 2200;
    
  

    constructor(enemies, endboss, clouds, backgroundObjects, coins, salsa, gameoverScreen, youlostScreen) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsa = salsa;
        this.gameoverScreen = gameoverScreen;
        this.youlostScreen = youlostScreen;
    }
}