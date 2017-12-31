import {Entity} from "./Entity.js";

export class Block extends Entity {

    constructor(x, y, w, h, type) {
        super("Block");

        this.type = type;
        this.position.x = x;
        this.position.y = y;
        this.size.x = w;
        this.size.y = h;
    }

}