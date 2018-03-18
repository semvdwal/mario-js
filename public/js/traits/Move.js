import {Trait} from "./Trait.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Move extends Trait {

    constructor() {
        super("Move");

        this.dragFactor = 1/5000;
    }

    update(entity, deltaTime) {

        entity.position.x += entity.velocity.x * (deltaTime / 1000);
        Collider.instance().checkX(entity);

        entity.position.y += entity.velocity.y * (deltaTime / 1000);
        Collider.instance().checkY(entity);

        entity.velocity.x -= this.dragFactor * entity.velocity.x * Math.abs(entity.velocity.x);

    }

    collidesWith(entity, collider, side) {
        switch (side) {
            case Sides.TOP:
                if (entity.velocity.y < 0) entity.velocity.y = 0;
                break;
            case Sides.BOTTOM:
                if (entity.velocity.y > 0) entity.velocity.y = 0;
                break;
            case Sides.RIGHT:
                if (entity.velocity.x > 0) entity.velocity.x = 0;
                break;
            case Sides.LEFT:
                if (entity.velocity.x < 0) entity.velocity.x = 0;
        }
    }

}