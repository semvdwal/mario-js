import {Layer} from "./Layer.js";
import {Sides} from "../entities/Entity.js";

export class Collider extends Layer {

    constructor() {
        super();
        this.colliders = [];
        this.entities = [];

        this.drawBoundingBoxes = {
            colliders: false,
            entities: true
        };

        this.drawSpecial = [];
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
    }

    removeCollider(collider) {
        this.colliders.slice(this.colliders.indexOf(collider), 1);
    }

    removeEntity(entity) {
        this.entities.slice(this.entities.indexOf(collider), 1);
    }

    update() {
        this.entities.forEach(entity => {
            // this.checkX(entity);
            // this.checkY(entity);
            this.check(entity);
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
        if(entity.velocity.x === 0) return;
        this.colliders.filter(collider => {
            if(collider.bounds.bottom < entity.bounds.top || collider.bounds.top > entity.bounds.bottom) return false;

            if(entity.velocity.x > 0) {
                return collider.bounds.right > entity.bounds.right
                    && collider.bounds.right < entity.bounds.right + entity.size.x;
            } else {
                return collider.bounds.left < entity.bounds.left
                    && collider.bounds.left > entity.bounds.left - entity.size.x;
            }
        }).forEach(collider => {
            this.drawSpecial.push(collider);
            if (entity.bounds.overlaps(collider.bounds)) {
                if (entity.velocity.x < 0) {
                    entity.obstruct(collider, Sides.LEFT);
                } else {
                    entity.obstruct(collider, Sides.RIGHT);
                }
            }
        });
    }

    checkY(entity) {
        if(entity.velocity.y === 0) return;
        this.colliders.filter(collider => {
            if(collider.bounds.right < entity.bounds.left || collider.bounds.left > entity.bounds.right) return false;

            if(entity.velocity.y > 0) {
                return collider.bounds.top > entity.bounds.top
                    && collider.bounds.top < entity.bounds.top + entity.size.y;
            } else {
                return collider.bounds.bottom < entity.bounds.bottom
                    && collider.bounds.bottom > entity.bounds.bottom - entity.size.y;
            }
        }).forEach(collider => {
            this.drawSpecial.push(collider);
            if (entity.bounds.overlaps(collider.bounds)) {
                if (entity.velocity.y < 0) {
                    entity.obstruct(collider, Sides.TOP);
                } else {
                    entity.obstruct(collider, Sides.BOTTOM);
                }
            }
        });
    }

    draw(canvas, camera) {
        if (this.drawBoundingBoxes.colliders) {
            this.drawAll(canvas, this.colliders, "#ff0000");
        }

        if (this.drawBoundingBoxes.entities) {
            this.drawAll(canvas, this.entities, "#ff00ff");
        }

        this.drawAll(canvas, this.drawSpecial, "#0000ff");
        this.drawSpecial = [];
    }

    drawAll(canvas, drawables, color) {
        drawables.forEach(drawable => {
            canvas.drawRect(drawable.position.x, drawable.position.y, drawable.width, drawable.height, color);
        });
    }

}