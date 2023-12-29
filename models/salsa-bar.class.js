class SalsaBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png',
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImage(this.IMAGES);
        this.x = 40; 
        this.y = 76; // Mit x und y die Positionen der Objekte im Canvas verändern
        this.width = 50; // Mit width und height die Größe und Breite der Objekte im Canvas verändern
        this.height = 50;
    }

}