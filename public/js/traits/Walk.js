import {Trait} from "./Trait.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Walk extends Trait {

    constructor() {
        super("Walk");
        this.isRunning = false;

        this.walkingAcceleration = 10;
        this.runningAcceleration = 16;

        this.direction = 0;
        this.heading = 1;

    }

    update(entity, deltaTime) {
        if (deltaTime > 0) {
            let acceleration = this.isRunning ? this.runningAcceleration : this.walkingAcceleration;

            if (this.direction !== 0) {

                if(this.direction != this.heading) {
                    this.heading = entity.jump.isJumping ? this.heading : this.direction;
                }

                if (! Collider.instance().checkObstruction(entity, this.direction === 1 ? Sides.RIGHT : Sides.LEFT)) {
                    entity.velocity.x += acceleration * this.direction;
                } else {
                    entity.velocity.x = 0;
                }
            }

        }
    }

}