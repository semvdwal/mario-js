import {Trait} from "./Trait.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Gravity extends Trait {

    constructor() {
        super("Gravity");

        this.gravity = 10;
        this.terminalVelocity = 240;
        this.isFalling = true;
    }

    update(entity, deltaTime) {
        if (this.isFalling) {
            entity.velocity.y += this.gravity;
            if (entity.velocity.y > this.terminalVelocity) entity.velocity.y = this.terminalVelocity;
        }

        this.addTask(() => {
            this.isFalling = true;
            Collider.instance().checkY(entity);
        });
    }

    obstruct(entity, collider, side) {
        if (side === Sides.BOTTOM && entity.velocity.y > 0) {
            entity.velocity.y = 0;
            entity.position.y = collider.position.y - entity.size.y;
            this.isFalling = false;
        }
    }

}