class YouLost extends MovableObject {

    width = 720;
    height = 480;
    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/you lost.png');
        this.x = 720 - this.width;
        this.y = 480 - this.height;
    }
}