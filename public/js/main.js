import {Canvas} from "./helpers/Canvas.js";
import {Camera} from "./actors/Camera.js";
import {Level} from "./helpers/Level.js";
import {Mario} from "./entities/Mario.js";
import {Player} from "./actors/Player.js";

class Game {

    constructor() {
        this.STATE_INIT = Symbol('init');
        this.STATE_LOADING = Symbol('loading');
        this.STATE_MENU = Symbol('menu');
        this.STATE_RUNNIG = Symbol('running');
        this.STATE_PAUSED = Symbol('paused');
        this.STATE_CONTINUE = Symbol('continue');
        this.STATE_ENDED = Symbol('ended');

        this.actors = [];
        this.entities = [];
        this.camera = new Camera();

        this.updateTime = 0;
        this.fps = 0;
        this.state = this.STATE_INIT;

        this.updateFrequency = 60;
    }

    start() {
        const me = this;
        Promise.all([
            this.initCanvas(),
            this.initLoading(),
        ]).then(function() {
            me.state = me.STATE_MENU;
        });
    }

    initCanvas() {
        this.canvas = new Canvas();
    }

    initLoading() {

        this.loadLevel();
        this.initMenu();

    }

    initMenu() {

    }

    loadLevel() {

        Level.load("1-1", this.canvas).then(level => {
            this.level = level;
            this.continueLoop();
        });

        Mario.load().then(mario => {
            this.entities.push(mario);
            this.player = new Player();
            this.player.setEntity(mario);
        });

    }

    continueLoop() {
        window.requestAnimationFrame((totalTime) => this.gameLoop(totalTime));
    }

    gameLoop(totalTime) {

        let elapsedTime = totalTime - this.updateTime;


        this.fps = Math.round(1000 / elapsedTime);

        let updateCount = Math.floor(elapsedTime / (1000/60));
        updateCount = 1;
        let frameTime = (elapsedTime / updateCount);

        for (let i = 0; i < updateCount; i++) {
            this.level.update(frameTime);
            this.actors.forEach(actor => actor.update(frameTime));
            this.entities.forEach(entity => entity.update(frameTime));
        }

        this.level.draw(this.camera, totalTime);
        this.entities.forEach(entity => entity.render(this.canvas, totalTime));

        // Displaying FPS
        this.canvas.context.font = "14px Helvetica";
        this.canvas.context.fillText(this.fps, 300, 15);

        this.updateTime = totalTime;

        this.continueLoop();
    }

    pause() {

    }

    end() {

    }

}

const game = new Game();
game.start();