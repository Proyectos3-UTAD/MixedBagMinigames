import Directions from "../../../common/constants/Directions";

class Position {

    static getStringNotation(x, y) {
        return `${x}-${y}`;
    }


    static parseStringNotation(stringPosition) {
        const [x, y] = stringPosition.split('-');
        return {x, y};
    }

    static getNextPositionStringNotationFromString(stringPosition, direction) {
        const {x, y} = Position.parseStringNotation(stringPosition);
        return Position.getNextPositionStringNotation(x, y, direction);
    }

    static getNextPositionStringNotation(x, y, direction) {

        const {newX, newY} = Position.getNextPosition(Number(x), Number(y), direction);
        return Position.getStringNotation(newX, newY);

    }

    static getNextPosition(x, y, direction) {

        let newX, newY;
        switch (direction) {

            case Directions.NONE:
                newX = x;
                newY = y;
                break;
            case Directions.LEFT:
                newX = x - 1;
                newY = y;
                break;
            case Directions.RIGHT:
                newX = x + 1;
                newY = y;
                break;
            case Directions.UP:
                newX = x;
                newY = y - 1;
                break;
            case Directions.DOWN:
                newX = x;
                newY = y + 1;
                break;
        }

        return {newX, newY};
    }
}

export default Position;