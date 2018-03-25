import {SpriteSheet} from "./SpriteSheet.js";
import {Background} from "../layers/Background.js";
import {Collider} from "../layers/Collider.js";

export class Level {

    constructor(name, canvas, sprites, layers) {
        this.name = name;
        this.canvas = canvas;
        this.sprites = sprites;
        this.layers = layers;

        this.entities = [];
    }

    static load(name, canvas) {

        return new Promise(resolve => {
            fetch("../resources/levels/" + name + ".json").then(data => {
                data.json().then(levelData => {
                    SpriteSheet.load("tiles").then(([name, img, tileset]) => {
                        let sprites = new SpriteSheet(name, img, tileset);
                        sprites.selectTileset(levelData.tileSet);
                        let layers = [];
                        if (levelData.layers.hasOwnProperty("background")) {
                            layers.push(new Background(
                                levelData.layers.background,
                                sprites
                            ));
                        }
                        layers.push(Collider.instance());
                        Level._instance = new Level(name,  canvas, sprites, layers);
                        resolve(Level._instance);
                    });
                });
            });
        });

    }

    static instance() {
        return Level._instance;
    }

    update(deltaTime) {
        this.layers.forEach(layer => layer.update());

        this.entities.forEach(entity => entity.update(deltaTime));

        this.entities.forEach(entity => {
            if (!entity.alive) {
                Collider.instance().removeEntity(entity);
                this.entities.splice(this.entities.indexOf(entity), 1);
            }
        });
    }

    draw(camera, deltaTime) {
        camera.update(deltaTime);
        this.layers.forEach(layer => layer.draw(this.canvas, camera, deltaTime));
        this.entities.forEach(entity => entity.render(this.canvas, deltaTime));
    }

    addEntity(entity) {
        if(this.entities.indexOf(entity) === -1)
            this.entities.push(entity);
    }

    removeEntity(entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }

}