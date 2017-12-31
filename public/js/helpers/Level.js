import {SpriteSheet} from "./SpriteSheet.js";
import {Background} from "../layers/Background.js";
import {Collider} from "../layers/Collider.js";

export class Level {

    constructor(name, canvas, sprites, layers) {
        this.name = name;
        this.canvas = canvas;
        this.sprites = sprites;
        this.layers = layers;
    }

    static load(name, canvas) {

        return new Promise(resolve => {
            fetch("../resources/levels/" + name + ".json").then(data => {
                data.json().then(levelData => {
                    SpriteSheet.load("tiles").then(sprites => {
                        sprites.selectTileset(levelData.tileSet);
                        let layers = [];
                        if (levelData.layers.hasOwnProperty("background")) {
                            layers.push(new Background(
                                levelData.layers.background,
                                sprites
                            ));
                        }
                        layers.push(Collider.instance());
                        resolve(new Level(name,  canvas, sprites, layers));
                    });
                });
            });
        });

    }

    update(deltaTime) {
        this.layers.forEach(layer => layer.update());
    }

    draw(camera, deltaTime) {
        this.layers.forEach(layer => layer.draw(this.canvas, camera, deltaTime));
    }

}