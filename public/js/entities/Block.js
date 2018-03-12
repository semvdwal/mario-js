import {Entity} from "./Entity.js";
import {Sides} from "../entities/Entity.js"

export class Block extends Entity {

    constructor(x, y, w, h, name, type) {
        super("Block");

        this.name = name;
        this.type = type;
        this.position.x = x;
        this.position.y = y;
        this.size.x = w;
        this.size.y = h;
    }

    obstruct(entity, side) {
        if (this.type === 'solid') {
            switch (side) {
                case Sides.RIGHT:
                    entity.bounds.right = this.bounds.left;
                    break;
                case Sides.BOTTOM:
                    entity.bounds.bottom = this.bounds.top;
                    break;
                case Sides.LEFT:
                    entity.bounds.left = this.bounds.right;
                    break;
                case Sides.TOP:
                    entity.bounds.top = this.bounds.bottom;
            }
        }
    }

}