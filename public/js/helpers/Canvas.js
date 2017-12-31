export class Canvas {

    constructor() {
        this.canvas = document.getElementById("game-canvas");
        this.context = this.canvas.getContext("2d");
    }

    draw(image, position) {
        this.context.drawImage(image,  Math.round(position.x), Math.round(position.y))
    }

    drawRect(x, y, w, h, color = "#ff0000") {
        this.context.strokeStyle = color;
        this.context.strokeRect(x, y, w, h);
    }

}