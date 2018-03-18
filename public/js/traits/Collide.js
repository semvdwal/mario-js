import {Trait} from "./Trait.js";
import {Collider} from "../layers/Collider.js";

export class Collide extends Trait {

    constructor() {
        super("Collide");
    }

    update(entity, deltaTime) {
        Collider.instance().checkCollisions(entity);
    }

}