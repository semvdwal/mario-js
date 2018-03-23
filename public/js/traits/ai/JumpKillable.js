import {Trait} from "../Trait.js";
import {Sides} from "../../entities/Entity.js";
import {Collider} from "../../layers/Collider.js";

export class JumpKillable extends Trait {

    constructor() {
        super("JumpKillable");
    }

    collidesWith(entity, collider, side) {
        if (side === Sides.TOP && collider.player) {
            entity.defeated = true;
            Collider.instance().removeEntity(entity);
        } else if(collider.player) {
            collider.alive = false;
        }
    }

}