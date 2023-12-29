class Endboss extends MovableObject {

    height = 400; //400
    width = 250; //250 
    y = 55; //55

    endbossHurt = false;
    endbossHealth = 30;
    endbossDead = false; 

    world;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_GAME_OVER = [
        'img/9_intro_outro_screens/game_over/game over.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_GAME_OVER);
        this.x = 2100;
        this.animate();
        this.deadEndboss();
    }
    


    /**
     * animate() animates a hurt endboss, if he collides
     * with a bottle and if he dies, he stops walking left
     * 
     * if the character reaches a certain x part on the map,
     * the endboss starts walking left. If nothing applies to him,
     * he just shows an alert animation
     */
    animate() {
        setInterval(() => {
            //if (this.endbossDead) {this.playAnimation(this.IMAGES_GAME_OVER);}
             if (this.endbossHurt && this.endbossHealth > 1) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.endbossHurt && this.endbossHealth <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.moveLeft();
                this.speed = 0;
                this.endbossDead = true; // Da sollte ich ein Timeout setzen, wann (nach 2 Sec soll das auf true gesetzt werden) für folgende Zeile auch:
            
            } else if (world?.character.x > 1550) { // Bei if noch hinzufügen endbossDead = false; Prüfen wir noch ob ich das so mache..
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
                this.speed = 22;
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        },200); 

        /*setInterval(() => {
            if (this.endbossDead) {
                this.playAnimation(this.IMAGES_GAME_OVER); // Vorübergehend lasse ich das so
            }
        }); */
    }

    deadEndboss() {
        this.playAnimation(this.IMAGES_GAME_OVER);
    }
}