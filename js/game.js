let canvas;
let world;
let keyboard = new Keyboard();

/**
 * reloadGame() refreshes the website  
 * in order to restart the game
 */
function reloadGame() {
    location.reload(); // Um Seite neuzuladen, aka Spiel neustarten
}

/**
 * fullscreen() does put the canvas in a stretched
 * fullscreen mode
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    
    enterFullscreen(fullscreen);

    document.getElementById('startscreen').classList.toggle('fs-startscreen'); // Das Gleiche für den Startscreen auch
    document.getElementById('canvas').classList.toggle('fs-canvas'); // Die Funktion, damit wenn ich den Fullscreen beende, der Canvas seine ursprüngliche Größe bekommt. Toggle-Class ist da perfekt, da es die Klasse wie ein boolean hinzufügt und entfernt.
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msrequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } 
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } 
}


/**
 * toggleMute() checks if the BGM is playing
 * if it's playing, it gets muted. If not, it 
 * gets enabled again
 */
// BG-Music :
let bgm = new Audio('audio/sunrise_groove.mp3'); 

function toggleMute() { // Funktion um BGM zu pausieren und mithilfe der anderen JS-Dateien alle Sounds stummzuschalten
    return bgm.paused ? bgm.play() : bgm.pause(); // Wenn BGM pausiert ist, soll BGM spielen. Spielt es schon ab, dann soll die Funktion BGM pausieren
}


/**
 * focusAndBlurButton() removes the focus from
 * a button you clicked recntly with a mouse,
 * in order to not disturb you gaming experience
 * with the keyboard, so it doesn't block your sound or
 * fullscreen while playing
 */
// Um den Fokus von einem angeklickten Button zu entfernen, nach onclick // Note: habe ich gbraucht, damit die User experience nicht leidet wegen Musik/Fullscreen anklicken
function focusAndBlurButton() {
    const fsBtn = document.getElementById("fs-button");
    const musicBtn = document.getElementById('music-btn-focus');
  
    fsBtn.focus();
    musicBtn.focus();
  
    // The button will lose focus after 3 seconds
    setTimeout(() => {
      fsBtn.blur();
      musicBtn.blur();
    }, 100);
  }