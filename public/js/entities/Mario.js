import {SpriteSheet} from "../helpers/SpriteSheet.js";
import {Player} from "./Player.js";
import {Gravity} from "../traits/Gravity.js";
import {Walk} from "../traits/Walk.js";
import {Jump} from "../traits/Jump.js";
import {Collider} from "../layers/Collider.js";
import {Move} from "../traits/Move.js";

export class Mario extends Player {

    constructor(sprites) {
        super("Mario");
        this.sprites = sprites;

        this.addTrait(new Gravity());
        this.addTrait(new Jump());
        this.addTrait(new Walk());

        this.addTrait(new Move());

        this.position.x = 10;
        this.position.y = 10;

        this.player = true;

        Collider.instance().addEntity(this);
    }

    static load() {
        return new Promise(resolve => {
            SpriteSheet.load("characters").then(([name, img, tileset]) => {
                let sprites = new SpriteSheet(name, img, tileset);
                sprites.selectTileset("mario");
                resolve(new Mario(sprites));
            });
        });
    }

    render(canvas, deltaTime) {

        if (this.jump.isJumping || this.gravity.isFalling) {
            if(this.walk.heading === -1) {
                canvas.draw(this.sprites.get("jump-reverse"), this.position);
            } else {
                canvas.draw(this.sprites.get("jump"), this.position);
            }
        } else if (this.velocity.x !== 0) {
            if (this.walk.direction !== 0 && Math.sign(this.velocity.x) !== this.walk.direction) {
                if (this.walk.heading === -1) {
                    canvas.draw(this.sprites.get("brake-reverse"), this.position);
                } else {
                    canvas.draw(this.sprites.get("brake"), this.position);
                }
            } else {
                if (this.walk.heading === -1) {
                    canvas.draw(this.sprites.anim("walk-reverse", deltaTime, Math.abs(this.velocity.x)), this.position);
                } else {
                    canvas.draw(this.sprites.anim("walk", deltaTime, Math.abs(this.velocity.x)), this.position);
                }
            }
        } else {
            if(this.walk.heading === -1) {
                canvas.draw(this.sprites.get("stand-reverse"), this.position);
            } else {
                canvas.draw(this.sprites.get("stand"), this.position);
            }
        }

    }


}