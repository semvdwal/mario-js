import {Trait} from "./Trait.js";

export class Move extends Trait {

    constructor() {
        super("Move");

        this.dragFactor = 1/5000;
    }

    update(entity, deltaTime) {

        if (entity.velocity.y !== 0) {
            entity.position.y += entity.velocity.y * (deltaTime / 1000);
        }

        if (entity.velocity.x !== 0) {
            entity.position.x += entity.velocity.x * (deltaTime / 1000);
            entity.velocity.x -= this.dragFactor * entity.velocity.x * Math.abs(entity.velocity.x);
        }

    }

}