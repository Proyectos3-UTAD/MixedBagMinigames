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

    public getNextPosition(direction): Position {

        let nextPosition: Position;

        switch (direction) {
            case Directions.DOWN:
                nextPosition = new Position(this.xCoordinate, this.yCoordinate + 1);
                break;

            case Directions.UP:
                nextPosition = new Position(this.xCoordinate, this.yCoordinate - 1);
                break;

            case Directions.LEFT:
                nextPosition = new Position(this.xCoordinate - 1, this.yCoordinate);
                break;

            case Directions.RIGHT:
                nextPosition = new Position(this.xCoordinate + 1, this.yCoordinate);
                break;
            default:
                nextPosition = this;
        }

        return nextPosition;
    }

    static parsePositionFromString(stringPosition: string): Position {
        const [x, y] = stringPosition.split('-').map(text => Number(text));
        return new Position(x, y);
    }

}

export default Position;