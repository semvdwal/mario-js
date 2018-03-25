import {Entity} from './Entity.js';

export class Player extends Entity {

    constructor(name) {
        super(name)
    }

    inMidAir() {
        return this.jump.isJumping || this.gravity.isFalling;
    }

}