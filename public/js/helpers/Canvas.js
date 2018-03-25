export class Canvas {

    constructor(camera) {
        this.camera = camera;

        this.canvas = document.getElementById("game-canvas");
        this.context = this.canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.camera.setSize(this.width, this.height);

        Canvas._instance = this;
    }

    static instance() {
        return Canvas._instance;
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

    drawText(x, y, text, color = "#ffffff") {
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    }

    drawOverlay(color = "rgba(0,0,0,0.5)") {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }

}