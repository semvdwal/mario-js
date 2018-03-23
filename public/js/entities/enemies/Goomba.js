import {Entity} from "../Entity.js";
import {Gravity} from "../../traits/Gravity.js";
import {Move} from "../../traits/Move.js";
import {Collider} from "../../layers/Collider.js";
import {SpriteSheet} from "../../helpers/SpriteSheet.js";
import PendulumWalk from "../../traits/ai/PendulumWalk.js";
import {JumpKillable} from "../../traits/ai/JumpKillable.js";

export class Goomba extends Entity {

    constructor(sprites, x, y, direction) {
        super("Goomba");
        this.sprites = sprites;
        this.position.x = x;
        this.position.y = y;

        this.defeatDelay = 250;
        this.enemy = true;

        this.addTrait(new Gravity());
        this.addTrait(new PendulumWalk(direction));
        this.addTrait(new JumpKillable());
        this.addTrait(new Move());

        Collider.instance().addEntity(this);
    }

    static load(x, y, direction) {
        return new Promise(resolve => {
            SpriteSheet.load("characters").then(([name, img, tileset]) => {
                let sprites = new SpriteSheet(name, img, tileset);
                sprites.selectTileset("goomba");
                resolve(new Goomba(sprites, x, y, direction));
            });
        });
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.defeated) {
            this.defeatedTime += deltaTime;
            if (this.defeatedTime >= this.defeatDelay) {
                this.alive = false;
            }
        }
    }

    render(canvas, deltaTime) {
        if (this.defeated) {
            canvas.draw(this.sprites.get("defeat"), this.position);
        } else {
            canvas.draw(this.sprites.anim("walk", deltaTime), this.position);
        }
    }

}