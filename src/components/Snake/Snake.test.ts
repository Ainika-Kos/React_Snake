import { Game } from '../Game/Game';
import { Cell } from '../Cell/Cell';
import { Direction, Snake } from '../Snake/Snake';

describe('Snake', () => {

    let game: Game;
    let snake: Snake;
    let cells: Cell[];

    const width: number = 40;
    const height: number = 25;

    beforeEach(() => {
        game = new Game();

        const isAppleInside = (x: number, y: number): boolean => {
            return game.isOnCell(x, y);
        };

        snake = new Snake(width, height, isAppleInside);
        cells = snake.getCells();
    });

    it('Snake should have initial coordinates', () => {

        expect(cells).toEqual([
            new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)
        ])
    });

    it('Snake should move', () => {

        snake.move();
        cells = snake.getCells();
        expect(cells).toEqual([
            new Cell(1, 0), new Cell(2, 0), new Cell(3, 0), new Cell(4, 0)
        ])
    });

    it('Snake should move Down', () => {

        snake.changeDirection(Direction.DOWN);
        snake.move();
        cells = snake.getCells();
        expect(cells).toEqual([
            new Cell(1, 0), new Cell(2, 0), new Cell(3, 0), new Cell(3, 1)
        ])
    });

    it('Snake should move Right', () => {

        snake.changeDirection(Direction.DOWN);
        snake.move();
        snake.changeDirection(Direction.RIGHT);
        snake.move();
        cells = snake.getCells();
        expect(cells).toEqual([
            new Cell(2, 0), new Cell(3, 0), new Cell(3, 1), new Cell(4, 1)
        ]);
    });

    it('Snake should move Up', () => {

        snake.changeDirection(Direction.DOWN);
        snake.move();
        snake.changeDirection(Direction.RIGHT);
        snake.move();
        snake.changeDirection(Direction.UP);
        snake.move();
        cells = snake.getCells();
        expect(cells).toEqual([
            new Cell(3, 0), new Cell(3, 1), new Cell(4, 1), new Cell(4, 0)
        ]);
    });

    it('Snake should move Left', () => {

        snake.move();
        snake.move();
        snake.move()
        snake.changeDirection(Direction.DOWN);
        snake.move();
        snake.changeDirection(Direction.LEFT);
        snake.move();
        cells = snake.getCells();
        expect(cells).toEqual([
            new Cell(5, 0), new Cell(6, 0), new Cell(6, 1), new Cell(5, 1)
        ]);
    });

    it('Snake should not change direction to the opposite', () => {

        snake.changeDirection(Direction.LEFT);
        expect(snake.direction).toBe(Direction.RIGHT);
    });

    it('Snake should be gameover if snake bumps itself', () => {
        snake.move();
        snake.changeDirection(Direction.DOWN);
        snake.move();
        snake.changeDirection(Direction.LEFT);
        snake.move();
        snake.changeDirection(Direction.UP);
        snake.move();

        expect(snake.gameOver).toBeTruthy();
    });

    it('Snake should be gameover if snake goes outside the board', () => {
        snake.move();
        snake.changeDirection(Direction.UP);
        snake.move();
       
        expect(snake.gameOver).toBeTruthy();
    });
})