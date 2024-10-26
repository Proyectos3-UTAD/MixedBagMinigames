/**
 * Imports
 */
import BoardDimensions from "./BoardDimensions";
import FruitValues from "./FruitValues";
import BoardColors from "./BoardColors";
import SnakeValues from "./SnakeValues";
import boardDimensions from "./BoardDimensions";
import boardColors from "./BoardColors";
import fruitValues from "./FruitValues";
import snakeValues from "./SnakeValues";

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
        boardDimensions: BoardDimensions,
        boardColors: BoardColors,
        fruitValues: FruitValues,
        snakeValues: SnakeValues
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
}

export default GameSettings;