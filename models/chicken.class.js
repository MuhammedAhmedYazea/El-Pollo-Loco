class Chicken extends MovableObject {
    height = 70; // Chicken kleiner gemacht
    width = 80;
    y = 360; // Position nach unten
    chickenKill = false;

    chicken_sound = new Audio('audio/chick.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_KILLED = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_KILLED);

        this.x = 350 + Math.random() * 500; // "this.x = 200" legt erstmal fest, dass die Start-Position/Koordinate der Chicks bei x=200 ist. Das Math.random mit Plus, legt irgendeine Random Zahl fest plus 200, wo die Chicken starten, und das mal 500 hier.Also von 200 bis 700. Jedes bekommt eine verschiedene, zufällige Position.
        this.speed = 1.15 + Math.random() * 0.25; // Random Speed für alle Chickens unterschiedlich
        
        this.animate();
    }

    /**
     * animate() in the first part sets
     * that the sound of the chicken plays, if
     * they're not dead.
     * If a chicken gets killed, the speed changes to 0,
     * so the chicken stop walking and a death image gets displayed
     */
    animate() {
        setInterval( () => { 
            if (!this.chickenKill) {
                if (bgm.paused === false) {
                this.chicken_sound.play();
                }
            }
        }, 6000); 

        setInterval( () => {
            if (this.chickenKill) { // Wenn Chicken getötet werden wahr ist, dann wird das Bild dazu angezeigt und der walking-Speed auf 0 gesetzt (stop)
                this.playAnimation(this.IMAGES_KILLED);
                this.speed = 0;
            } else {                 // Ansonsten bewegen sich die Chicken normal nach links weiter mit ihrer walking-Animation
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200); 
    }

}

// Für kleine/gelbe Chicken

class ChickenSmall extends MovableObject {
    height = 70; // Chicken kleiner gemacht
    width = 80;
    y = 360; // Position nach unten
    chickenKill = false;

    chicken_sound = new Audio('audio/chick.mp3');

    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_KILLED_SMALL = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_KILLED_SMALL);

        this.x = 400 + Math.random() * 500; // "this.x = 200" legt erstmal fest, dass die Start-Position/Koordinate der Chicks bei x=200 ist. Das Math.random mit Plus, legt irgendeine Random Zahl fest plus 200, wo die Chicken starten, und das mal 500 hier.Also von 200 bis 700. Jedes bekommt eine verschiedene, zufällige Position.
        this.speed = 2.15 + Math.random() * 0.25; // Random Speed für alle Chickens unterschiedlich Note extra: Ich habe gelbe Chicken 2x so schnell gemacht wie braune Chicken
        
        this.animate();
    }

    /**
     * animate() in the first part sets
     * that the sound of the chicken plays, if
     * they're not dead.
     * If a chicken gets killed, the speed changes to 0,
     * so the chicken stop walking and a death image gets displayed
     */
    animate() {
        setInterval( () => { 
            if (!this.chickenKill) { // Die Chicken Geräusche, die spielen, wenn sie leben
                if (bgm.paused === false) {
                this.chicken_sound.play();
                }
            }
        }, 6000); 

        setInterval( () => {
            if (this.chickenKill) {
                this.playAnimation(this.IMAGES_KILLED_SMALL);
                this.speed = 0;
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING_SMALL);
            }
        }, 200); 
    }

}