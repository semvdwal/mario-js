import {Layer} from './Layer.js';
import {Collider} from "./Collider.js";
import {Block} from "../entities/Block.js";

export class Background extends Layer {

    constructor(data, spritesheet) {
        super();
        this.tiles = data;
        this.sprites = spritesheet;

        this.addColliders();
    }

    addColliders() {
        let collider = Collider.instance();
        this.tiles.forEach(tile => {
            if (tile.type == "solid") {
                for (let x = tile.range[0]; x < tile.range[2]; x++) {
                    for (let y = tile.range[1]; y < tile.range[3]; y++) {
                        collider.addCollider(
                            new Block(x * 16, y * 16, 16, 16, tile.name)
                        );
                    }
                }
            }
        });
    }

    draw(canvas, camera, deltaTime) {
        this.tiles.forEach(tile => {
            let img = this.sprites.anim(tile.name, deltaTime);
            for (let x = tile.range[0]; x < tile.range[2]; x++) {
                for (let y = tile.range[1]; y < tile.range[3]; y++) {
                    canvas.draw(img, {"x": x * 16,  "y": y * 16});
                }
            }
        });
    }

}