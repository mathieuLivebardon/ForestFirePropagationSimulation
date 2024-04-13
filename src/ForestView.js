import { Forest, State } from "./Forest";

export class ForestView {
  constructor(forest, cellSize) {
    /**@typedef {Forest} */
    this.forest = forest;

    this.cellSize = cellSize;
    this.height = forest.h * cellSize;
    this.width = forest.l * cellSize;

    this.canvasElement = document.createElement("canvas");
    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

    this.generateCanvas();
  }

  generateCanvas() {
    const context = this.canvasElement.getContext("2d");
    context.rect(0, 0, this.width, this.height);
    context.fillStyle = "green";
    context.fill();

    for (let x = 0; x < this.forest.l; x++) {
      for (let y = 0; y < this.forest.h; y++) {
        const state = this.forest.grid[y][x].state;

        switch (state) {
          case State.ON_FIRE:
            context.fillStyle = "red";
            context.fillRect(
              x * this.cellSize,
              y * this.cellSize,
              this.cellSize,
              this.cellSize
            );
            break;
          case State.BURNED:
            context.fillStyle = "black";
            context.fillRect(
              x * this.cellSize,
              y * this.cellSize,
              this.cellSize,
              this.cellSize
            );
            break;
        }
      }
    }
  }
}
