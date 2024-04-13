/**
 * @typedef Object Cell
 * @property {string} state
 * @property {{top:{number:x,num:y}||null,bottom:{number:x,num:y}||null,right:{number:x,num:y}||null,left:{number:x,num:y}}} neighbours
 */

export class Forest {
  constructor(h, l, probProp, positionsOnFire) {
    /**@type {number} */
    this.h = h;
    this.l = l;
    this.probProp = probProp;
    this.positionsOnFire = positionsOnFire;
    /**@type {Array.<Cell[]>} */
    this.grid = [];
    this.initGrid();
  }

  initGrid() {
    for (let y = 0; y < this.h; y++) {
      this.grid.push([]);
      for (let x = 0; x < this.l; x++) {
        const neighbours = {
          top: y + 1 < this.h ? { x, y: y + 1 } : null,
          bottom: y - 1 >= 0 ? { x, y: y - 1 } : null,
          right: x + 1 < this.l ? { x: x + 1, y } : null,
          left: x - 1 >= 0 ? { x: x - 1, y } : null,
        };
        const newCell = {
          state: State.NEUTRAL,
          neighbours: neighbours,
          pos: { x, y },
        };
        this.grid[y].push(newCell);
      }
    }

    this.positionsOnFire.forEach((pos) => {
      this.grid[pos.y][pos.x].state = State.ON_FIRE;
    });
  }

  nextStep() {
    const cellsOnFire = this.getCellsOnFire();

    cellsOnFire.forEach((cell) => {
      cell.state = State.BURNED;
      Object.keys(cell.neighbours).forEach((key) => {
        const n = cell.neighbours[key];
        if (!n) return;
        if (this.grid[n.y][n.x].state == State.NEUTRAL) {
          const rand = Math.random();

          if (rand < this.probProp) {
            this.grid[n.y][n.x].state = State.ON_FIRE;
          }
        }
      });
    });
  }

  getCellsOnFire() {
    const cellsOnFire = [];
    this.grid.forEach((line) => {
      line.forEach((cell) => {
        if (cell.state == State.ON_FIRE) cellsOnFire.push(cell);
      });
    });
    return cellsOnFire;
  }
}

export const State = {
  NEUTRAL: "neutral",
  ON_FIRE: "on_fire",
  BURNED: "burned",
};
