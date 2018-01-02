export class Canvas {

    constructor(camera) {
        this.camera = camera;

        this.canvas = document.getElementById("game-canvas");
        this.context = this.canvas.getContext("2d");
    }

    draw(image, position) {
        let [cX, cY] = this.camera.translate(position.x, position.y);

        this.context.drawImage(image,  Math.round(cX), Math.round(cY));
    }

    drawRect(x, y, w, h, color = "#ff0000") {
        this.context.strokeStyle = color;
        let [cX, cY] = this.camera.translate(x, y);
        this.context.strokeRect(cX, cY, w, h);
    }

}