import Directions from "../../../common/constants/Directions";

/**
 * Class that stores a position
 */
class Position {

    private readonly _xCoordinate: number;
    private readonly _yCoordinate: number;

    constructor(xCoordinate: number, yCoordinate: number) {
        this._xCoordinate = xCoordinate;
        this._yCoordinate = yCoordinate;
    }

    public get xCoordinate(): number {
        return this._xCoordinate;
    }

    public get yCoordinate(): number {
        return this._yCoordinate;
    }

    public toString(): string {
        return `${this.xCoordinate}-${this.yCoordinate}`;
    }

    // static getStringNotation(x, y) {
    //     return `${x}-${y}`;
    // }
    //
    //
    static parsePositionFromString(stringPosition: string): Position {
        const [x, y] = stringPosition.split('-').map(text => Number(text));
        return new Position(x, y);
    }

    //
    // static getNextPositionStringNotationFromString(stringPosition, direction) {
    //     const {x, y} = Position.parseStringNotation(stringPosition);
    //     return Position.getNextPositionStringNotation(x, y, direction);
    // }
    //
    // static getNextPositionStringNotation(x, y, direction) {
    //
    //     const {newX, newY} = Position.getNextPosition(Number(x), Number(y), direction);
    //     return Position.getStringNotation(newX, newY);
    //
    // }
    //
    // static getNextPosition(x, y, direction) {
    //
    //     let newX, newY;
    //     switch (direction) {
    //
    //         case Directions.NONE:
    //             newX = x;
    //             newY = y;
    //             break;
    //         case Directions.LEFT:
    //             newX = x - 1;
    //             newY = y;
    //             break;
    //         case Directions.RIGHT:
    //             newX = x + 1;
    //             newY = y;
    //             break;
    //         case Directions.UP:
    //             newX = x;
    //             newY = y - 1;
    //             break;
    //         case Directions.DOWN:
    //             newX = x;
    //             newY = y + 1;
    //             break;
    //     }
    //
    //     return {newX, newY};
    // }
}

export default Position;