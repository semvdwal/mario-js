import {Layer} from "./Layer.js";
import {Sides} from "../entities/Entity.js";

export class Collider extends Layer {

    constructor() {
        super();
        this.colliders = [];
        this.entities = [];

        this.drawBoundingBoxes = false;
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
        this.colliders.filter(collider => {
            return collider.position.y < entity.position.y + entity.height
                && collider.position.y > entity.position.y
                && Math.abs(collider.position.x - entity.position.x) < entity.width
                && Math.sign(collider.position.x - entity.position.x) === Math.sign(entity.velocity.x)
        }).forEach(collider => {
            if (entity.bounds.overlaps(collider)) {
                if (entity.velocity.x < 0) {
                    entity.obstruct(collider, Sides.LEFT);
                } else {
                    entity.obstruct(collider, Sides.RIGHT);
                }
            }
        });
    }

    checkY(entity) {
        this.colliders.forEach(collider => {
            if (entity.bounds.overlaps(collider.bounds)) {
                if (entity.velocity.y < 0) {
                    entity.obstruct(collider, Sides.TOP);
                } else {
                    entity.obstruct(collider, Sides.BOTTOM);
                }
            }
        });
    }

    collidesX(entity, collider) {
        let collides = false;

        if (entity.position.x >= collider.position.x && entity.position.x <= collider.position.x + collider.width) {
            collides = true;
        } else if (entity.position.x + entity.width >= collider.position.x && entity.position.x + entity.width <= collider.position.x + collider.width) {
            collides = true;
        }

        return collides;
    }

    collidesY(entity, collider) {
        let collides = false;

        if (entity.position.y >= collider.position.y && entity.position.y <= collider.position.y + collider.height) {
            collides = true;
        }else if (entity.position.y + entity.height >= collider.position.y && entity.position.y + entity.height <= collider.position.y + collider.height) {
            collides = true;
        }

        return collides && this.collidesX(entity, collider);
    }

    draw(canvas, camera) {
        if (this.drawBoundingBoxes) {
            this.colliders.forEach(collider => {
                canvas.drawRect(collider.position.x, collider.position.y, collider.width, collider.height);
            });
        }
    }

}