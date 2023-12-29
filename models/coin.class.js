class Coin extends MovableObject {
    height = 70; // Chicken kleiner gemacht
    width = 80;
    speed = 0; // Wegen MovableObject Damit Münzen sich nicht unnötig bewegen
    // y = 360; // Position nach unten
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.y = 200 + Math.random() * 100; // Damit lege ich fest, wo von oben nach unten die Münzen sind
        this.x = 200 + Math.random() * 2000; // "this.x = 200" legt erstmal fest, dass die Start-Position/Koordinate der Chicks bei x=200 ist. Das Math.random mit Plus, legt irgendeine Random Zahl fest plus 200, wo die Chicken starten, und das mal 500 hier.Also von 200 bis 700. Jedes bekommt eine verschiedene, zufällige Position.
        //this.speed = 0.15 + Math.random() * 0.25; // Random Speed für alle Chickens unterschiedlich //Brauch ich für die Coins nicht
        
        this.animate();
    }

    /**
     * Different tahn the salsa class, the coins need that animation() function
     * because they change dynamic and have 2 pictures. 
     */
    animate() {
        setInterval( () => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 200); 
    }

}