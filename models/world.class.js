class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss[0];
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    salsaBar = new SalsaBar();
    coins = level1.coins;
    salsa = level1.salsa;
    throwableObject = [];
    coinAmount = 0;
    salsaAmount = 0;
    coin_collect_sound = new Audio('audio/collectcoin.mp3');
    chicken_hit_sound = new Audio('audio/chicken.mp3');
    gameoverScreen = level1.gameoverScreen;
    youlostScreen = level1.youlostScreen;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        
        
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * run() runs 2 functions which check if 
     * character, enemies, endboss and objects collide and 
     * what will happen next.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100); // Vielleicht später zurück auf 100, 200 oder 500 Ms einstellen. Denn 1000 / 60 war unpassend, da dann 4 Salsa Bottles flogen...
    }

    /**
     * checkThrowObjects() checks that if D on the keyboard is clicked,
     * while the Salsa Sauce counter is over 1, if that's true,
     * the salsa sauce throwable object gets thrown from the character 
     * and the salsa sauce counter get's subtracted by 1
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.salsaAmount > 0) { // Wenn man D drückt und mind. 1 Salsa-Bottle hat, dann wird der if-Teil ausgeführt
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100); // Salsa wird vom Character aus geworfen
            this.throwableObject.push(bottle); // Salsa wird geworfen
            this.salsaAmount--; // Beim Werfen wird der Salsa Counter oben links subtrahiert, bis der Wert 0 erreicht
        } // Evtl. Collision Salsa mit Chicken => Chicken kill : else if (this.throwableObject.isColliding(enemy)) {enemy.chickenKill = true;}
        
    }


    /**
     * checkCollisionsEnemyCharacter() checks that if the 
     * character is colliding with an enemy AND the character is above ground
     * AND BUT also the speedY (jumping speed is negative, below 0)
     * that sets the enemy to be killed in form of a jump on it.
     * Else, if that above condition is not true, then
     * the character gets hit (showing specific animations) 
     * and the status bar percentages gets updates (here substracted)
     * @param {object} enemy This is the affected enemy
     */
    checkCollisionsEnemyCharacter(enemy) { // Wenn Charakter mit Chicken kollidiert
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) { // Wenn Charakter mit enemy kollidiert & der Character springt auf den Enemy, dann stirbt der Enemy (führt Todesanimation aus) characterf.speed < 0, damit man Chicken nur von oben tötet und nicht von unten 
            enemy.chickenKill = true;

        }  else if(this.character.isColliding(enemy) && enemy.chickenKill === false) { // Wenn Character mit Enemy kollidiert & die obere Bedingung false ist, also das Chicken nicht stirbt, NUR ERST dann verliert der Character leben
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        } 
    }

    /**
     * checkCollisionsBossCharacter() checkf if the character
     * is colliding with the endboss. If that's true, the
     * character gets hit (showing these sepcific animations)
     * and the status bar percentages gets updates (here subtracted)
     * @param {object} endboss This is the one affected endboss
     */
    checkCollisionsBossCharacter(endboss) { // Wenn Charakter mit Endboss kollidiert
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * checkCollisionsEndboss() is overall for all collisions with
     * the endboss. It therefore runs the previosu function above, if
     * character collides with the endboss. Afterwards it checks if a
     * throwable Object (bottle) collides with endboss. If taht's true,
     * the endboss get's hurt, bottle splashes and endboss animates and sounds
     * that he is hurt, and the health gets subtracted, else (if collision with bottle stops),
     * the endboss is not hurt anymore, so in order he walks normally again
     */
    checkCollisionsEndboss() {
         // Check collisions Endboss
         this.checkCollisionsBossCharacter(this.endboss);
         this.throwableObject.forEach((bottle) => { // Hier braucht man forEach, da hier nicht ein einziger Charakter kollidiert, sondern mehrere Salsas mit den Endboss kollidieren können
             if (bottle.isColliding(this.endboss)) { // Prüfe Kollision gegen t Objekt mit endboss Objekt
                 this.endboss.endbossHurt = true;
                 bottle.bottleSplash = true;
                 if (bgm.paused === false) {
                 this.chicken_hit_sound.play();
                 }
                 this.endboss.endbossHealth--;
             } else {
                 this.endboss.endbossHurt = false; // Damit nach dem Treffen des Endbosses, die Hurt Animation aufhört, statt endlos weiter zu laufen
             }
         });
    }


    /**
     * checkEnemyCollisions checks in overall the enemy/chicken
     * collisions with a bottle or character. The first part of the function runs
     * the function way above called "checkCollisionsEnemyCharacter"
     * The next part checks if a throwable Object collides with the enemy.
     * If that's true, bottle splash is true and the chicken gets killed
     */
    checkEnemyCollisions() {
        // Check collision enemy/chicken
        this.level.enemies.forEach((enemy) => {
            this.checkCollisionsEnemyCharacter(enemy); // Wenn Charakter mit Chicken kollidiert (oben ausgelagert)
            this.throwableObject.forEach((bottle) => { // Hier braucht man forEach, da hier nicht ein einziger Charakter kollidiert, sondern mehrere Salsas mit den Enemies kollidieren können
                // TODO: Prüfe Kollision gegen t Objekt mit enemy Objekt
                if (bottle.isColliding(enemy)) {
                    enemy.chickenKill = true;
                    bottle.bottleSplash = true;
                }
            });
         });
    }

    /**
     * checkCollisionsCoins() checks if the character
     * collides with the coins. If that's true,
     * the selected coin will be removed from the canvas,
     * a short collecting sound will be played,
     * and the coins amount in the counter get's added by 1
     */
    checkCollisionsCoins() {
        // Check collision coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                if (bgm.paused === false) {
                this.coin_collect_sound.play();
                }
                this.coinAmount++;
            }
         });
    }


    /**
     * checkCollisionsSalsa() checks if the character
     * collides with the salsa. If that's true,
     * the selected salsa will be removed from the canvas,
     * and the salsa amount in the counter get's added by 1
     */
    checkCollisionsSalsa() {
        // Check collision salsa
        this.level.salsa.forEach((sals, index) => {
            if (this.character.isColliding(sals)) {
                this.level.salsa.splice(index, 1);
                this.salsaAmount++;
            }
         });
    }

    checkCollisions() { // Kollektion der Kollisionen
        this.checkCollisionsEndboss(); // Check collisions Endboss
        this.checkEnemyCollisions(); // Check collision enemy/chicken
        this.checkCollisionsCoins(); // Check collision coins
         this.checkCollisionsSalsa(); // Check collision salsa
    }

    /**
     * collection of what will be shown inside the canvas
     */
    draw() { 

        if (this.character.characterDead) {
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears canvas
            this.reloadBtnEnabler(); // Wenn Charakter stirbt und You Lost kommt, soll der Reload button angezeigt werden
            this.addObjectsToMap(this.level.backgroundObjects); // adds objects to map/canvas
            this.addObjectsToMap(this.level.youlostScreen);
        } else if (this.endboss.endbossDead) {
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears canvas
            this.reloadBtnEnabler(); // Wenn Boss stirbt und Game Over kommt, soll der Reload button angezeigt werden
            //this.ctx.translate(this.camera_x, 0); Was ein Wunder. Nur diese Zeile sollte verschwinden und plötzlich funktioniert der GameOver Screen!
            this.addObjectsToMap(this.level.backgroundObjects); // adds objects to map/canvas
            this.addObjectsToMap(this.level.gameoverScreen);
        } else if (!this.endboss.endbossDead) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears canvas
            

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); // adds objects to map/canvas

        this.addObjectsToMap(this.level.clouds); // Hierher verschoben, damit die Wolken nicht die Statusbars behindern
        this.ctx.translate(-this.camera_x, 0); // Rückwärts
        // Space for fixed Objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.salsaBar);
        this.ctx.translate(this.camera_x, 0); // Vorwärts


        this.addToMap(this.character); 
        //this.addObjectsToMap(this.level.clouds); // Brauche ich nicht mehr, da ich es nach oben verschoben habe
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss); // Hab ich jetzt neu hinzugefügt. Hoffe es passt. Edit: Scheint zu passen.
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.throwableObject);
        
        this.ctx.translate(-this.camera_x, 0);

        
        this.ctx.font = "32px sans-serif"; // Die Zahl 0 für Coin
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.coinAmount,110,75);


        this.ctx.font = "32px sans-serif"; // Die Zahl 0 für Salsa
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.salsaAmount,110,115);



        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        }); } // das blaue vom else
    }

    /**
     * adds these objects to the canvas
     * @param {object} objects like clouds, background, chara, enemies etc...
     */
    addObjectsToMap(objects) { 
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) { //Objekt-Spiegelung (z.B. für Chara)
            this.flipImage(mo);
        }
        mo.draw(this.ctx); //Ansonsten normale Template zum Hinzufügen von Objekten zum canvas/der Map
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * If character walks in another x side
     * the object/character gets mirrored to a different side
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * ... and here if the character goes back to
     * the other side, the image gets flipped back
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); //Rückgängig machen der Objekt-Spiegelung
    }


    /**
     * If the game ends either by losing or winning, 
     * the reload button for refreshing the website, e.g. 
     * restarting the game appears, by changing the CSS style for that
     * object from display: none; to display: block;
     */
    reloadBtnEnabler() { // Damit wenn das Spiel zuende ist, der Reload Button zum Neuladen der Seite angezeigt wird
        document.getElementById('reload-div').style.display = 'block';
    }
}