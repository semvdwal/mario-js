import {Trait} from "./Trait.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Gravity extends Trait {

    static getGravityAmount() {
        return 9.8;
    }

    static getTerminalVelocity() {
        return 280;
    }

    constructor() {
        super("Gravity");
        this.gravity = Gravity.getGravityAmount();

        this.terminalVelocity = Gravity.getTerminalVelocity();
        this.isFalling = true;
    }

    update(entity, deltaTime) {

        this.isFalling = ! Collider.instance().checkObstruction(entity, Sides.BOTTOM);

        if (this.isFalling) {
            entity.velocity.y += this.gravity;
            if (entity.velocity.y > this.terminalVelocity) entity.velocity.y = this.terminalVelocity;
        } else if (entity.velocity.y > 0) {
            entity.velocity.y = 0;
        }
    }

    obstruct(entity, collider, side) {
        if (side === Sides.BOTTOM && entity.velocity.y > 0) {
            entity.velocity.y = 0;
            this.isFalling = false;
        }
    }

}