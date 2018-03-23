import {Trait} from "../Trait.js";
import {Collider} from "../../layers/Collider.js";
import {Sides} from "../../entities/Entity.js";

export default class PendulumWalk extends Trait {

    constructor(direction=1) {
        super("PendulumWalk");

        this.walkingSpeed = 30;
        this.direction = direction;
    }

    update(entity, deltaTime) {
        if (!entity.defeated && deltaTime > 0) {
            if (Collider.instance().checkObstruction(entity, this.direction === 1 ? Sides.RIGHT : Sides.LEFT)) {
                this.direction *= -1;
            }

            entity.velocity.x = this.direction * this.walkingSpeed;

            if (!Collider.instance().checkObstruction(entity, Sides.BOTTOM)) {
                entity.velocity.x *= 0.5;
            }
        } else {
            entity.velocity.x = 0;
        }
    }

}