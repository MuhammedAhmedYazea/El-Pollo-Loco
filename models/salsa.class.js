class Salsa extends MovableObject {
    height = 70; // Salsa kleiner gemacht
    width = 80;
    
    /**
     * constructor() and super().loadImage():
     * Since the Salsa Bottle is just a static and not dynamic image, there's no need
     * for an animation. the super().loadImage() just displays that bottles on random choosen positions
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        

        this.y = 200 + Math.random() * 100;
        this.x = 200 + Math.random() * 2000; // "this.x = 200" legt erstmal fest, dass die Start-Position/Koordinate der Chicks bei x=200 ist. Das Math.random mit Plus, legt irgendeine Random Zahl fest plus 200, wo die Chicken starten, und das mal 500 hier.Also von 200 bis 700. Jedes bekommt eine verschiedene, zufällige Position.
        //this.speed = 0.15 + Math.random() * 0.25; // Random Speed für alle Chickens unterschiedlich //Salsa ist auch immobil...Deswegen wurde das auskommentiert
        
        
    }

    

}