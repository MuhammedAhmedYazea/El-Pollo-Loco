class Character extends MovableObject{
    height = 250;
    y = 80;
    speed = 10; // Speed des Characters beim Laufen

    offset = { // Für mehr Genauigkeit bei Kollisionen mit dem Charakter
        top: 145,
        left: 50,
        right: 50,
        bottom: 30
    };

    characterDead = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

   
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * characterWalking() lets the character walk
     * if the right or left key gets pressed, the function for
     * moving the character + or - x 
     * and the direction of the image
     * while walking, a sound plays.
     * 
     * if character is located in x=0, he can't walk further 
     * 
     * if character is not above ground and clicks space, he will jump,
     * make a jump sound, and after going up, he will jump down.
     * While walking, the camera will move with the character
     */
    characterWalking() {
        setInterval(() => {  //Um Links und Rechts zu Laufen und zu Springen
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (bgm.paused === false) {
                this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (bgm.paused === false) {
                this.walking_sound.play();
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Wenn wir SPACE drücken und der Charakter NICHT oben in der Luft ist, springen wir // Damit wir nur 1 Mal springen und nicht wie Flappy Bird die ganze Zeit springn
                this.jump(); // Die eigentliche Funktion, wodurch der Chara "runterspringt", also schlicht sich um SpeedY 30 nach unten fällt
                if (bgm.paused === false) {
                this.jumping_sound.play();
                }
            }
            this.world.camera_x = -this.x + 100; //Plus 100 ist da, damit Kamera immer neben den Chara läuft
        }, 1000 / 60);
    }


    /**
     * characterAnimations() sets certain animations
     * for conditions. Like for death of a chara, the death 
     * animation. The hurt animation, the jumping and walking
     * animation
     */
    characterAnimations() {
        setInterval( () => {
            if (this.isDead()) {
                // Death animation
                this.playAnimation(this.IMAGES_DEAD);
                this.characterDead = true; // Hier für wäre auch ein 2 Sec Timeout gut
            }   else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
                else if (this.isAboveGround()) { // Wenn der Chara oben in der Luft schwebt, soll er Sprung-Animation machen
                this.playAnimation(this.IMAGES_JUMPING); // Jump Animation
            }   else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);  // Walk Animation
                }
            } 
        }, 50); 
    }

    /**
     * characterIdle() checks if no keyboard key was clicked
     * for a certain time, meanwhile being idle, 
     * the character shows a sleeping animation.
     * It only occurs if no keys are pressed.
     */
    characterIdle() {
        setInterval( () => { // Wenn Spieler 0,7 Sec nicht spielt, schläft der Chara
            if (this.isIdle()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1100);
    }


    /**
     * animate() runs these 3 functions above which
     * mainly consist of animating the character
     */
    animate() {
        this.characterWalking(); //Um Links und Rechts zu Laufen und zu Springen
        this.characterAnimations(); // Death animation, if dead. Hurt animation, if hurt. Walk/Jump Animation, if pressing L, R or SPACE
        this.characterIdle(); // Animation, wenn Charakter idle ist, also 0.7 sec die Tasten nicht berührt
    }
}