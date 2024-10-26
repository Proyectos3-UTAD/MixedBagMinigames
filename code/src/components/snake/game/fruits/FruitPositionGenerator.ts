import Position from "../board/Position";

/**
 * Generates a position for the fruit.
 * @param boardContents The contents of the board (to avoid overlap)
 * @param boardDimensions The dimensions of the board (to make sure the fruit is in boar bounds)
 * @returns {*}
 * @constructor
 */
function FruitPositionGenerator(boardContents: {}, boardDimensions): Position {

    const availablePositions = [];

    for (let y = 0; y < boardDimensions.height; y++) {
        for (let x = 0; x < boardDimensions.width; x++) {
            let positionName = Position.getStringNotation(x, y);
            if (!(boardContents?.[`${positionName}`])) {
                availablePositions.push([`${positionName}`]);
            }
        }
    }

    return availablePositions[(Math.floor(Math.random() * availablePositions.length))][0];

}

export default FruitPositionGenerator;