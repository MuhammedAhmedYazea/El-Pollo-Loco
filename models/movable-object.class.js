class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; // Wie schnell unser Objekt nach unten fällt
    acceleration = 2.5; // Wie schnell unser Objekt beschleunigt wird
    energy = 100;
    lastHit = 0;
    offset = { // braucht man für die genauere Collision Function
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * applyGravity() checks if an object is above ground and the
     * speed of that y over 0. If that's true, that speed y will turn
     * negative. The acceleration goes down and the object too.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * isAboveGround consists of 2 parts,
     * first part of the function orders that a thrown bottle will always fall
     * completely, while everything else, e.g. the character falls until the ground floor
     * @returns in this part, when the character and everything else falls
     * it stops falling in y<180, so the character can wark normal on the floor
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable object should always fall
            return true;
        } else {
       return this.y < 180;
        }
    }


    /**
     * isColliding() checks if objects are colliding with each other
     * @param {object} mo is any object like character, enemy, endboss, coin, salsa
     * @returns precise offsets of these objects, in order to 
     * determine when a collision is counted as a collision, by "touching"
     * where. 
     */
     // Bessere Formel zur Kollisionsberechnung (Genauer) Character & Chicken
     isColliding(mo) {
        return  this.x +this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * hit() subtracts the energy of the character,
     * until 0
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden 
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 1;
    }

    /**
     * If the energy level of the
     * character falls to 0, the isDead() function checks that
     * and can run chosen animation. isDead() is like an ambassador, taking the content from
     * movable-object.class.js what we have in return. Why do we do this instead of just writing energy=0?
     * Because isDead() is a more clean code approach, you directly get what it means
     * @returns just a function block to be displayed in character.class.js
     */
    isDead() { 
        return this.energy == 0;
    }

    /**
     * playAnimation() replays the images in a path in a loop
     * @param {images} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; % aka "Modulo" ist der mathematische Rest // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1...wiederholt die Bilder
                let path = images[i]; // Dank des i hier, werden die Bilder tatsächlich wiederholt
                this.img = this.imageCache[path]; 
                this.currentImage++;
    }

    /**
     * moveRight(), if that function is called, then the code below gets executed.
     * So if someone demands the character to moveRight, the code below sets a positive x speed 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * moveLeft(), if that function is called, then the code below gets executed.
     * So if someone demands the character to moveLeft, the code below sets a negative x speed 
     */
    moveLeft() {
            this.x -= this.speed; // Jede Sekunde, jeder Frame, in diesem Fall 60, werden pro sekunde 60 Mal die Handlung ausgeführt, also die x-Koordinate der Wolken um 0.15 nach links verschoben wegen dem Minus.
    }

    /**
     * jump() sets the peak height for jumping
     */
    jump() {
        this.speedY = 23; // Sprunghöhe festlegen damit vom Charakter, 30 ursprünglich
    }

    /**
     * isIdle() just returns to a function in character.class.js, that no keys are currently pressed
     * @returns if no keys are pressed, the other idle function in character.class.js gets run after 1 sec
     */
    isIdle() {
        return this.world.keyboard.RIGHT == false & this.world.keyboard.LEFT == false & this.world.keyboard.SPACE == false & this.world.keyboard.D == false;
    }
}