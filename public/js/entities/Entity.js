import {Vector} from "../helpers/Vector.js";
import {BoundingBox} from "../helpers/BoundingBox.js";

export const Sides = {
    TOP: Symbol('top'),
    RIGHT: Symbol('right'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left')
};

export class Entity {

    constructor(name) {
        this.name = name;
        this.traits = [];

        this.position = new Vector(0, 0);
        this.size = new Vector(16, 16);
        this.offset = new Vector(0, 0);
        this.velocity = new Vector(0, 0);

        this.bounds = new BoundingBox(this.position, this.size, this.offset);

        this.alive = true;
    }

    get height() {
        return this.size.y;
    }

    get width() {
        return this.size.x;
    }

    set height(height) {
        this.size.y = height;
    }

    set width(width) {
        this.size.x = width;
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name.toLowerCase()] = trait;
    }

    removeTrait(trait) {
        this.traits.splice(this.traits.indexOf(trait), 1);
    }

    update(deltaTime) {
        this.traits.forEach(trait => trait.update(this, deltaTime));
        this.traits.forEach(trait => trait.finalize());

        if (this.position.y > 20 * 16) {
            this.alive = false; // Fell out of world
        }
    }

    collidesWith(collider, side) {
        this.traits.forEach(trait => trait.collidesWith(this, collider, side));
    }

    obstruct(collider, side) {
        this.traits.forEach(trait => trait.obstruct(this, collider, side));
    }

}