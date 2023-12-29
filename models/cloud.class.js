class Cloud extends MovableObject {
    y = 20; // Da diese Koordinanten statisch sind, dürfen sie auch hier sein und nicht unbedingt beim constructor
    width = 500;
    height = 250;
    

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 500; // "this.x = 200" legt erstmal fest, dass die Start-Position/Koordinate der Chicks bei x=200 ist. Das Math.random mit Plus, legt irgendeine Random Zahl fest plus 200, wo die Chicken starten, und das mal 500 hier.Also von 200 bis 700. Jedes bekommt eine verschiedene, zufällige Position. edit: 
    this.animate();
    }

    /**
     * animate() displays the cloud and it moves left
     */
    animate() { 
        // Mit dieser Funktion werden die Wolken/Objekte animiert, das heißt die bewegen sich von der Ausgangsposition nach links, wie man unten sehen kann
        setInterval( () => { // Mit der setInterval() Funktion kann man in einem angegeben Zeitintervall eine Handlung vornehmen, die alle, in diesem Fall 1000 Millisec. ausgeführt wird.
            this.moveLeft(); // Jede Sekunde, jeder Frame, in diesem Fall 60, werden pro sekunde 60 Mal die Handlung ausgeführt, also die x-Koordinate der Wolken um 0.15 nach links verschoben wegen dem Minus.
        }, 1000 / 60); // Pro Sekunde, also 1000 Ms, werden 60 Bilder angezeigt hier, also 60 fps
    }
}