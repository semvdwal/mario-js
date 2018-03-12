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
        this.obstructions = {
            top: {
                side: Sides.TOP,
                obstructed: false,
                collider: null
            },
            right: {
                side: Sides.RIGHT,
                obstructed: false,
                collider: null
            },
            bottom: {
                side: Sides.BOTTOM,
                obstructed: false,
                collider: null
            },
            left: {
                side: Sides.LEFT,
                obstructed: false,
                collider: null
            }
        };
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

        this.obstructions.top.obstructed = false;
        this.obstructions.right.obstructed = false;
        this.obstructions.bottom.obstructed = false;
        this.obstructions.left.obstructed = false;
    }

    collidesWith(collider) {
        this.traits.forEach(trait => trait.collidesWith(this, collider));
    }

    obstruct(collider, side) {
        switch (side) {
            case Sides.TOP:
                this.obstructions.top.obstructed = true;
                this.obstructions.top.collider = collider;
                break;
            case Sides.RIGHT:
                this.obstructions.right.obstructed = true;
                this.obstructions.right.collider = collider;
                break;
            case Sides.BOTTOM:
                this.obstructions.bottom.obstructed = true;
                this.obstructions.bottom.collider = collider;
                break;
            case Sides.LEFT:
                this.obstructions.left.obstructed = true;
                this.obstructions.left.collider = collider;
                break;
        }
        this.traits.forEach(trait => trait.obstruct(this, collider, side));
    }

}