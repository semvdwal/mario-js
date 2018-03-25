import {Canvas} from "./helpers/Canvas.js";
import {Camera} from "./actors/Camera.js";
import {Level} from "./helpers/Level.js";
import {Mario} from "./entities/Mario.js";
import {Goomba} from "./entities/enemies/Goomba.js";
import {Player} from "./actors/Player.js";
import {Collider} from "./layers/Collider.js";

class Game {

    constructor() {
        this.STATE_INIT = Symbol('init');
        this.STATE_LOADING = Symbol('loading');
        this.STATE_MENU = Symbol('menu');
        this.STATE_RUNNIG = Symbol('running');
        this.STATE_PAUSED = Symbol('paused');
        this.STATE_CONTINUE = Symbol('continue');
        this.STATE_ENDED = Symbol('ended');

        this.camera = undefined;
        this.level = undefined;
        this.player = undefined;

        this.updateTime = 0;
        this.fps = 0;
        this.state = this.STATE_INIT;

        this.updateFrequency = 120;
    }

    start() {
        const me = this;
        Promise.all([
            this.initCanvas(),
            this.initLoading(),
        ]).then(function() {
            me.state = me.STATE_MENU;
        });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.state = this.STATE_PAUSED;
            }
        });

        document.addEventListener("click", () => {
            if (this.state === this.STATE_PAUSED) this.state = this.STATE_RUNNIG;
        });
    }

    initCanvas() {
        this.canvas = new Canvas(Camera.instance());
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

            Mario.load().then(mario => {
                this.level.addEntity(mario);

                this.player = new Player();
                this.player.setEntity(mario);

                this.camera = Camera.instance();
                this.camera.setEntity(mario);

                this.state = this.STATE_RUNNIG;
            });

            Goomba.load(150, 10, -1).then(goomba => {
                this.level.addEntity(goomba);
            });

            Goomba.load(400, 10, -1).then(goomba => {
                this.level.addEntity(goomba);
            });

            this.continueLoop();
        });

    }

    continueLoop() {
        // window.setTimeout(() => {
        //     window.requestAnimationFrame((totalTime) => this.gameLoop(totalTime));
        // }, 100);
        window.requestAnimationFrame((totalTime) => this.gameLoop(totalTime));
    }

    gameLoop(totalTime) {

        let elapsedTime = totalTime - this.updateTime;


        this.fps = Math.round(1000 / elapsedTime);

        switch(this.state) {
            case this.STATE_RUNNIG:
                let updateCount = Math.floor(elapsedTime / (1000 / 60));
                // updateCount = 1;
                let frameTime = (elapsedTime / updateCount);
                // frameTime = 1000 / 60;

                for (let i = 0; i < updateCount; i++) {
                    this.level.update(frameTime);
                }

                this.level.draw(this.camera, totalTime);

                // Respawn player
                if (!this.player.controlledEntity.alive) {
                    this.level.removeEntity(this.player.controlledEntity);

                    Mario.load().then(mario => {
                        this.level.addEntity(mario);
                        this.player.setEntity(mario);
                        this.camera.setEntity(mario);
                    });
                }
                break;
            case this.STATE_PAUSED:
                this.level.draw(this.camera, 0);

                this.canvas.drawOverlay();
                this.canvas.drawText(110, 100, "GAME PAUSED");
                break;
        }

        // Displaying FPS
        this.canvas.context.fillStyle = "#000";
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