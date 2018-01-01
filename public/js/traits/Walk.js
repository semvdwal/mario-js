import {Trait} from "./Trait.js";
import {Controls} from "../helpers/Controls.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Walk extends Trait {

    constructor() {
        super("Walk");
        this.isRunning = false;

        this.acceleration = 10;
        this.deceleration = 2;

        this.walkingSpeed = 150;
        this.runningSpeed = 500;

        this.direction = 0;
        this.heading = 1;

    }

    update(entity, deltaTime) {
        if (deltaTime > 0) {
            let speed = this.isRunning ? this.runningSpeed : this.walkingSpeed;

            if (this.direction !== 0) {
                if (this.direction !== 0 && Math.sign(entity.velocity.x) !== Math.sign(this.direction)) {
                    entity.velocity.x = 0;
                }

                if(this.direction != this.heading) {
                    this.heading = entity.jump.isJumping ? this.heading : this.direction;
                }

                entity.velocity.x += this.acceleration * this.direction;
                if (entity.velocity.x > speed) entity.velocity.x = speed;
            } else {
                const decel = Math.min(Math.abs(entity.velocity.x), this.deceleration * deltaTime);
                entity.velocity.x += entity.velocity.x > 0 ? -decel : decel;
            }

            Collider.instance().checkX(entity);

        }
    }

    obstruct(entity, collider, side) {
        if (side === Sides.RIGHT) {
            entity.velocity.x = 0;
            entity.position.x = collider.position.x - entity.size.x;
        } else if (side === Sides.LEFT) {
            entity.velocity.x = 0;
            entity.position.x = collider.position.x + collider.size.x;
        }
    }

}