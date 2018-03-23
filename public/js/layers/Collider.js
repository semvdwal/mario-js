import {Layer} from "./Layer.js";
import {Sides} from "../entities/Entity.js";

export class Collider extends Layer {

    constructor() {
        super();
        this.colliders = [];
        this.entities = [];

        this.drawBoundingBoxes = {
            colliders: false,
            entities: false
        };

        this.drawSpecial = {
            blue: [],
            red: [],
            green: [],
            white: [],
            black: []
        };
    }

    static instance(reset = false) {
        if (!Collider._instance || reset) Collider._instance = new Collider();
        return Collider._instance;
    }

    addCollider(collider) {
        this.colliders.push(collider);
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.addCollider(entity);
    }

    removeCollider(collider) {
        this.colliders.splice(this.colliders.indexOf(collider), 1);
    }

    removeEntity(entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
        this.removeCollider(entity);
    }

    update() {
        this.entities.forEach(entity => {
            this.checkCollisions(entity);
        });
    }

    checkObstruction(entity, side) {
        // Return true if the entity is obstructed in the direction of the given side, false otherwise
        let entityColliders = this.colliders
        .filter(collider => {
            if (entity === collider) return false;
            return entity.bounds.touches(collider.bounds);
        })
        .filter(collider => {
            switch (side) {
                case Sides.TOP:
                    return collider.bounds.overlapsX(entity.bounds) && entity.bounds.top > collider.bounds.top;
                case Sides.RIGHT:
                    return collider.bounds.overlapsY(entity.bounds) && entity.bounds.right < collider.bounds.right;
                case Sides.BOTTOM:
                    return collider.bounds.overlapsX(entity.bounds) && entity.bounds.bottom < collider.bounds.bottom;
                case Sides.LEFT:
                    return collider.bounds.overlapsY(entity.bounds) && entity.bounds.left > collider.bounds.left;
            }
        });
        entityColliders.forEach(collider => {
            collider.obstruct(entity, side);
            entity.obstruct(collider, side);
        });
        return entityColliders.length > 0;
    }

    checkCollisions(entity) {
        this.colliders.filter(collider => {
            if (entity === collider) return false;
            return entity.bounds.overlaps(collider.bounds);
        }).forEach(collider => {

            if (entity.velocity.x !== 0) {
                if (entity.bounds.right < collider.bounds.right) {
                    collider.collidesWith(entity, Sides.LEFT);
                    entity.collidesWith(collider, Sides.RIGHT);
                }

                else if (entity.bounds.left > collider.bounds.left) {
                    collider.collidesWith(entity, Sides.RIGHT);
                    entity.collidesWith(collider, Sides.LEFT);
                }
            }

            if (entity.velocity.y !== 0) {
                if (entity.bounds.bottom < collider.bounds.bottom) {
                    collider.collidesWith(entity, Sides.TOP);
                    entity.collidesWith(collider, Sides.BOTTOM);
                }

                else if (entity.bounds.top > collider.bounds.top) {
                    collider.collidesWith(entity, Sides.BOTTOM);
                    entity.collidesWith(collider, Sides.TOP);
                }
            }

        });
    }

    check(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) return;

            if (subject.bounds.overlaps(candidate.bounds)) {
                subject.collidesWith(candidate);
                candidate.collidesWith(subject);
            }
        });
    }

    checkX(entity) {
        if (entity.velocity.x === 0) return;
        let side = entity.velocity.x < 0 ? Sides.RIGHT : Sides.LEFT;
        let otherSide = entity.velocity.x < 0 ? Sides.LEFT : Sides.RIGHT;

        this.colliders
        .filter( collider => {
            if (entity === collider) return false;
            return     entity.bounds.bottom > collider.bounds.top
                    && entity.bounds.top < collider.bounds.bottom;
        })
        .filter(collider => {
            return entity.bounds.overlaps(collider.bounds);
        }).forEach(collider => {

            collider.collidesWith(entity, side);
            entity.collidesWith(collider, otherSide);

        });
    }

    checkY(entity) {
        if (entity.velocity.y === 0) return;
        let side = entity.velocity.y < 0 ? Sides.BOTTOM : Sides.TOP;
        let otherSide = entity.velocity.y < 0 ? Sides.TOP : Sides.BOTTOM;

        this.colliders
            .filter(collider => {
                if (entity === collider) return false;
                return entity.bounds.left < collider.bounds.right
                    && entity.bounds.right > collider.bounds.left;
            })
            .filter(collider => {
                return entity.bounds.overlaps(collider.bounds);
            }).forEach(collider => {

            collider.collidesWith(entity, side);
            entity.collidesWith(collider, otherSide);

        });
    }

    draw(canvas, camera) {
        if (this.drawBoundingBoxes.colliders) {
            this.drawAll(canvas, this.colliders, "#ff0000");
        }

        if (this.drawBoundingBoxes.entities) {
            this.drawAll(canvas, this.entities, "#ff00ff");
        }

        this.drawAll(canvas, this.drawSpecial.blue, "#0000ff");
        this.drawAll(canvas, this.drawSpecial.red, "#ff0000");
        this.drawAll(canvas, this.drawSpecial.green, "#00ff00");
        this.drawAll(canvas, this.drawSpecial.white, "#ffffff");
        this.drawAll(canvas, this.drawSpecial.black, "#000000");
        this.drawSpecial = {
            blue: [],
            red: [],
            green: [],
            white: [],
            black: []
        };
    }

    drawAll(canvas, drawables, color) {
        drawables.forEach(drawable => {
            canvas.drawRect(drawable.position.x, drawable.position.y, drawable.width, drawable.height, color);
        });
    }

}