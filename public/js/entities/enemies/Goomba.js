import {Gravity} from "../../traits/Gravity.js";
import {Move} from "../../traits/Move.js";
import {Collider} from "../../layers/Collider.js";
import {SpriteSheet} from "../../helpers/SpriteSheet.js";
import PendulumWalk from "../../traits/ai/PendulumWalk.js";
import {JumpKillable} from "../../traits/ai/JumpKillable.js";
import {Enemy} from "../Enemy.js";
import {Level} from "../../helpers/Level.js";

export class Goomba extends Enemy {

    constructor(sprites, x, y, direction) {
        super("Goomba", x, y, direction);
        this.sprites = sprites;

        this.defeatDelay = 250;
        this.respawns = true;

        this.addTrait(new Gravity());
        this.addTrait(new PendulumWalk(direction));
        this.addTrait(new JumpKillable());
        this.addTrait(new Move());

        this.respawnParameters = [x, y, direction];

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

    respawn() {
        Goomba.load(...this.respawnParameters).then(goomba => {
            this.alive = false;
            Level.instance().addEntity(goomba);
        });
    }

}