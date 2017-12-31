export class Sound {

    constructor() {
        this.sounds = {};
        this.enabled = false;
    }

    static instance() {
        if (!Sound._instance) Sound._instance = new Sound();
        return Sound._instance;
    }

    effect(name) {
        if (this.enabled) {
            if (!this.sounds.hasOwnProperty(name)) {
                this.sounds[name] = new Audio("/resources/sounds/" + name + ".wav");
            }
            this.sounds[name].load();
            this.sounds[name].play();
        }
    }

    music(name) {
        if (this.enabled) {
            if (!this.sounds.hasOwnProperty(name)) {
                this.sounds[name] = new Audio("/resources/music/" + name + ".mp3");
            }
            this.sounds[name].play();
        }
    }

}