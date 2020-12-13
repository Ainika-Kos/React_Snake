import { Cell } from '../Cell/Cell';
import { HEIGHT, WIDTH } from '../../constants/constants';

export class Game {
  food: Cell[] = [
    { x: 10, y: 5 },
    { x: 6, y: 7 },
    { x: 12, y: 18 },
    { x: 12, y: 1 },
    { x: 12, y: 6 },
  ];

  eatenFoodCount: number = 0;

  level: number = 1;

  speed: number = 400;

  showFood() {
    return this.food;
  }


  // Food seeding function

  getFood(snake: Cell[]) {
    this.eatenFoodCount += 1; // score++

    if (this.eatenFoodCount % 5 === 0) { // if snake ate 5 food elements => push new elements on coordinates
      this.food.shift();
      this.level += 1;
      this.speed -= 25;
      const coordinates = [];
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
          if (
            !snake.some((cell) => cell.x === i && cell.y === j) && // doesn't allow add food on snake or on current food cell
            !this.food.some((cell) => cell.x === i && cell.y === j)
          ) {
            coordinates.push({ x: i, y: j });
          }
        }
      }

      for (let i = 0; i < 5; i++) {
        this.food.push(coordinates[Math.floor(Math.random() * coordinates.length)]);
      }
    } else {
      this.removeFood(snake); 
    }
    return this.food;
  }


  // Check if food is on this cell

  isOnCell(x: number, y: number) {
    return this.food.some((cell) => cell.x === x && cell.y === y);
  }

  // Remove food when it is eaten by snake

  removeFood(snake: Cell[]) {
    for (let i = 0; i < this.food.length; i++) {
      if (snake.some((cell) => cell.x === this.food[i].x && cell.y === this.food[i].y)) {
        this.food.splice(i, 1);
      }
    }
    return this.food;
  }
}
