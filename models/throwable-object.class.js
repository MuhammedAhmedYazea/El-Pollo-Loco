class ThrowableObject extends MovableObject {

    bottleSplash = false;

    offset = { // Für mehr Genauigkeit bei Kollisionen mit dem Charakter
        top: 20, //145 war vorher, 20 passt jetzt aber gut, damit das ThrowableObject den Enemy trifft
        left: 50,
        right: 50,
        bottom: 30
    };

    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    throw_bottle_sound = new Audio('audio/bottle.mp3');

    

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',);
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * throw(), when that function is executed
     * the speedY (flying above) is set,
     * the throwing sound gets played
     * and the applyGravity() gets executed.
     * Afterwards, if the bottle splashs after
     * collision with an enemy/endboss,  
     * the animated rotation stops
     */
    throw() {
        this.speedY = 30;
        if (bgm.paused === false) { // Wenn die BGM nicht pausiert/stumm ist, dann soll beim Werfen der Bottle ein Geräusch machen
            this.throw_bottle_sound.play();
        }
       
        this.applyGravity();
        setInterval( () => {
            if (this.bottleSplash) {
                this.playAnimation(this.BOTTLE_SPLASH);
            } else {
            this.playAnimation(this.BOTTLE_ROTATION);
            this.x += 10;
            }
        }, 25);
        
    }

}