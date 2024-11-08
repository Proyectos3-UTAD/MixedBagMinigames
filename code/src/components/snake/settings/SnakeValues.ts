/**
 * Class storing the settings of the snake
 */
class SnakeValues {

    private readonly _speed: number;

    /**
     * Constructor of the snake values.
     * @param speed The speed at which the snake moves
     */
    constructor(speed: number) {
        this._speed = speed;
    }

    /**
     * Gets the speed at which the snake moves
     */
    get snakeSpeed(): number {
        return this._speed;
    }
}

export default SnakeValues;