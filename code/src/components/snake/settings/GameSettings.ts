/**
 * Imports
 */
import BoardDimensions from "./BoardDimensions.ts";
import FruitValues from "./FruitValues.ts";
import BoardColors from "./BoardColors.ts";
import SnakeValues from "./SnakeValues.ts";

/**
 * Class storing the settings of a game.
 */
class GameSettings {

    private readonly _boardDimensions: BoardDimensions;
    private readonly _boardColors: BoardColors;
    private readonly _fruitValues: FruitValues;
    private readonly _snakeValues: SnakeValues;

    /**
     * Constructor of the game settings
     * @param boardDimensions Dimensions of the board
     * @param boardColors Colors of the board
     * @param fruitValues Settings of the fruit in game
     * @param snakeValues Settings of the snake in game
     */
    constructor(
        boardDimensions: BoardDimensions = new BoardDimensions(9, 10),
        boardColors: BoardColors = new BoardColors("snake-LightSquare", "snake-DarkSquare"),
        fruitValues: FruitValues = new FruitValues(1),
        snakeValues: SnakeValues = new SnakeValues(1000)
    ) {

        this._boardDimensions = boardDimensions;
        this._boardColors = boardColors;
        this._fruitValues = fruitValues;
        this._snakeValues = snakeValues;

    }

    /**
     * Gets the boarsDimensions
     */
    get boardDimensions(): BoardDimensions {
        return this._boardDimensions;
    }

    /**
     * Gets the board colors
     */
    get boardColors(): BoardColors {
        return this._boardColors;
    }

    /**
     * Gets the fruit values
     */
    get fruitValues(): FruitValues {
        return this._fruitValues;
    }

    /**
     * Gets the snake values
     */
    get snakeValues(): SnakeValues {
        return this._snakeValues;
    }

    public toString(): string {
        return "GameSettings";
    }
}

export default GameSettings;