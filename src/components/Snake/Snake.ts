import { Cell } from '../Cell/Cell';

export enum Direction {
  UP = 1,
  DOWN = 2,
  RIGHT = 3,
  LEFT = 4,
}
export class Snake {
  boardWidth: number;

  boardHeight: number;

  isAppleInside?: (x: number, y: number) => boolean;

  constructor(
    boardWidth: number,
    boardHeight: number,
    isAppleInside?: (x: number, y: number) => boolean
  ) {
    this.isAppleInside = isAppleInside;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
  }

  direction: Direction = Direction.RIGHT;

  directions: Direction[] = [];

  gameOver: boolean = false;

  won: boolean = false;

  growTail: number = 0;

  cells: Cell[] = [
    new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)
  ];

  getCells() {
    return [...this.cells];
  }

  // Groving snake and changing coordinates 

  whereToMove() {
    const head = this.cells[this.cells.length - 1];

    // Groving snake tail
    if (this.isGameOver()) {
      this.gameOver = true;
    } else if (!this.isAppleInside || !this.isAppleInside(head.x, head.y)) {
      if (this.growTail >= 1) {
        this.growTail -=1;
      } else {
        this.cells.shift();
      }
    } else {
      this.growTail += 2;
    }

    // Changing x & y coordinates, depending on direction => add step to directions array for memory

    if (this.direction === Direction.RIGHT) {
      if (this.gameOver === false) {
        this.cells.push(new Cell(head.x + 1, head.y));
      }
    } else if (this.direction === Direction.DOWN) {
      if (this.gameOver === false) {
        this.cells.push(new Cell(head.x, head.y + 1));
      }
    } else if (this.direction === Direction.UP) {
      if (this.gameOver === false) {
        this.cells.push(new Cell(head.x, head.y - 1));
      }
    } else if (this.direction === Direction.LEFT) {
      if (this.gameOver === false) {
        this.cells.push(new Cell(head.x - 1, head.y));
      }
    }
  }

  // Making moves and remove steps from directions array

  move() {
    if (this.gameOver === false) {
      if (this.directions.length > 0) {
        const dir = this.directions[0];
        this.direction = dir;
        this.whereToMove();
        this.directions.shift();
      } else {
        this.whereToMove();
      }
    }
  }

  // Change direction, depending on key choose (Play.tsx) and don't allow make opposite move

  changeDirection(direction: Direction) {
    if (
      (this.direction === Direction.RIGHT && direction === Direction.LEFT) ||
      (this.direction === Direction.LEFT && direction === Direction.RIGHT)
    ) {
      this.direction = this.direction;
    } else if (
      (this.direction === Direction.UP && direction === Direction.DOWN) ||
      (this.direction === Direction.DOWN && direction === Direction.UP)
    ) {
      this.direction = this.direction;
    } else {
      this.direction = direction;
      this.directions.push(this.direction);
    }
  }

  // Check if snake is on this cell
  
  isOnCell(x: number, y: number) {
    return this.cells.some((cell) => cell.x === x && cell.y === y);
  }

  // Chek and set gameOver(result) = true, if snake bumbs itself OR is outside the board dimensions

  isGameOver(): boolean {
    let result: boolean = false;
    if (this.direction === Direction.RIGHT) {
      if (
        this.isOnCell(this.cells[this.cells.length - 1].x + 1, this.cells[this.cells.length - 1].y)
      ) {
        result = true;
      } else if (this.cells[this.cells.length - 1].x === this.boardWidth - 1) {
        result = true;
      }
    }
    if (this.direction === Direction.DOWN) {
      if (
        this.isOnCell(this.cells[this.cells.length - 1].x, this.cells[this.cells.length - 1].y + 1)
      ) {
        result = true;
      } else if (this.cells[this.cells.length - 1].y === this.boardHeight - 1) {
        result = true;
      }
    }
    if (this.direction === Direction.UP) {
      if (
        this.isOnCell(this.cells[this.cells.length - 1].x, this.cells[this.cells.length - 1].y - 1)
      ) {
        result = true;
      } else if (this.cells[this.cells.length - 1].y === 0) {
        result = true;
      }
    }
    if (this.direction === Direction.LEFT) {
      if (
        this.isOnCell(this.cells[this.cells.length - 1].x - 1, this.cells[this.cells.length - 1].y)
      ) {
        result = true;
      } else if (this.cells[this.cells.length - 1].x === 0) {
        result = true;
      }
    }
    return result;
  }
}