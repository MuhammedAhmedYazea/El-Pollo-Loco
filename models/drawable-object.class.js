class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // identisch mit this.img = document.getEleemntbyId('image') <img id="image" src> 
        this.img.src = path;
    }

    draw(ctx) { try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); //Ansonsten normale Template zum Hinzufügen von Objekten zum canvas/der Map
        } catch(e) {}
    }

    drawFrame(ctx) { // Da ich die 3 Zeilen da unten ausgeblendet habe, sieht man endlich die blauen Rechtecke nicht mehr
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            //ctx.lineWidth = '5';
            //ctx.strokeStyle = 'blue';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } 
    } 

    //  @param {Array} arr

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }
}