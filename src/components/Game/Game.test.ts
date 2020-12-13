import { Game } from './Game';
import { Cell } from '../Cell/Cell';
import { Snake } from '../Snake/Snake';

describe('Game', () => {

    let game: Game;
    let snake: Snake;

    const width: number = 40;
    const height: number = 25;

    beforeEach(() => {
        game = new Game();

        const isAppleInside = (x: number, y: number): boolean => {
            return game.isOnCell(x, y);
        };

        snake = new Snake(width, height, isAppleInside);
    });

    it('Board should have 5 food elements on the board in start', () => {

        const food: Cell[] = game.showFood();

        expect(food.length).toBe(5);

        expect(food).toEqual([
            { x: 10, y: 5 },
            { x: 6, y: 7 },
            { x: 12, y: 18 },
            { x: 12, y: 1 },
            { x: 12, y: 6 },
        ])

    });

    it('Should have initial game properties', () => {

        expect(game.eatenFoodCount).toBe(0);
        expect(game.level).toBe(1);
        expect(game.speed).toBe(400);

    });

    it('Should increase level after each 5 eaten elements', () => {

        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);

        expect(game.level).toEqual(2);

    });

    it('Should increase speed after each level', () => {

        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);
        game.getFood(snake.cells);

        expect(game.speed).toBe(375);

    });

})