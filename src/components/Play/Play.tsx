import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Play.css';
import 'flexboxgrid';
import { Snake, Direction } from '../Snake/Snake';
import { Game } from '../Game/Game';
import { Cell } from '../Cell/Cell';
import { HEIGHT, WIDTH } from '../../constants/constants';
import Heading from '../Heading/Heading';
import Display from '../Display/Display';
import Button from '../Button/Button';
import Winner from '../Winner/Winner';

const game = new Game();
const width: number = WIDTH;
const height: number = HEIGHT;

const isAppleInside = (x: number, y: number): boolean => {
  return game.isOnCell(x, y);
};

const snake = new Snake(width, height, isAppleInside);

// Show element function snake | food depending on the level | anything

const cssStyle = (x: number, y: number) => {
  if (snake.isOnCell(x, y)) {
    return 'snake';
  }
  if (game.isOnCell(x, y) && game.level < 2) {
    return 'ananas';
  }
  if (game.isOnCell(x, y) && game.level < 3) {
    return 'cupcake';
  }
  if (game.isOnCell(x, y) && game.level < 4) {
    return 'mouse';
  }
  if (game.isOnCell(x, y) && game.level < 5) {
    return 'medal';
  }
  if (game.isOnCell(x, y) && game.level < 6) {
    return 'present';
  }
  if (game.isOnCell(x, y) && game.level < 7) {
    return 'money';
  }
  if (game.isOnCell(x, y) && game.level < 8) {
    return 'heart';
  }
  if (game.isOnCell(x, y) && game.level < 9) {
    return 'beer';
  }
  if (game.isOnCell(x, y) && game.level < 10) {
    return 'diamond';
  }
  return '';
};

// Keylistener => choose direction
document.addEventListener('keyup', (e) => {
  e.preventDefault();
  const direction = chooseDirection(e);
  if (direction) {
    snake.changeDirection(direction);
  }
});

// Set direction depending on key
const chooseDirection = (e: KeyboardEvent): Direction | null => {
  switch (e.keyCode) {
    case 38:
      return Direction.UP;
    case 39:
      return Direction.RIGHT;
    case 40:
      return Direction.DOWN;
    case 37:
      return Direction.LEFT;
  }
  return null;
};

export function update() {
  if (isAppleInside(snake.cells[snake.cells.length - 1].x, snake.cells[snake.cells.length - 1].y)) {
    snake.move();
    game.getFood(snake.cells);
  } else {
    snake.move();
  }
}

const Play = () => {
  // eslint-disable-next-line
  const [cells, setCells] = useState<Cell[]>(snake.getCells());

  function restart() {
    game.level = 1;
    game.speed = 400;
    game.food = [
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
      },
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
      },
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
      },
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
      },
      {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
      },
    ];
    game.eatenFoodCount = 0;
    snake.directions = [];
    snake.direction = Direction.RIGHT;
    snake.gameOver = false;
    snake.won = false;
    snake.cells = [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)];
  }

  setTimeout(() => {
    update();
    setCells(snake.getCells());
  }, game.speed + 100); // if time === game.speed and 2 food element are near snake doesn't eat it

  return (
    <div className="Play">
      <div>
        <Heading text="Welcome to the Snake game!" />
      </div>
      <div>
        {game.eatenFoodCount < 45 ? (
          <div className="board-wrapper">
            {snake.gameOver ? (
              <div className="display-wrapper">
                <Display gameOver={snake.gameOver} text="Game Over!" />
                <Display gameOver={snake.gameOver} text={`Level: ${game.level} / 10`} />
                <Display gameOver={snake.gameOver} text={`Score: ${game.eatenFoodCount} / 45`} />
                <Button text="Restart" clickHandler={restart} />
              </div>
            ) : (
              <div className="display-wrapper">
                <Display gameOver={snake.gameOver} text={`Level: ${game.level} / 10`} />
                <Display gameOver={snake.gameOver} text={`Score: ${game.eatenFoodCount} / 45`} />
                <Display gameOver={snake.gameOver} text={`Speed: ${game.level * 100}`} />
                <Button text="Restart" clickHandler={restart} />
              </div>
            )}
            <div>
              <table>
                <tbody>
                  {Array(height)
                    .fill(null)
                    .map((_, y: number) => (
                      <tr key={uuidv4()}>
                        {Array(width)
                          .fill(null)
                          .map((__, x: number) => (
                            <td className={cssStyle(x, y)} key={uuidv4()} />
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="winner-wrapper">
            <Winner />
            <Button text="Play one more time!" clickHandler={restart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
