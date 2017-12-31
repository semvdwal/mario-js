export class Trait {

    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    update(entity, deltaTime) {}

    addTask(task) {
        this.tasks.push(task);
    }

    finalize() {
        this.tasks.forEach(task => {
            task();
        });
    }

    collidesWith(entity) {}

    obstruct(entity, collider) {}

}