import {Trait} from "./Trait.js";

export class Move extends Trait {

    constructor() {
        super("Move");

        this.dragFactor = 1/5000;
    }

    update(entity, deltaTime) {

        if (
            (entity.velocity.y > 0 && entity.obstructions.top.obstructed == false) ||
            (entity.velocity.y < 0 && entity.obstructions.bottom.obstructed == false)
        ) {
            entity.position.y += entity.velocity.y * (deltaTime / 1000);
        }

        if (
            (entity.velocity.x > 0 && entity.obstructions.right.obstructed == false) ||
            (entity.velocity.x < 0 && entity.obstructions.left.obstructed == false)
        ) {
            entity.position.x += entity.velocity.x * (deltaTime / 1000);
            entity.velocity.x -= this.dragFactor * entity.velocity.x * Math.abs(entity.velocity.x);
        }

    }

}